#!/usr/bin/env python3
"""
Backend testing for PK Photography inline gallery wiring (Aug 2026 update B)
Tests 15 remaining service pages + Media API CRUD + regression checks
"""

import requests
import json
import sys
from typing import List, Dict, Tuple

# Configuration
BASE_URL = "http://localhost:3000"
ADMIN_TOKEN = "PKAdmin@2026"
HEADERS = {"Authorization": f"Bearer {ADMIN_TOKEN}", "Content-Type": "application/json"}

# Test results tracking
passed = []
failed = []

def log(msg: str, level: str = "INFO"):
    """Log test messages"""
    prefix = {"INFO": "ℹ", "PASS": "✅", "FAIL": "❌", "WARN": "⚠"}
    print(f"{prefix.get(level, 'ℹ')} {msg}")

def test_http_200(url: str, description: str) -> bool:
    """Test if URL returns HTTP 200"""
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code == 200:
            log(f"PASS: {description} → 200", "PASS")
            passed.append(description)
            return True
        else:
            log(f"FAIL: {description} → {resp.status_code}", "FAIL")
            failed.append(f"{description} (got {resp.status_code})")
            return False
    except Exception as e:
        log(f"FAIL: {description} → {str(e)}", "FAIL")
        failed.append(f"{description} (error: {str(e)})")
        return False

def test_media_crud(slot: str, slug: str) -> Tuple[bool, str]:
    """Test POST → GET → DELETE flow for a media slot"""
    test_id = None
    try:
        # 1. POST /api/media
        payload = {
            "public_id": f"test/{slug}-1",
            "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            "slot": slot,
            "category": slug,
            "alt": "Auto test image"
        }
        resp = requests.post(f"{BASE_URL}/api/media", json=payload, headers=HEADERS, timeout=10)
        if resp.status_code != 201:
            return False, f"POST failed with {resp.status_code}: {resp.text[:200]}"
        
        data = resp.json()
        test_id = data.get("id")
        if not test_id:
            return False, "POST response missing 'id' field"
        
        log(f"  POST /api/media → 201 (id: {test_id[:8]}...)", "PASS")
        
        # 2. GET /api/media?slot=...
        resp = requests.get(f"{BASE_URL}/api/media?slot={slot}", timeout=10)
        if resp.status_code != 200:
            return False, f"GET failed with {resp.status_code}"
        
        data = resp.json()
        items = data.get("items", [])
        found = any(item.get("id") == test_id for item in items)
        if not found:
            return False, f"GET did not return the created item (id: {test_id})"
        
        log(f"  GET /api/media?slot={slot} → 200 (found item)", "PASS")
        
        # 3. DELETE /api/media/:id
        resp = requests.delete(f"{BASE_URL}/api/media/{test_id}", headers=HEADERS, timeout=10)
        if resp.status_code != 200:
            return False, f"DELETE failed with {resp.status_code}"
        
        data = resp.json()
        if not data.get("deleted"):
            return False, "DELETE response missing 'deleted: true'"
        
        log(f"  DELETE /api/media/{test_id[:8]}... → 200 (deleted)", "PASS")
        
        return True, "CRUD flow passed"
        
    except Exception as e:
        # Cleanup attempt
        if test_id:
            try:
                requests.delete(f"{BASE_URL}/api/media/{test_id}", headers=HEADERS, timeout=5)
            except Exception:
                pass
        return False, f"Exception: {str(e)}"

def cleanup_test_media():
    """Cleanup all test media items"""
    try:
        log("Cleaning up test media items...", "INFO")
        resp = requests.get(f"{BASE_URL}/api/media?limit=500", timeout=10)
        if resp.status_code == 200:
            items = resp.json().get("items", [])
            test_items = [item for item in items if item.get("public_id", "").startswith("test/")]
            for item in test_items:
                item_id = item.get("id")
                if item_id:
                    requests.delete(f"{BASE_URL}/api/media/{item_id}", headers=HEADERS, timeout=5)
            log(f"Cleaned up {len(test_items)} test items", "INFO")
    except Exception as e:
        log(f"Cleanup warning: {str(e)}", "WARN")

def main():
    log("=" * 80, "INFO")
    log("PK Photography - Inline Gallery Wiring Test (Aug 2026 update B)", "INFO")
    log("=" * 80, "INFO")
    
    # A. HTTP 200 checks for all 15 remaining service pages
    log("\n[A] Testing HTTP 200 for 15 remaining service pages...", "INFO")
    service_pages = [
        "/services/family-kids",
        "/services/fashion-shoots",
        "/services/boudoir-shoots",
        "/services/brand-content",
        "/services/product-ecommerce",
        "/services/food-photography",
        "/services/corporate-industrial",
        "/services/real-estate-architectural",
        "/services/influencer-celebrity",
        "/services/podcast-production",
        "/services/editing-retouching",
        "/services/album-design",
        "/services/design-services",
        "/services/live-streaming",
        "/services/drone-services",
    ]
    
    for page in service_pages:
        test_http_200(f"{BASE_URL}{page}", f"GET {page}")
    
    # B. Media API CRUD for 3 representative slots
    log("\n[B] Testing Media API CRUD for 3 representative slots...", "INFO")
    
    test_slots = [
        ("food-photography-gallery", "food-photography"),
        ("live-streaming-gallery", "live-streaming"),
        ("drone-services-gallery", "drone-services"),
    ]
    
    for slot, slug in test_slots:
        log(f"\nTesting slot: {slot}", "INFO")
        success, msg = test_media_crud(slot, slug)
        if success:
            passed.append(f"CRUD flow for {slot}")
        else:
            failed.append(f"CRUD flow for {slot}: {msg}")
            log(f"FAIL: {msg}", "FAIL")
    
    # C. Regression - existing slots still work
    log("\n[C] Regression test - existing slots...", "INFO")
    
    regression_slots = [
        ("hero-slides", "hero"),
        ("weddings-gallery", "weddings"),
        ("events-gallery", "events"),
        ("portraits-headshots-gallery", "portraits-headshots"),
        ("editorial-portfolio-gallery", "editorial-portfolio"),
    ]
    
    for slot, slug in regression_slots:
        log(f"\nRegression test for slot: {slot}", "INFO")
        success, msg = test_media_crud(slot, slug)
        if success:
            passed.append(f"Regression: {slot}")
        else:
            failed.append(f"Regression: {slot}: {msg}")
            log(f"FAIL: {msg}", "FAIL")
    
    # D. Auth tests
    log("\n[D] Testing authentication...", "INFO")
    
    # D1. POST /api/admin/login with wrong token
    try:
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"token": "wrong-token"}, timeout=10)
        if resp.status_code == 401:
            log("PASS: POST /api/admin/login with wrong token → 401", "PASS")
            passed.append("Auth: wrong token returns 401")
        else:
            log(f"FAIL: POST /api/admin/login with wrong token → {resp.status_code} (expected 401)", "FAIL")
            failed.append(f"Auth: wrong token (got {resp.status_code})")
    except Exception as e:
        log(f"FAIL: Auth test error: {str(e)}", "FAIL")
        failed.append(f"Auth: wrong token (error: {str(e)})")
    
    # D2. POST /api/admin/login with correct token
    try:
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"token": ADMIN_TOKEN}, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("ok") and data.get("token") == ADMIN_TOKEN:
                log("PASS: POST /api/admin/login with correct token → 200", "PASS")
                passed.append("Auth: correct token returns 200")
            else:
                log(f"FAIL: POST /api/admin/login response invalid: {data}", "FAIL")
                failed.append("Auth: correct token response invalid")
        else:
            log(f"FAIL: POST /api/admin/login with correct token → {resp.status_code}", "FAIL")
            failed.append(f"Auth: correct token (got {resp.status_code})")
    except Exception as e:
        log(f"FAIL: Auth test error: {str(e)}", "FAIL")
        failed.append(f"Auth: correct token (error: {str(e)})")
    
    # D3. POST /api/media without auth
    try:
        payload = {
            "public_id": "test/no-auth",
            "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            "slot": "test-slot"
        }
        resp = requests.post(f"{BASE_URL}/api/media", json=payload, timeout=10)
        if resp.status_code == 401:
            log("PASS: POST /api/media without auth → 401", "PASS")
            passed.append("Auth: POST /api/media without auth returns 401")
        else:
            log(f"FAIL: POST /api/media without auth → {resp.status_code} (expected 401)", "FAIL")
            failed.append(f"Auth: POST /api/media without auth (got {resp.status_code})")
    except Exception as e:
        log(f"FAIL: Auth test error: {str(e)}", "FAIL")
        failed.append(f"Auth: POST /api/media without auth (error: {str(e)})")
    
    # Cleanup
    log("\n[Cleanup] Removing test media items...", "INFO")
    cleanup_test_media()
    
    # Summary
    log("\n" + "=" * 80, "INFO")
    log("TEST SUMMARY", "INFO")
    log("=" * 80, "INFO")
    log(f"✅ PASSED: {len(passed)}", "PASS")
    log(f"❌ FAILED: {len(failed)}", "FAIL" if failed else "INFO")
    
    if failed:
        log("\nFailed tests:", "FAIL")
        for f in failed:
            log(f"  - {f}", "FAIL")
    
    log("\n" + "=" * 80, "INFO")
    
    # Exit code
    sys.exit(0 if not failed else 1)

if __name__ == "__main__":
    main()
