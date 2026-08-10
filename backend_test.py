#!/usr/bin/env python3
"""
Comprehensive backend API test suite for PK Photography app.
Tests the FastAPI proxy at http://localhost:8001 which forwards to Next.js API routes.
"""

import requests
import json
import sys
from typing import Dict, List, Any

# Configuration
BASE_URL = "http://localhost:8001"
ADMIN_TOKEN = "PKAdmin@2026"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_test(test_name: str, passed: bool, details: str = ""):
    """Log test result"""
    if passed:
        test_results["passed"].append(f"✅ {test_name}")
        print(f"✅ PASS: {test_name}")
    else:
        test_results["failed"].append(f"❌ {test_name}: {details}")
        print(f"❌ FAIL: {test_name}")
        if details:
            print(f"   Details: {details}")

def log_warning(message: str):
    """Log warning"""
    test_results["warnings"].append(f"⚠️  {message}")
    print(f"⚠️  WARNING: {message}")

def check_no_objectid(data: Any, context: str) -> bool:
    """Check that response doesn't contain MongoDB ObjectId (_id field)"""
    if isinstance(data, dict):
        if "_id" in data:
            log_warning(f"{context}: Response contains MongoDB _id field (should use UUID only)")
            return False
        for value in data.values():
            if not check_no_objectid(value, context):
                return False
    elif isinstance(data, list):
        for item in data:
            if not check_no_objectid(item, context):
                return False
    return True

# Track created media IDs for cleanup
created_media_ids = []

print("=" * 80)
print("PK PHOTOGRAPHY BACKEND API TEST SUITE")
print("=" * 80)
print()

# ============================================================================
# 1. MEDIA API TESTS (with new location field)
# ============================================================================
print("\n" + "=" * 80)
print("1. MEDIA API TESTS (with location field)")
print("=" * 80)

# Test 1.1: POST /api/media WITHOUT auth => 401
print("\n[Test 1.1] POST /api/media without auth should return 401")
try:
    response = requests.post(
        f"{BASE_URL}/api/media",
        json={
            "public_id": "audit_test_1",
            "secure_url": "https://res.cloudinary.com/jeoj8k1t/image/upload/v1/x.jpg",
            "resource_type": "image",
            "slot": "weddings-gallery",
            "category": "weddings",
            "alt": "Test Couple",
            "location": "Goa Beach",
            "sort_order": 5
        },
        timeout=10
    )
    if response.status_code == 401:
        log_test("POST /api/media without auth returns 401", True)
    else:
        log_test("POST /api/media without auth returns 401", False, 
                f"Expected 401, got {response.status_code}")
except Exception as e:
    log_test("POST /api/media without auth returns 401", False, str(e))

# Test 1.2: POST /api/media WITH auth and location field => 201
print("\n[Test 1.2] POST /api/media with auth and location field should return 201")
try:
    response = requests.post(
        f"{BASE_URL}/api/media",
        headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
        json={
            "public_id": "audit_test_1",
            "secure_url": "https://res.cloudinary.com/jeoj8k1t/image/upload/v1/x.jpg",
            "resource_type": "image",
            "slot": "weddings-gallery",
            "category": "weddings",
            "alt": "Test Couple",
            "location": "Goa Beach",
            "sort_order": 5
        },
        timeout=10
    )
    
    if response.status_code == 201:
        data = response.json()
        
        # Check for required fields
        checks = []
        checks.append(("id field present", "id" in data))
        checks.append(("alt field correct", data.get("alt") == "Test Couple"))
        checks.append(("location field correct", data.get("location") == "Goa Beach"))
        checks.append(("slot field correct", data.get("slot") == "weddings-gallery"))
        checks.append(("sort_order correct", data.get("sort_order") == 5))
        
        # Check no MongoDB ObjectId
        check_no_objectid(data, "POST /api/media response")
        
        all_passed = all(check[1] for check in checks)
        
        if all_passed:
            created_media_ids.append(data["id"])
            log_test("POST /api/media with auth returns 201 with location field", True)
            print(f"   Created media ID: {data['id']}")
            print(f"   Location: {data.get('location')}")
            print(f"   Alt: {data.get('alt')}")
        else:
            failed_checks = [check[0] for check in checks if not check[1]]
            log_test("POST /api/media with auth returns 201 with location field", False,
                    f"Failed checks: {', '.join(failed_checks)}")
    else:
        log_test("POST /api/media with auth returns 201 with location field", False,
                f"Expected 201, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("POST /api/media with auth returns 201 with location field", False, str(e))

# Test 1.3: GET /api/media?slot=weddings-gallery => 200 with location field
print("\n[Test 1.3] GET /api/media?slot=weddings-gallery should return item with location")
try:
    response = requests.get(
        f"{BASE_URL}/api/media",
        params={"slot": "weddings-gallery"},
        timeout=10
    )
    
    if response.status_code == 200:
        data = response.json()
        
        # Check structure
        if "items" not in data:
            log_test("GET /api/media returns items array", False, "No 'items' field in response")
        else:
            items = data["items"]
            
            # Find our test item
            test_item = None
            for item in items:
                if item.get("public_id") == "audit_test_1":
                    test_item = item
                    break
            
            if test_item:
                checks = []
                checks.append(("location field present", test_item.get("location") == "Goa Beach"))
                checks.append(("alt field present", test_item.get("alt") == "Test Couple"))
                
                # Check no MongoDB ObjectId
                check_no_objectid(data, "GET /api/media response")
                
                all_passed = all(check[1] for check in checks)
                
                if all_passed:
                    log_test("GET /api/media returns item with location field", True)
                    print(f"   Found test item with location: {test_item.get('location')}")
                else:
                    failed_checks = [check[0] for check in checks if not check[1]]
                    log_test("GET /api/media returns item with location field", False,
                            f"Failed checks: {', '.join(failed_checks)}")
            else:
                log_test("GET /api/media returns item with location field", False,
                        "Test item not found in response")
    else:
        log_test("GET /api/media returns item with location field", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/media returns item with location field", False, str(e))

# Test 1.4: PATCH /api/media/{id} with location and alt => 200
print("\n[Test 1.4] PATCH /api/media/{id} should update location and alt")
if created_media_ids:
    try:
        media_id = created_media_ids[0]
        response = requests.patch(
            f"{BASE_URL}/api/media/{media_id}",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "location": "Mandrem Beach",
                "alt": "Renamed Couple"
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            
            checks = []
            checks.append(("location updated", data.get("location") == "Mandrem Beach"))
            checks.append(("alt updated", data.get("alt") == "Renamed Couple"))
            
            # Check no MongoDB ObjectId
            check_no_objectid(data, "PATCH /api/media response")
            
            all_passed = all(check[1] for check in checks)
            
            if all_passed:
                log_test("PATCH /api/media updates location and alt", True)
                print(f"   Updated location: {data.get('location')}")
                print(f"   Updated alt: {data.get('alt')}")
            else:
                failed_checks = [check[0] for check in checks if not check[1]]
                log_test("PATCH /api/media updates location and alt", False,
                        f"Failed checks: {', '.join(failed_checks)}")
        else:
            log_test("PATCH /api/media updates location and alt", False,
                    f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_test("PATCH /api/media updates location and alt", False, str(e))
else:
    log_test("PATCH /api/media updates location and alt", False, "No media ID to test")

# Test 1.5: Check for pre-existing media (DO NOT DELETE)
print("\n[Test 1.5] Checking for pre-existing media to preserve")
try:
    response = requests.get(
        f"{BASE_URL}/api/media",
        params={"slot": "weddings-gallery"},
        timeout=10
    )
    
    if response.status_code == 200:
        data = response.json()
        items = data.get("items", [])
        
        # Find the specific item mentioned in review request
        protected_item = None
        for item in items:
            if item.get("original_filename") == "0N3A0991 pre wedding":
                protected_item = item
                break
        
        if protected_item:
            print(f"   ✓ Found protected item: {protected_item.get('original_filename')}")
            print(f"     ID: {protected_item.get('id')}")
            print(f"     Will NOT delete this item")
        else:
            print(f"   ℹ No item with original_filename '0N3A0991 pre wedding' found")
except Exception as e:
    print(f"   Error checking for protected items: {e}")

# Test 1.6: DELETE /api/media/{id} => {deleted:true}
print("\n[Test 1.6] DELETE /api/media/{id} should return {deleted:true}")
if created_media_ids:
    try:
        media_id = created_media_ids[0]
        response = requests.delete(
            f"{BASE_URL}/api/media/{media_id}",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            
            if data.get("deleted") == True and data.get("id") == media_id:
                log_test("DELETE /api/media returns {deleted:true}", True)
                print(f"   Deleted media ID: {media_id}")
                created_media_ids.remove(media_id)
            else:
                log_test("DELETE /api/media returns {deleted:true}", False,
                        f"Response: {data}")
        else:
            log_test("DELETE /api/media returns {deleted:true}", False,
                    f"Expected 200, got {response.status_code}")
    except Exception as e:
        log_test("DELETE /api/media returns {deleted:true}", False, str(e))
else:
    log_test("DELETE /api/media returns {deleted:true}", False, "No media ID to test")

# ============================================================================
# 2. NEXT-AUTH SESSION SHIM TESTS
# ============================================================================
print("\n" + "=" * 80)
print("2. NEXT-AUTH SESSION SHIM TESTS")
print("=" * 80)

# Test 2.1: GET /api/auth/session => 200 {}
print("\n[Test 2.1] GET /api/auth/session should return 200 with empty JSON")
try:
    response = requests.get(f"{BASE_URL}/api/auth/session", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data == {}:
            log_test("GET /api/auth/session returns 200 {}", True)
        else:
            log_test("GET /api/auth/session returns 200 {}", False,
                    f"Expected empty object, got: {data}")
    else:
        log_test("GET /api/auth/session returns 200 {}", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/auth/session returns 200 {}", False, str(e))

# Test 2.2: GET /api/auth/providers => 200 {}
print("\n[Test 2.2] GET /api/auth/providers should return 200 with empty JSON")
try:
    response = requests.get(f"{BASE_URL}/api/auth/providers", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data == {}:
            log_test("GET /api/auth/providers returns 200 {}", True)
        else:
            log_test("GET /api/auth/providers returns 200 {}", False,
                    f"Expected empty object, got: {data}")
    else:
        log_test("GET /api/auth/providers returns 200 {}", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/auth/providers returns 200 {}", False, str(e))

# Test 2.3: GET /api/auth/csrf => 200 {"csrfToken":""}
print("\n[Test 2.3] GET /api/auth/csrf should return 200 with {csrfToken:''}")
try:
    response = requests.get(f"{BASE_URL}/api/auth/csrf", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if "csrfToken" in data and data["csrfToken"] == "":
            log_test("GET /api/auth/csrf returns 200 {csrfToken:''}", True)
        else:
            log_test("GET /api/auth/csrf returns 200 {csrfToken:''}", False,
                    f"Expected {{csrfToken:''}}, got: {data}")
    else:
        log_test("GET /api/auth/csrf returns 200 {csrfToken:''}", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/auth/csrf returns 200 {csrfToken:''}", False, str(e))

# Test 2.4: POST /api/auth/_log => 200 {}
print("\n[Test 2.4] POST /api/auth/_log should return 200 with empty JSON")
try:
    response = requests.post(
        f"{BASE_URL}/api/auth/_log",
        json={"level": "info", "message": "test"},
        timeout=10
    )
    
    if response.status_code == 200:
        data = response.json()
        if data == {}:
            log_test("POST /api/auth/_log returns 200 {}", True)
        else:
            log_test("POST /api/auth/_log returns 200 {}", False,
                    f"Expected empty object, got: {data}")
    else:
        log_test("POST /api/auth/_log returns 200 {}", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("POST /api/auth/_log returns 200 {}", False, str(e))

# ============================================================================
# 3. CORE ENDPOINTS (REGRESSION TESTS)
# ============================================================================
print("\n" + "=" * 80)
print("3. CORE ENDPOINTS (REGRESSION TESTS)")
print("=" * 80)

# Test 3.1: POST /api/admin/login with correct token => 200
print("\n[Test 3.1] POST /api/admin/login with correct token should return 200")
try:
    response = requests.post(
        f"{BASE_URL}/api/admin/login",
        json={"token": ADMIN_TOKEN},
        timeout=10
    )
    
    if response.status_code == 200:
        data = response.json()
        if data.get("ok") == True and data.get("token") == ADMIN_TOKEN:
            log_test("POST /api/admin/login with correct token returns 200", True)
        else:
            log_test("POST /api/admin/login with correct token returns 200", False,
                    f"Expected {{ok:true, token:'{ADMIN_TOKEN}'}}, got: {data}")
    else:
        log_test("POST /api/admin/login with correct token returns 200", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("POST /api/admin/login with correct token returns 200", False, str(e))

# Test 3.2: POST /api/admin/login with wrong token => 401
print("\n[Test 3.2] POST /api/admin/login with wrong token should return 401")
try:
    response = requests.post(
        f"{BASE_URL}/api/admin/login",
        json={"token": "wrong_token"},
        timeout=10
    )
    
    if response.status_code == 401:
        data = response.json()
        if "error" in data:
            log_test("POST /api/admin/login with wrong token returns 401", True)
        else:
            log_test("POST /api/admin/login with wrong token returns 401", False,
                    "Response missing error field")
    else:
        log_test("POST /api/admin/login with wrong token returns 401", False,
                f"Expected 401, got {response.status_code}")
except Exception as e:
    log_test("POST /api/admin/login with wrong token returns 401", False, str(e))

# Test 3.3: GET /api/admin/verify with Bearer token => 200
print("\n[Test 3.3] GET /api/admin/verify with Bearer token should return 200")
try:
    response = requests.get(
        f"{BASE_URL}/api/admin/verify",
        headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
        timeout=10
    )
    
    if response.status_code == 200:
        data = response.json()
        if data.get("ok") == True:
            log_test("GET /api/admin/verify with Bearer token returns 200", True)
        else:
            log_test("GET /api/admin/verify with Bearer token returns 200", False,
                    f"Expected {{ok:true}}, got: {data}")
    else:
        log_test("GET /api/admin/verify with Bearer token returns 200", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/admin/verify with Bearer token returns 200", False, str(e))

# Test 3.4: GET /api/admin/verify without token => 401
print("\n[Test 3.4] GET /api/admin/verify without token should return 401")
try:
    response = requests.get(f"{BASE_URL}/api/admin/verify", timeout=10)
    
    if response.status_code == 401:
        log_test("GET /api/admin/verify without token returns 401", True)
    else:
        log_test("GET /api/admin/verify without token returns 401", False,
                f"Expected 401, got {response.status_code}")
except Exception as e:
    log_test("GET /api/admin/verify without token returns 401", False, str(e))

# Test 3.5: POST /api/contact with valid data => 201
print("\n[Test 3.5] POST /api/contact with valid data should return 201")
try:
    response = requests.post(
        f"{BASE_URL}/api/contact",
        json={
            "name": "Rajesh Kumar",
            "email": "rajesh.kumar@example.com",
            "phone": "9876543210",
            "date": "2026-09-15",
            "service": "Wedding Photography"
        },
        timeout=10
    )
    
    if response.status_code == 201:
        data = response.json()
        if data.get("ok") == True:
            log_test("POST /api/contact with valid data returns 201", True)
        else:
            log_test("POST /api/contact with valid data returns 201", False,
                    f"Expected {{ok:true}}, got: {data}")
    else:
        log_test("POST /api/contact with valid data returns 201", False,
                f"Expected 201, got {response.status_code}: {response.text}")
except Exception as e:
    log_test("POST /api/contact with valid data returns 201", False, str(e))

# Test 3.6: POST /api/contact with missing fields => 400
print("\n[Test 3.6] POST /api/contact with missing fields should return 400")
try:
    response = requests.post(
        f"{BASE_URL}/api/contact",
        json={"name": "Test User"},
        timeout=10
    )
    
    if response.status_code == 400:
        data = response.json()
        if "error" in data:
            log_test("POST /api/contact with missing fields returns 400", True)
        else:
            log_test("POST /api/contact with missing fields returns 400", False,
                    "Response missing error field")
    else:
        log_test("POST /api/contact with missing fields returns 400", False,
                f"Expected 400, got {response.status_code}")
except Exception as e:
    log_test("POST /api/contact with missing fields returns 400", False, str(e))

# Test 3.7: POST /api/newsletter with valid email => 201
print("\n[Test 3.7] POST /api/newsletter with valid email should return 201")
try:
    response = requests.post(
        f"{BASE_URL}/api/newsletter",
        json={"email": "test@example.com"},
        timeout=10
    )
    
    if response.status_code == 201:
        data = response.json()
        if data.get("ok") == True:
            log_test("POST /api/newsletter with valid email returns 201", True)
        else:
            log_test("POST /api/newsletter with valid email returns 201", False,
                    f"Expected {{ok:true}}, got: {data}")
    else:
        log_test("POST /api/newsletter with valid email returns 201", False,
                f"Expected 201, got {response.status_code}")
except Exception as e:
    log_test("POST /api/newsletter with valid email returns 201", False, str(e))

# Test 3.8: POST /api/newsletter with invalid email => 400
print("\n[Test 3.8] POST /api/newsletter with invalid email should return 400")
try:
    response = requests.post(
        f"{BASE_URL}/api/newsletter",
        json={"email": "not-an-email"},
        timeout=10
    )
    
    if response.status_code == 400:
        data = response.json()
        if "error" in data:
            log_test("POST /api/newsletter with invalid email returns 400", True)
        else:
            log_test("POST /api/newsletter with invalid email returns 400", False,
                    "Response missing error field")
    else:
        log_test("POST /api/newsletter with invalid email returns 400", False,
                f"Expected 400, got {response.status_code}")
except Exception as e:
    log_test("POST /api/newsletter with invalid email returns 400", False, str(e))

# Test 3.9: GET /api/auth/me without cookie => 401
print("\n[Test 3.9] GET /api/auth/me without cookie should return 401")
try:
    response = requests.get(f"{BASE_URL}/api/auth/me", timeout=10)
    
    if response.status_code == 401:
        data = response.json()
        if "error" in data and data["error"] == "not authenticated":
            log_test("GET /api/auth/me without cookie returns 401", True)
        else:
            log_test("GET /api/auth/me without cookie returns 401", False,
                    f"Expected {{error:'not authenticated'}}, got: {data}")
    else:
        log_test("GET /api/auth/me without cookie returns 401", False,
                f"Expected 401, got {response.status_code}")
except Exception as e:
    log_test("GET /api/auth/me without cookie returns 401", False, str(e))

# Test 3.10: GET /api/health => 200
print("\n[Test 3.10] GET /api/health should return 200")
try:
    response = requests.get(f"{BASE_URL}/health", timeout=10)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "ok":
            log_test("GET /api/health returns 200 {status:'ok'}", True)
        else:
            log_test("GET /api/health returns 200 {status:'ok'}", False,
                    f"Expected {{status:'ok'}}, got: {data}")
    else:
        log_test("GET /api/health returns 200 {status:'ok'}", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/health returns 200 {status:'ok'}", False, str(e))

# Test 3.11: GET /api/root => 200
print("\n[Test 3.11] GET /api/root should return 200")
try:
    response = requests.get(f"{BASE_URL}/api/root", timeout=10)
    
    if response.status_code == 200:
        log_test("GET /api/root returns 200", True)
    else:
        log_test("GET /api/root returns 200", False,
                f"Expected 200, got {response.status_code}")
except Exception as e:
    log_test("GET /api/root returns 200", False, str(e))

# ============================================================================
# CLEANUP
# ============================================================================
print("\n" + "=" * 80)
print("CLEANUP")
print("=" * 80)

if created_media_ids:
    print(f"\nCleaning up {len(created_media_ids)} remaining test media items...")
    for media_id in created_media_ids[:]:
        try:
            response = requests.delete(
                f"{BASE_URL}/api/media/{media_id}",
                headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
                timeout=10
            )
            if response.status_code == 200:
                print(f"   ✓ Deleted media ID: {media_id}")
                created_media_ids.remove(media_id)
            else:
                print(f"   ✗ Failed to delete media ID: {media_id} (status: {response.status_code})")
        except Exception as e:
            print(f"   ✗ Error deleting media ID {media_id}: {e}")
else:
    print("\n✓ No test media items to clean up")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)

total_tests = len(test_results["passed"]) + len(test_results["failed"])
passed_count = len(test_results["passed"])
failed_count = len(test_results["failed"])
warnings_count = len(test_results["warnings"])

print(f"\nTotal Tests: {total_tests}")
print(f"Passed: {passed_count}")
print(f"Failed: {failed_count}")
print(f"Warnings: {warnings_count}")

if test_results["failed"]:
    print("\n❌ FAILED TESTS:")
    for failure in test_results["failed"]:
        print(f"   {failure}")

if test_results["warnings"]:
    print("\n⚠️  WARNINGS:")
    for warning in test_results["warnings"]:
        print(f"   {warning}")

if failed_count == 0:
    print("\n✅ ALL TESTS PASSED!")
    sys.exit(0)
else:
    print(f"\n❌ {failed_count} TEST(S) FAILED")
    sys.exit(1)
