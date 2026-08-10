"""Purge leftover legacy media records from MongoDB (DB records only — does NOT
touch Cloudinary assets). Legacy service pages were removed from the site, so
their banner/gallery slots are no longer read by any page.

Usage:
  python purge_legacy_media.py            # dry run (shows what WOULD be deleted)
  python purge_legacy_media.py --apply    # actually delete
"""
import os
import sys
from pathlib import Path
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / "backend" / ".env")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ.get("DB_NAME", "pk_photography")

# Legacy page keys that were removed from the site.
LEGACY_KEYS = [
    "wedding", "headshots", "portrait", "boudoir", "brandshoot", "editorial",
    "festival", "food", "celebrity", "realestate", "outdoor", "baby", "ads",
    "ecommerce", "design", "wgoa",
]
LEGACY_SLOTS = []
for k in LEGACY_KEYS:
    LEGACY_SLOTS.append(f"{k}-banner")
    LEGACY_SLOTS.append(f"{k}-gallery")

apply = "--apply" in sys.argv

client = MongoClient(MONGO_URL)
db = client[DB_NAME]
col = db["media"]

print(f"DB: {DB_NAME}  collection: media")
print("Legacy slots targeted:", ", ".join(LEGACY_SLOTS))
print("-" * 60)

# Show all slots with counts for visibility
print("Current slots in DB:")
for row in col.aggregate([{"$group": {"_id": "$slot", "n": {"$sum": 1}}}, {"$sort": {"_id": 1}}]):
    tag = "  <-- LEGACY (will purge)" if row["_id"] in LEGACY_SLOTS else ""
    print(f"  {row['_id']}: {row['n']}{tag}")
print("-" * 60)

query = {"slot": {"$in": LEGACY_SLOTS}}
matched = col.count_documents(query)
print(f"Legacy records matched: {matched}")

if matched:
    for doc in col.find(query, {"_id": 0, "id": 1, "slot": 1, "resource_type": 1, "public_id": 1}):
        print(f"  - {doc.get('slot')} | {doc.get('resource_type')} | id={doc.get('id')} | public_id={doc.get('public_id')}")

if apply and matched:
    res = col.delete_many(query)
    print(f"DELETED {res.deleted_count} legacy media records from MongoDB.")
elif matched:
    print("DRY RUN — nothing deleted. Re-run with --apply to delete.")
else:
    print("No legacy records to delete.")

client.close()
