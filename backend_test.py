#!/usr/bin/env python3
"""
Backend test suite for PK Photography - Mongo race condition fix verification
Tests concurrent requests, CRUD operations, and HTTP status checks
"""

import requests
import concurrent.futures
import time
import json
from typing import List, Dict, Tuple

# Configuration
BASE_URL = "https://staging-emergent.preview.emergentagent.com"
ADMIN_TOKEN = "PKAdmin@2026"
HEADERS_AUTH = {"Authorization": f"Bearer {ADMIN_TOKEN}", "Content-Type": "application/json"}
HEADERS_NO_AUTH = {"Content-Type": "application/json"}

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_pass(test_name: str, details: str = ""):
    """Log a passing test"""
    msg = f"✅ PASS: {test_name}"
    if details:
        msg += f" - {details}"
    print(msg)
    test_results["passed"].append(test_name)

def log_fail(test_name: str, details: str):
    """Log a failing test"""
    msg = f"❌ FAIL: {test_name} - {details}"
    print(msg)
    test_results["failed"].append(f"{test_name}: {details}")

def log_warning(test_name: str, details: str):
    """Log a warning"""
    msg = f"⚠️  WARNING: {test_name} - {details}"
    print(msg)
    test_results["warnings"].append(f"{test_name}: {details}")

# ============================================================================
# A. CONCURRENT SAFETY TESTS
# ============================================================================

def test_concurrent_get_requests():
    """A1: Fire 20 concurrent GET requests to /api/media?slot=hero-slides"""
    print("\n" + "="*80)
    print("TEST A1: 20 Concurrent GET requests to /api/media?slot=hero-slides")
    print("="*80)
    
    def single_get_request(index: int) -> Tuple[int, int, str, str]:
        """Single GET request, returns (index, status_code, body_text, error_msg)"""
        try:
            response = requests.get(
                f"{BASE_URL}/api/media?slot=hero-slides",
                timeout=60
            )
            return (index, response.status_code, response.text, "")
        except Exception as e:
            return (index, 0, "", str(e))
    
    # Execute 20 concurrent requests
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(single_get_request, i) for i in range(20)]
        results = [f.result() for f in concurrent.futures.as_completed(futures)]
    
    # Sort by index for easier reading
    results.sort(key=lambda x: x[0])
    
    # Analyze results
    all_200 = True
    all_json = True
    no_undefined_errors = True
    no_500_errors = True
    
    for idx, status, body, error in results:
        if error:
            log_fail(f"A1.{idx+1}", f"Request exception: {error}")
            all_200 = False
            continue
            
        if status != 200:
            log_fail(f"A1.{idx+1}", f"Expected HTTP 200, got {status}")
            all_200 = False
            if status == 500:
                no_500_errors = False
        
        if "Cannot read properties of undefined" in body:
            log_fail(f"A1.{idx+1}", f"Response contains 'Cannot read properties of undefined'")
            no_undefined_errors = False
        
        try:
            data = json.loads(body)
            if "items" not in data:
                log_fail(f"A1.{idx+1}", f"Response missing 'items' field")
                all_json = False
        except json.JSONDecodeError:
            log_fail(f"A1.{idx+1}", f"Response is not valid JSON")
            all_json = False
    
    if all_200 and all_json and no_undefined_errors and no_500_errors:
        log_pass("A1: Concurrent GET safety", "All 20 requests returned HTTP 200 with valid JSON {items:[...]}")
    else:
        summary = []
        if not all_200:
            summary.append("some requests did not return 200")
        if not all_json:
            summary.append("some responses missing 'items' field")
        if not no_undefined_errors:
            summary.append("found 'Cannot read properties of undefined' errors")
        if not no_500_errors:
            summary.append("found HTTP 500 errors")
        log_fail("A1: Concurrent GET safety", "; ".join(summary))

def test_concurrent_post_requests():
    """A2: Fire 20 concurrent POST requests with unique bodies"""
    print("\n" + "="*80)
    print("TEST A2: 20 Concurrent POST requests to /api/media")
    print("="*80)
    
    created_ids = []
    
    def single_post_request(index: int) -> Tuple[int, int, str, str, str]:
        """Single POST request, returns (index, status_code, response_id, body_text, error_msg)"""
        try:
            payload = {
                "public_id": f"audit/concurrent-{index}",
                "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                "slot": "audit-concurrent"
            }
            response = requests.post(
                f"{BASE_URL}/api/media",
                headers=HEADERS_AUTH,
                json=payload,
                timeout=60
            )
            
            response_id = ""
            if response.status_code == 201:
                try:
                    data = response.json()
                    response_id = data.get("id", "")
                except Exception:
                    pass
            
            return (index, response.status_code, response_id, response.text, "")
        except Exception as e:
            return (index, 0, "", "", str(e))
    
    # Execute 20 concurrent requests
    with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:
        futures = [executor.submit(single_post_request, i) for i in range(20)]
        results = [f.result() for f in concurrent.futures.as_completed(futures)]
    
    # Sort by index
    results.sort(key=lambda x: x[0])
    
    # Analyze results
    all_201 = True
    all_have_uuid = True
    
    for idx, status, response_id, body, error in results:
        if error:
            log_fail(f"A2.{idx+1}", f"Request exception: {error}")
            all_201 = False
            continue
        
        if status != 201:
            log_fail(f"A2.{idx+1}", f"Expected HTTP 201, got {status}")
            all_201 = False
        
        if not response_id:
            log_fail(f"A2.{idx+1}", f"Response missing 'id' field or not a valid UUID")
            all_have_uuid = False
        else:
            created_ids.append(response_id)
    
    if all_201 and all_have_uuid and len(created_ids) == 20:
        log_pass("A2: Concurrent POST safety", f"All 20 requests returned HTTP 201 with valid UUID ids")
    else:
        log_fail("A2: Concurrent POST safety", f"Expected 20 successful creates, got {len(created_ids)}")
    
    return created_ids

def test_verify_concurrent_posts(created_ids: List[str]):
    """A3: Verify GET /api/media?slot=audit-concurrent returns all 20 items"""
    print("\n" + "="*80)
    print("TEST A3: Verify all 20 concurrent POSTs are retrievable")
    print("="*80)
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/media?slot=audit-concurrent",
            timeout=60
        )
        
        if response.status_code != 200:
            log_fail("A3: Verify concurrent items", f"GET returned {response.status_code}, expected 200")
            return
        
        data = response.json()
        items = data.get("items", [])
        
        if len(items) >= 20:
            log_pass("A3: Verify concurrent items", f"Found {len(items)} items (expected at least 20)")
        else:
            log_fail("A3: Verify concurrent items", f"Found only {len(items)} items, expected 20")
    
    except Exception as e:
        log_fail("A3: Verify concurrent items", f"Exception: {str(e)}")

def test_cleanup_concurrent_posts(created_ids: List[str]):
    """A4: Cleanup - DELETE all 20 concurrent test items"""
    print("\n" + "="*80)
    print("TEST A4: Cleanup - DELETE all 20 concurrent test items")
    print("="*80)
    
    deleted_count = 0
    failed_deletes = []
    
    for item_id in created_ids:
        try:
            response = requests.delete(
                f"{BASE_URL}/api/media/{item_id}",
                headers=HEADERS_AUTH,
                timeout=60
            )
            
            if response.status_code == 200:
                deleted_count += 1
            else:
                failed_deletes.append(f"{item_id} (status {response.status_code})")
        except Exception as e:
            failed_deletes.append(f"{item_id} (exception: {str(e)})")
    
    if deleted_count == len(created_ids):
        log_pass("A4: Cleanup concurrent items", f"Successfully deleted all {deleted_count} items")
    else:
        log_warning("A4: Cleanup concurrent items", f"Deleted {deleted_count}/{len(created_ids)} items. Failed: {failed_deletes}")

# ============================================================================
# B. REGRESSION TESTS - Single-request CRUD
# ============================================================================

def test_single_crud_cycle(slot_name: str, test_label: str):
    """Test single POST -> GET -> DELETE cycle for a slot"""
    print("\n" + "="*80)
    print(f"TEST {test_label}: Single CRUD cycle for slot={slot_name}")
    print("="*80)
    
    # POST
    payload = {
        "public_id": f"test/{slot_name}/regression-{int(time.time())}",
        "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        "slot": slot_name
    }
    
    try:
        post_response = requests.post(
            f"{BASE_URL}/api/media",
            headers=HEADERS_AUTH,
            json=payload,
            timeout=60
        )
        
        if post_response.status_code != 201:
            log_fail(f"{test_label}.POST", f"Expected 201, got {post_response.status_code}")
            return
        
        post_data = post_response.json()
        item_id = post_data.get("id")
        
        if not item_id:
            log_fail(f"{test_label}.POST", "Response missing 'id' field")
            return
        
        log_pass(f"{test_label}.POST", f"Created item with id={item_id}")
        
        # GET
        get_response = requests.get(
            f"{BASE_URL}/api/media?slot={slot_name}",
            timeout=60
        )
        
        if get_response.status_code != 200:
            log_fail(f"{test_label}.GET", f"Expected 200, got {get_response.status_code}")
            return
        
        get_data = get_response.json()
        items = get_data.get("items", [])
        found = any(item.get("id") == item_id for item in items)
        
        if found:
            log_pass(f"{test_label}.GET", f"Item {item_id} found in slot {slot_name}")
        else:
            log_fail(f"{test_label}.GET", f"Item {item_id} not found in slot {slot_name}")
        
        # DELETE
        delete_response = requests.delete(
            f"{BASE_URL}/api/media/{item_id}",
            headers=HEADERS_AUTH,
            timeout=60
        )
        
        if delete_response.status_code == 200:
            delete_data = delete_response.json()
            if delete_data.get("deleted") == True:
                log_pass(f"{test_label}.DELETE", f"Successfully deleted item {item_id}")
            else:
                log_fail(f"{test_label}.DELETE", f"Response missing 'deleted: true'")
        else:
            log_fail(f"{test_label}.DELETE", f"Expected 200, got {delete_response.status_code}")
    
    except Exception as e:
        log_fail(f"{test_label}", f"Exception during CRUD cycle: {str(e)}")

# ============================================================================
# C. HTTP 200 SANITY CHECKS
# ============================================================================

def test_http_status_checks():
    """C: HTTP 200 sanity check for multiple pages"""
    print("\n" + "="*80)
    print("TEST C: HTTP 200 sanity checks for key pages")
    print("="*80)
    
    pages = [
        "/",
        "/admin/media",
        "/gallery",
        "/services/weddings",
        "/services/food-photography",
        "/services/drone-services",
        "/services/live-streaming",
        "/wedding",
        "/headshots",
        "/blogs"
    ]
    
    all_passed = True
    
    for page in pages:
        try:
            response = requests.get(
                f"{BASE_URL}{page}",
                timeout=60
            )
            
            if response.status_code == 200:
                log_pass(f"C.HTTP.{page}", f"Returns 200")
            else:
                log_fail(f"C.HTTP.{page}", f"Expected 200, got {response.status_code}")
                all_passed = False
        
        except Exception as e:
            log_fail(f"C.HTTP.{page}", f"Exception: {str(e)}")
            all_passed = False
    
    if all_passed:
        log_pass("C: HTTP status checks", f"All {len(pages)} pages returned 200")

# ============================================================================
# MAIN TEST EXECUTION
# ============================================================================

def main():
    print("\n" + "="*80)
    print("PK PHOTOGRAPHY - MONGO RACE CONDITION FIX VERIFICATION")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Token: {ADMIN_TOKEN}")
    print("="*80)
    
    # A. Concurrent safety tests
    print("\n\n### SECTION A: CONCURRENT SAFETY TESTS ###\n")
    test_concurrent_get_requests()
    created_ids = test_concurrent_post_requests()
    if created_ids:
        test_verify_concurrent_posts(created_ids)
        test_cleanup_concurrent_posts(created_ids)
    
    # B. Regression tests
    print("\n\n### SECTION B: REGRESSION TESTS - Single CRUD Cycles ###\n")
    test_single_crud_cycle("weddings-gallery", "B1")
    test_single_crud_cycle("food-photography-gallery", "B2")
    test_single_crud_cycle("hero-slides", "B3")
    
    # C. HTTP status checks
    print("\n\n### SECTION C: HTTP 200 SANITY CHECKS ###\n")
    test_http_status_checks()
    
    # Summary
    print("\n\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"✅ PASSED: {len(test_results['passed'])} tests")
    print(f"❌ FAILED: {len(test_results['failed'])} tests")
    print(f"⚠️  WARNINGS: {len(test_results['warnings'])} warnings")
    
    if test_results['failed']:
        print("\nFailed tests:")
        for failure in test_results['failed']:
            print(f"  - {failure}")
    
    if test_results['warnings']:
        print("\nWarnings:")
        for warning in test_results['warnings']:
            print(f"  - {warning}")
    
    print("="*80)
    
    # Return exit code
    return 0 if len(test_results['failed']) == 0 else 1

if __name__ == "__main__":
    exit(main())
