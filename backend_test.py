#!/usr/bin/env python3
"""
Test suite for PK Photography service pages + /gallery integration (Aug 2026 update).
Tests the 4 new gallery slots (weddings-gallery, events-gallery, portraits-headshots-gallery, editorial-portfolio-gallery).
"""
import requests
import sys
import json

# Base URL from environment
BASE_URL = "https://staging-emergent.preview.emergentagent.com"
ADMIN_TOKEN = "PKAdmin@2026"

# Track created media IDs for cleanup
created_media_ids = []

def test_http_200_checks():
    """Test A: All required URLs return HTTP 200"""
    print("\n" + "=" * 70)
    print("SECTION A: HTTP 200 Status Checks")
    print("=" * 70)
    
    urls = [
        ("/", "Home"),
        ("/gallery", "Gallery"),
        ("/gallery?category=portfolio", "Gallery - Portfolio"),
        ("/gallery?category=headshots", "Gallery - Headshots"),
        ("/gallery?category=weddings", "Gallery - Weddings"),
        ("/gallery?category=events", "Gallery - Events"),
        ("/services/weddings", "Weddings Service"),
        ("/services/events", "Events Service"),
        ("/services/portraits-headshots", "Portraits & Headshots Service"),
        ("/services/editorial-portfolio", "Editorial & Portfolio Service"),
        ("/admin/media", "Admin Media"),
    ]
    
    results = []
    for path, name in urls:
        try:
            response = requests.get(f"{BASE_URL}{path}", timeout=15)
            if response.status_code == 200:
                print(f"  ✅ {name}: 200")
                results.append(True)
            else:
                print(f"  ❌ {name}: {response.status_code}")
                results.append(False)
        except Exception as e:
            print(f"  ❌ {name}: Error - {e}")
            results.append(False)
    
    passed = sum(results)
    total = len(results)
    print(f"\nHTTP 200 Summary: {passed}/{total} URLs returned 200")
    return all(results)


def test_media_api_for_slot(slot, category):
    """Test B: Media API CRUD for a specific slot"""
    print(f"\n=== Testing slot: {slot} ===")
    
    # B1: POST - Create media
    print(f"\n--- POST /api/media (slot={slot}) ---")
    try:
        response = requests.post(
            f"{BASE_URL}/api/media",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "public_id": f"test/{slot}-1",
                "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                "slot": slot,
                "category": category,
                "alt": f"Auto test for {slot}",
                "sort_order": 99
            },
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 201 and "id" in data and "-" in data["id"]:
            print(f"✅ PASS: POST created media with UUID id: {data['id']}")
            created_media_ids.append(data["id"])
            media_id = data["id"]
        else:
            print(f"❌ FAIL: Expected 201 with UUID id, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling POST /api/media: {e}")
        return False
    
    # B2: GET - Retrieve media by slot
    print(f"\n--- GET /api/media?slot={slot} ---")
    try:
        response = requests.get(
            f"{BASE_URL}/api/media?slot={slot}",
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response items count: {len(data.get('items', []))}")
        
        if response.status_code == 200 and "items" in data:
            found = any(item.get("public_id") == f"test/{slot}-1" for item in data["items"])
            if found:
                print(f"✅ PASS: GET returned items array containing test item")
            else:
                print(f"❌ FAIL: Test item not found in response")
                return False
        else:
            print(f"❌ FAIL: Expected 200 with items array, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling GET /api/media: {e}")
        return False
    
    # B3: DELETE - Remove media
    print(f"\n--- DELETE /api/media/{media_id} ---")
    try:
        response = requests.delete(
            f"{BASE_URL}/api/media/{media_id}",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 200 and data.get("deleted") is True:
            print(f"✅ PASS: DELETE removed media successfully")
            # Remove from cleanup list since we already deleted it
            if media_id in created_media_ids:
                created_media_ids.remove(media_id)
            return True
        else:
            print(f"❌ FAIL: Expected 200 with {{deleted:true}}, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling DELETE /api/media: {e}")
        return False


def test_all_new_slots():
    """Test B: Media API for all 4 new slots"""
    print("\n" + "=" * 70)
    print("SECTION B: Media API for 4 New Slots")
    print("=" * 70)
    
    slots = [
        ("weddings-gallery", "weddings"),
        ("events-gallery", "events"),
        ("portraits-headshots-gallery", "portraits-headshots"),
        ("editorial-portfolio-gallery", "editorial-portfolio"),
    ]
    
    results = []
    for slot, category in slots:
        result = test_media_api_for_slot(slot, category)
        results.append((slot, result))
    
    passed = sum(1 for _, r in results if r)
    total = len(results)
    print(f"\n\nMedia API Summary: {passed}/{total} slots passed all tests")
    return all(r for _, r in results)


def test_video_support():
    """Test C: Video support for new slots"""
    print("\n" + "=" * 70)
    print("SECTION C: Video Support")
    print("=" * 70)
    
    slot = "weddings-gallery"
    
    # C1: POST video
    print(f"\n--- POST /api/media (video, slot={slot}) ---")
    try:
        response = requests.post(
            f"{BASE_URL}/api/media",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "public_id": "test/wedding-video-1",
                "secure_url": "https://res.cloudinary.com/demo/video/upload/dog.mp4",
                "resource_type": "video",
                "slot": slot,
                "category": "weddings",
                "alt": "Test Wedding Video",
                "sort_order": 100
            },
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: {json.dumps(data, indent=2)}")
        
        if response.status_code == 201 and data.get("resource_type") == "video":
            print(f"✅ PASS: POST created video with resource_type='video'")
            created_media_ids.append(data["id"])
            video_id = data["id"]
        else:
            print(f"❌ FAIL: Expected 201 with resource_type='video', got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error calling POST /api/media: {e}")
        return False
    
    # C2: GET - Verify video
    print(f"\n--- GET /api/media?slot={slot} (verify video) ---")
    try:
        response = requests.get(f"{BASE_URL}/api/media?slot={slot}", timeout=10)
        data = response.json()
        found_video = any(
            item.get("public_id") == "test/wedding-video-1" and item.get("resource_type") == "video"
            for item in data.get("items", [])
        )
        if found_video:
            print(f"✅ PASS: Video found in GET response with resource_type='video'")
        else:
            print(f"❌ FAIL: Video not found in GET response")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error verifying video: {e}")
        return False
    
    # C3: DELETE video
    print(f"\n--- DELETE /api/media/{video_id} (cleanup video) ---")
    try:
        response = requests.delete(
            f"{BASE_URL}/api/media/{video_id}",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=10
        )
        if response.status_code == 200 and response.json().get("deleted") is True:
            print(f"✅ PASS: Video deleted successfully")
            if video_id in created_media_ids:
                created_media_ids.remove(video_id)
            return True
        else:
            print(f"❌ FAIL: Failed to delete video")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error deleting video: {e}")
        return False


def test_hero_slides_regression():
    """Test D: Regression test for existing hero-slides slot"""
    print("\n" + "=" * 70)
    print("SECTION D: Regression Test - hero-slides Slot")
    print("=" * 70)
    
    slot = "hero-slides"
    
    # D1: POST
    print(f"\n--- POST /api/media (slot={slot}) ---")
    try:
        response = requests.post(
            f"{BASE_URL}/api/media",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            json={
                "public_id": f"test/{slot}-regression",
                "secure_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                "slot": slot,
                "category": "homepage",
                "alt": "Regression test",
                "sort_order": 99
            },
            timeout=10
        )
        if response.status_code == 201:
            print(f"✅ PASS: POST to hero-slides works")
            data = response.json()
            created_media_ids.append(data["id"])
            media_id = data["id"]
        else:
            print(f"❌ FAIL: POST to hero-slides failed with {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error: {e}")
        return False
    
    # D2: GET
    print(f"\n--- GET /api/media?slot={slot} ---")
    try:
        response = requests.get(f"{BASE_URL}/api/media?slot={slot}", timeout=10)
        if response.status_code == 200:
            data = response.json()
            found = any(item.get("public_id") == f"test/{slot}-regression" for item in data.get("items", []))
            if found:
                print(f"✅ PASS: GET hero-slides works")
            else:
                print(f"❌ FAIL: Test item not found")
                return False
        else:
            print(f"❌ FAIL: GET failed with {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error: {e}")
        return False
    
    # D3: DELETE
    print(f"\n--- DELETE /api/media/{media_id} ---")
    try:
        response = requests.delete(
            f"{BASE_URL}/api/media/{media_id}",
            headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
            timeout=10
        )
        if response.status_code == 200 and response.json().get("deleted") is True:
            print(f"✅ PASS: DELETE hero-slides works")
            if media_id in created_media_ids:
                created_media_ids.remove(media_id)
            return True
        else:
            print(f"❌ FAIL: DELETE failed")
            return False
    except Exception as e:
        print(f"❌ FAIL: Error: {e}")
        return False


def cleanup_remaining():
    """Cleanup any remaining test data"""
    print("\n" + "=" * 70)
    print("CLEANUP: Removing Any Remaining Test Data")
    print("=" * 70)
    
    if not created_media_ids:
        print("No remaining test data to clean up")
        return True
    
    all_deleted = True
    for media_id in created_media_ids[:]:  # Copy list to avoid modification during iteration
        try:
            response = requests.delete(
                f"{BASE_URL}/api/media/{media_id}",
                headers={"Authorization": f"Bearer {ADMIN_TOKEN}"},
                timeout=10
            )
            if response.status_code == 200:
                print(f"  ✅ Deleted: {media_id}")
            else:
                print(f"  ⚠️  Failed to delete {media_id}: {response.status_code}")
                all_deleted = False
        except Exception as e:
            print(f"  ❌ Error deleting {media_id}: {e}")
            all_deleted = False
    
    return all_deleted


def main():
    print("=" * 70)
    print("PK Photography - Service Pages + Gallery Integration Test Suite")
    print("Aug 2026 Update: Inline wiring for 4 service pages + /gallery merge")
    print("=" * 70)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Token: {ADMIN_TOKEN}")
    
    results = []
    
    # Section A: HTTP 200 checks
    results.append(("A: HTTP 200 checks", test_http_200_checks()))
    
    # Section B: Media API for 4 new slots
    results.append(("B: Media API (4 new slots)", test_all_new_slots()))
    
    # Section C: Video support
    results.append(("C: Video support", test_video_support()))
    
    # Section D: Regression test
    results.append(("D: hero-slides regression", test_hero_slides_regression()))
    
    # Cleanup
    print("\n" + "=" * 70)
    print("FINAL CLEANUP")
    print("=" * 70)
    cleanup_success = cleanup_remaining()
    
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
        print("\n✅ All tests passed! Service pages + gallery integration working correctly.")
        sys.exit(0)
    else:
        print("\n❌ Some tests failed. See details above.")
        sys.exit(1)


if __name__ == "__main__":
    main()
