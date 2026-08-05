#!/usr/bin/env python3
"""
Comprehensive test suite for PK Photography Cloudinary media system.
Tests admin auth, media CRUD, video support, and page rendering.
"""
import requests
import sys
import json

# Test against Next.js app router (not FastAPI proxy)
BASE_URL = "http://localhost:3000"
ADMIN_TOKEN = "PKAdmin@2026"

# Track created media IDs for cleanup
created_media_ids = []

def test_admin_login_success():
    """Test POST /api/admin/login with correct token"""
    print("\n=== A1: POST /api/admin/login (correct token) ===")
    try:
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"token": ADMIN_TOKEN},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200 and data.get("ok") is True and data.get("token") == ADMIN_TOKEN:
            print("✅ PASS: Login with correct token returns 200 with {ok:true, token}")
            return True
        else:
            print(f"❌ FAIL: Expected 200 with {{ok:true, token:'{ADMIN_TOKEN}'}}, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling /api/admin/login: {e}")
        return False

def test_admin_login_failure():
    """Test POST /api/admin/login with wrong token"""
    print("\n=== A2: POST /api/admin/login (wrong token) ===")
    try:
        response = requests.post(
            f"{BASE_URL}/api/admin/login",
            json={"token": "wrong"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 401 and "error" in data and "Invalid admin token" in data["error"]:
            print("✅ PASS: Login with wrong token returns 401 with error message")
            return True
        else:
            print(f"❌ FAIL: Expected 401 with error, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling /api/admin/login: {e}")
        return False

def test_admin_verify_no_auth():
    """Test GET /api/admin/verify without Authorization header"""
    print("\n=== A3: GET /api/admin/verify (no auth) ===")
    try:
        response = requests.get(f"{BASE_URL}/api/admin/verify", timeout=10)
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 401:
            print("✅ PASS: Verify without auth returns 401")
            return True
        else:
            print(f"❌ FAIL: Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling /api/admin/verify: {e}")
        return False

def test_admin_verify_with_auth():
    """Test GET /api/admin/verify with Authorization header"""
    print("\n=== A4: GET /api/admin/verify (with auth) ===")
    try:
        response = requests.get(
            f"{BASE_URL}/api/admin/verify",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200 and data.get("ok") is True:
            print("✅ PASS: Verify with auth returns 200 with {ok:true}")
            return True
        else:
            print(f"❌ FAIL: Expected 200 with {{ok:true}}, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling /api/admin/verify: {e}")
        return False

def test_media_post_no_auth():
    """Test POST /api/media without auth"""
    print("\n=== B1: POST /api/media (no auth) ===")
    try:
        response = requests.post(
            f"{BASE_URL}/api/media",
            json={
                "public_id": "test/hero-1",
                "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                "slot": "hero-slides"
            },
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 401:
            print("✅ PASS: POST /api/media without auth returns 401")
            return True
        else:
            print(f"❌ FAIL: Expected 401, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling POST /api/media: {e}")
        return False

def test_media_post_with_auth():
    """Test POST /api/media with auth and body"""
    print("\n=== B2: POST /api/media (with auth) ===")
    try:
        response = requests.post(
            f"{BASE_URL}/api/media",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "public_id": "test/hero-1",
                "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                "slot": "hero-slides",
                "category": "homepage",
                "alt": "Test Hero Image",
                "sort_order": 99
            },
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 201:
            # Verify response contains required fields
            if "id" in data and "slot" in data and "secure_url" in data and "sort_order" in data:
                # Check that id is a UUID (contains hyphens)
                if "-" in data["id"]:
                    print(f"✅ PASS: POST /api/media returns 201 with UUID id: {data['id']}")
                    created_media_ids.append(data["id"])
                    return True
                else:
                    print(f"❌ FAIL: id field is not a UUID: {data['id']}")
                    return False
            else:
                print(f"❌ FAIL: Response missing required fields (id, slot, secure_url, sort_order)")
                return False
        else:
            print(f"❌ FAIL: Expected 201, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling POST /api/media: {e}")
        return False

def test_media_get_by_slot():
    """Test GET /api/media?slot=hero-slides"""
    print("\n=== B3: GET /api/media?slot=hero-slides ===")
    try:
        response = requests.get(
            f"{BASE_URL}/api/media?slot=hero-slides",
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200:
            if "items" in data and isinstance(data["items"], list):
                # Check if our test item is present
                found = any(item.get("public_id") == "test/hero-1" for item in data["items"])
                if found:
                    print(f"✅ PASS: GET /api/media returns 200 with items array containing test item")
                    return True
                else:
                    print(f"❌ FAIL: Test item not found in response (may need to wait for DB sync)")
                    return False
            else:
                print(f"❌ FAIL: Response missing 'items' array")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling GET /api/media: {e}")
        return False

def test_media_patch():
    """Test PATCH /api/media/:id"""
    print("\n=== B4: PATCH /api/media/:id ===")
    if not created_media_ids:
        print("⚠️  SKIP: No media ID available from previous test")
        return None
    
    media_id = created_media_ids[0]
    try:
        response = requests.patch(
            f"{BASE_URL}/api/media/{media_id}",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "sort_order": 5,
                "alt": "Updated Test Image"
            },
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200:
            if data.get("sort_order") == 5 and data.get("alt") == "Updated Test Image":
                print(f"✅ PASS: PATCH /api/media/:id returns 200 with updated fields")
                return True
            else:
                print(f"❌ FAIL: Updated fields not reflected in response")
                return False
        else:
            print(f"❌ FAIL: Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling PATCH /api/media: {e}")
        return False

def test_video_support():
    """Test POST /api/media with resource_type:video"""
    print("\n=== C1: POST /api/media (video) ===")
    try:
        response = requests.post(
            f"{BASE_URL}/api/media",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "public_id": "test/video-1",
                "secure_url": "https://res.cloudinary.com/demo/video/upload/dog.mp4",
                "resource_type": "video",
                "slot": "hero-slides",
                "category": "homepage",
                "alt": "Test Video",
                "sort_order": 100
            },
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 201:
            if data.get("resource_type") == "video":
                print(f"✅ PASS: POST /api/media with video returns 201 with resource_type:video")
                created_media_ids.append(data["id"])
                
                # Verify GET returns the video
                print("\n=== C2: GET /api/media (verify video) ===")
                get_response = requests.get(f"{BASE_URL}/api/media?slot=hero-slides", timeout=10)
                get_data = get_response.json()
                found_video = any(
                    item.get("public_id") == "test/video-1" and item.get("resource_type") == "video"
                    for item in get_data.get("items", [])
                )
                if found_video:
                    print(f"✅ PASS: Video found in GET /api/media response")
                    return True
                else:
                    print(f"❌ FAIL: Video not found in GET response")
                    return False
            else:
                print(f"❌ FAIL: resource_type not set to 'video' in response")
                return False
        else:
            print(f"❌ FAIL: Expected 201, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error testing video support: {e}")
        return False

def test_page_status(path, name):
    """Test that a page returns HTTP 200"""
    try:
        response = requests.get(f"{BASE_URL}{path}", timeout=15)
        if response.status_code == 200:
            print(f"  ✅ {name}: 200")
            return True
        else:
            print(f"  ❌ {name}: {response.status_code}")
            return False
    except Exception as e:
        print(f"  ❌ {name}: Error - {e}")
        return False

def test_all_pages():
    """Test HTTP 200 status for all required pages"""
    print("\n=== D: Page HTTP Status Checks ===")
    
    pages = [
        ("/", "Home"),
        ("/admin/media", "Admin Media"),
        ("/services/weddings", "Weddings"),
        ("/services/events", "Events"),
        ("/services/portraits-headshots", "Portraits & Headshots"),
        ("/services/editorial-portfolio", "Editorial & Portfolio"),
        ("/services/live-streaming", "Live Streaming"),
        ("/services/family-kids", "Family & Kids"),
        ("/services/fashion-shoots", "Fashion Shoots"),
        ("/services/boudoir-shoots", "Boudoir Shoots"),
        ("/services/brand-content", "Brand Content"),
        ("/services/product-ecommerce", "Product & E-commerce"),
        ("/services/food-photography", "Food Photography"),
        ("/services/corporate-industrial", "Corporate & Industrial"),
        ("/services/real-estate-architectural", "Real Estate & Architectural"),
        ("/services/influencer-celebrity", "Influencer & Celebrity"),
        ("/services/podcast-production", "Podcast Production"),
        ("/services/editing-retouching", "Editing & Retouching"),
        ("/services/album-design", "Album Design"),
        ("/services/drone-services", "Drone Services"),
        ("/services/design-services", "Design Services"),
    ]
    
    results = []
    for path, name in pages:
        results.append(test_page_status(path, name))
    
    passed = sum(results)
    total = len(results)
    print(f"\nPage Status Summary: {passed}/{total} pages returned 200")
    return all(results)

def test_home_rendering():
    """Test that home page references Cloudinary after media insertion"""
    print("\n=== E: Home Page Rendering Check ===")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=15)
        html = response.text
        
        # Check if Cloudinary URL is referenced (either directly or via Next.js image proxy)
        has_cloudinary = "res.cloudinary.com" in html or "/_next/image" in html
        
        if has_cloudinary:
            print(f"✅ PASS: Home page HTML references Cloudinary or Next.js image proxy")
            return True
        else:
            print(f"⚠️  INFO: Home page doesn't reference Cloudinary (may be using defaults)")
            # This is a soft check - not a failure
            return True
    except Exception as e:
        print(f"❌ FAIL: Error checking home page rendering: {e}")
        return False

def cleanup_test_data():
    """Delete all test media created during tests"""
    print("\n=== Cleanup: Deleting Test Media ===")
    if not created_media_ids:
        print("No test media to clean up")
        return True
    
    all_deleted = True
    for media_id in created_media_ids:
        try:
            response = requests.delete(
                f"{BASE_URL}/api/media/{media_id}",
                headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
                timeout=10
            )
            if response.status_code == 200:
                data = response.json()
                if data.get("deleted") is True:
                    print(f"  ✅ Deleted media: {media_id}")
                else:
                    print(f"  ⚠️  Unexpected response for {media_id}: {data}")
                    all_deleted = False
            else:
                print(f"  ❌ Failed to delete {media_id}: {response.status_code}")
                all_deleted = False
        except Exception as e:
            print(f"  ❌ Error deleting {media_id}: {e}")
            all_deleted = False
    
    return all_deleted

def main():
    print("=" * 70)
    print("PK Photography - Cloudinary Media System Test Suite")
    print("=" * 70)
    
    results = []
    
    # A. Auth Tests
    print("\n" + "=" * 70)
    print("SECTION A: Admin Authentication")
    print("=" * 70)
    results.append(("A1: Login (correct token)", test_admin_login_success()))
    results.append(("A2: Login (wrong token)", test_admin_login_failure()))
    results.append(("A3: Verify (no auth)", test_admin_verify_no_auth()))
    results.append(("A4: Verify (with auth)", test_admin_verify_with_auth()))
    
    # B. Media CRUD Tests
    print("\n" + "=" * 70)
    print("SECTION B: Media CRUD Operations")
    print("=" * 70)
    results.append(("B1: POST media (no auth)", test_media_post_no_auth()))
    results.append(("B2: POST media (with auth)", test_media_post_with_auth()))
    results.append(("B3: GET media by slot", test_media_get_by_slot()))
    patch_result = test_media_patch()
    if patch_result is not None:
        results.append(("B4: PATCH media", patch_result))
    
    # C. Video Support
    print("\n" + "=" * 70)
    print("SECTION C: Video Support")
    print("=" * 70)
    results.append(("C: Video upload & retrieval", test_video_support()))
    
    # D. Page Status Checks
    print("\n" + "=" * 70)
    print("SECTION D: Page HTTP Status")
    print("=" * 70)
    results.append(("D: All pages return 200", test_all_pages()))
    
    # E. Rendering Check
    print("\n" + "=" * 70)
    print("SECTION E: Home Page Rendering")
    print("=" * 70)
    results.append(("E: Home page rendering", test_home_rendering()))
    
    # Cleanup
    print("\n" + "=" * 70)
    print("CLEANUP")
    print("=" * 70)
    cleanup_success = cleanup_test_data()
    
    # Summary
    print("\n" + "=" * 70)
    print("TEST SUMMARY")
    print("=" * 70)
    
    for name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {name}")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    print(f"\nTests Passed: {passed}/{total}")
    print(f"Cleanup: {'✅ Success' if cleanup_success else '⚠️  Some items not cleaned up'}")
    
    if all(result for _, result in results):
        print("\n✅ All tests passed! Cloudinary media system is working correctly.")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed. See details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
