#!/usr/bin/env python3
"""
Backend test suite for PK Photography - Admin Token Login Fix Verification
Tests admin authentication endpoints through the FastAPI proxy
"""

import requests
import json
from typing import Dict, Any

# Configuration
BASE_URL = "https://b2d946cb-c228-46f3-a9fb-9772bf10a7a6.preview.emergentagent.com"
ADMIN_TOKEN = "PKAdmin@2026"
WRONG_TOKEN = "wrongtoken"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
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

# ============================================================================
# ADMIN AUTH TESTS
# ============================================================================

def test_admin_login_correct_token():
    """Test 1: POST /api/admin/login with correct token"""
    print("\n" + "="*80)
    print("TEST 1: POST /api/admin/login with correct token")
    print("="*80)
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            headers={"Content-Type": "application/json"},
            json={"token": ADMIN_TOKEN},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code != 200:
            log_fail("Test 1", f"Expected HTTP 200, got {response.status_code}")
            return False
        
        try:
            data = response.json()
            if data.get("ok") != True:
                log_fail("Test 1", f"Expected {{ok: true}}, got {data}")
                return False
            
            if data.get("token") != ADMIN_TOKEN:
                log_fail("Test 1", f"Expected token '{ADMIN_TOKEN}', got '{data.get('token')}'")
                return False
            
            log_pass("Test 1", f"POST /api/admin/login with correct token returns 200 {{ok: true, token: '{ADMIN_TOKEN}'}}")
            return True
        
        except json.JSONDecodeError:
            log_fail("Test 1", f"Response is not valid JSON: {response.text}")
            return False
    
    except Exception as e:
        log_fail("Test 1", f"Exception: {str(e)}")
        return False

def test_admin_login_wrong_token():
    """Test 2: POST /api/admin/login with wrong token"""
    print("\n" + "="*80)
    print("TEST 2: POST /api/admin/login with wrong token")
    print("="*80)
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            headers={"Content-Type": "application/json"},
            json={"token": WRONG_TOKEN},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code != 401:
            log_fail("Test 2", f"Expected HTTP 401, got {response.status_code}")
            return False
        
        try:
            data = response.json()
            if data.get("error") != "Invalid admin token":
                log_fail("Test 2", f"Expected {{error: 'Invalid admin token'}}, got {data}")
                return False
            
            log_pass("Test 2", "POST /api/admin/login with wrong token returns 401 {error: 'Invalid admin token'}")
            return True
        
        except json.JSONDecodeError:
            log_fail("Test 2", f"Response is not valid JSON: {response.text}")
            return False
    
    except Exception as e:
        log_fail("Test 2", f"Exception: {str(e)}")
        return False

def test_admin_verify_with_x_admin_token():
    """Test 3: GET /api/admin/verify with x-admin-token header"""
    print("\n" + "="*80)
    print("TEST 3: GET /api/admin/verify with x-admin-token header")
    print("="*80)
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"x-admin-token": ADMIN_TOKEN},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code != 200:
            log_fail("Test 3", f"Expected HTTP 200, got {response.status_code}")
            return False
        
        try:
            data = response.json()
            if data.get("ok") != True:
                log_fail("Test 3", f"Expected {{ok: true}}, got {data}")
                return False
            
            log_pass("Test 3", "GET /api/admin/verify with x-admin-token header returns 200 {ok: true}")
            return True
        
        except json.JSONDecodeError:
            log_fail("Test 3", f"Response is not valid JSON: {response.text}")
            return False
    
    except Exception as e:
        log_fail("Test 3", f"Exception: {str(e)}")
        return False

def test_admin_verify_with_bearer_token():
    """Test 4: GET /api/admin/verify with Authorization: Bearer header"""
    print("\n" + "="*80)
    print("TEST 4: GET /api/admin/verify with Authorization: Bearer header")
    print("="*80)
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code != 200:
            log_fail("Test 4", f"Expected HTTP 200, got {response.status_code}")
            return False
        
        try:
            data = response.json()
            if data.get("ok") != True:
                log_fail("Test 4", f"Expected {{ok: true}}, got {data}")
                return False
            
            log_pass("Test 4", "GET /api/admin/verify with Authorization: Bearer header returns 200 {ok: true}")
            return True
        
        except json.JSONDecodeError:
            log_fail("Test 4", f"Response is not valid JSON: {response.text}")
            return False
    
    except Exception as e:
        log_fail("Test 4", f"Exception: {str(e)}")
        return False

def test_admin_verify_no_token():
    """Test 5: GET /api/admin/verify with no token"""
    print("\n" + "="*80)
    print("TEST 5: GET /api/admin/verify with no token")
    print("="*80)
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code != 401:
            log_fail("Test 5", f"Expected HTTP 401, got {response.status_code}")
            return False
        
        try:
            data = response.json()
            if "error" not in data:
                log_fail("Test 5", f"Expected error field in response, got {data}")
                return False
            
            log_pass("Test 5", "GET /api/admin/verify with no token returns 401 with error")
            return True
        
        except json.JSONDecodeError:
            log_fail("Test 5", f"Response is not valid JSON: {response.text}")
            return False
    
    except Exception as e:
        log_fail("Test 5", f"Exception: {str(e)}")
        return False

def test_admin_verify_wrong_token():
    """Test 6: GET /api/admin/verify with wrong token"""
    print("\n" + "="*80)
    print("TEST 6: GET /api/admin/verify with wrong token")
    print("="*80)
    
    try:
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": f"Bearer {WRONG_TOKEN}"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code != 401:
            log_fail("Test 6", f"Expected HTTP 401, got {response.status_code}")
            return False
        
        try:
            data = response.json()
            if "error" not in data:
                log_fail("Test 6", f"Expected error field in response, got {data}")
                return False
            
            log_pass("Test 6", "GET /api/admin/verify with wrong token returns 401 with error")
            return True
        
        except json.JSONDecodeError:
            log_fail("Test 6", f"Response is not valid JSON: {response.text}")
            return False
    
    except Exception as e:
        log_fail("Test 6", f"Exception: {str(e)}")
        return False

# ============================================================================
# MAIN TEST EXECUTION
# ============================================================================

def main():
    print("\n" + "="*80)
    print("PK PHOTOGRAPHY - ADMIN TOKEN LOGIN FIX VERIFICATION")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Token: {ADMIN_TOKEN}")
    print("="*80)
    
    # Run all tests
    print("\n### ADMIN AUTHENTICATION TESTS ###\n")
    test_admin_login_correct_token()
    test_admin_login_wrong_token()
    test_admin_verify_with_x_admin_token()
    test_admin_verify_with_bearer_token()
    test_admin_verify_no_token()
    test_admin_verify_wrong_token()
    
    # Summary
    print("\n\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"✅ PASSED: {len(test_results['passed'])} tests")
    print(f"❌ FAILED: {len(test_results['failed'])} tests")
    
    if test_results['failed']:
        print("\nFailed tests:")
        for failure in test_results['failed']:
            print(f"  - {failure}")
    
    print("="*80)
    
    # Return exit code
    return 0 if len(test_results['failed']) == 0 else 1

if __name__ == "__main__":
    exit(main())
