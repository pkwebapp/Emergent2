#!/usr/bin/env python3
"""
Smoke test for FastAPI proxy + Next.js API stack after vercel.json addition.
Tests:
1. FastAPI /health endpoint
2. FastAPI proxy to Next.js /api/root endpoint
"""
import requests
import sys

# Test against localhost since we're inside the container
BASE_URL = "http://localhost:8001"

def test_health_endpoint():
    """Test FastAPI /health endpoint (not proxied)"""
    print("\n=== Test 1: FastAPI /health endpoint ===")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200 and response.json() == {"status": "ok"}:
            print("✅ PASS: /health endpoint working correctly")
            return True
        else:
            print("❌ FAIL: /health endpoint returned unexpected response")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling /health endpoint: {e}")
        return False

def test_api_root_proxy():
    """Test FastAPI proxy to Next.js /api/root endpoint"""
    print("\n=== Test 2: FastAPI proxy to Next.js /api/root ===")
    try:
        response = requests.get(f"{BASE_URL}/api/root", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200 and response.json() == {"message": "Hello World"}:
            print("✅ PASS: /api/root proxy working correctly")
            return True
        else:
            print("❌ FAIL: /api/root proxy returned unexpected response")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling /api/root endpoint: {e}")
        return False

def main():
    print("=" * 60)
    print("Smoke Test: FastAPI Proxy + Next.js API Stack")
    print("After vercel.json addition")
    print("=" * 60)
    
    results = []
    results.append(test_health_endpoint())
    results.append(test_api_root_proxy())
    
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Tests Passed: {passed}/{total}")
    
    if all(results):
        print("\n✅ All tests passed! Proxy + Next.js API stack is healthy.")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed. See details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
