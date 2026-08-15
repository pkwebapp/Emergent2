// Utility: browser-direct upload to Cloudinary using an unsigned upload preset.
// Supports images AND videos (dispatches to the correct Cloudinary endpoint).
'use client'

function detectResourceType(file) {
  if (!file || !file.type) return 'image'
  if (file.type.startsWith('video/')) return 'video'
  return 'image'
}

export function uploadToCloudinary(file, { onProgress, adminToken } = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
      const signRes = await fetch(`${backend}/api/cloudinary/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ folder: 'pk-media' }),
      })
      if (!signRes.ok) {
        const err = await signRes.json().catch(() => ({}))
        reject(new Error(err.error || 'Could not get Cloudinary upload signature'))
        return
      }
      const sign = await signRes.json()
      const resourceType = detectResourceType(file)
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${sign.cloud_name}/${resourceType}/upload`)
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          onProgress(Math.round((event.loaded * 100) / event.total))
        }
      }
      xhr.onload = () => {
        try {
          const body = JSON.parse(xhr.responseText)
          if (xhr.status >= 200 && xhr.status < 300) {
            body._resource_type = resourceType
            resolve(body)
          } else {
            reject(new Error(body?.error?.message || `Upload failed (${xhr.status})`))
          }
        } catch (e) {
          reject(new Error('Invalid Cloudinary response'))
        }
      }
      xhr.onerror = () => reject(new Error('Network error uploading to Cloudinary'))
      const form = new FormData()
      form.append('file', file)
      form.append('api_key', sign.api_key)
      form.append('timestamp', String(sign.timestamp))
      form.append('signature', sign.signature)
      form.append('folder', sign.folder)
      xhr.send(form)
    } catch (e) {
      reject(new Error(e.message || 'Upload failed'))
    }
  })
}

export async function saveMediaRecord({ cloudinaryResult, category, slot, blogPostId, bookingId, sortOrder = 0, alt, adminToken }) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
  const res = await fetch(`${backend}/api/media`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      url: cloudinaryResult.url,
      secure_url: cloudinaryResult.secure_url,
      public_id: cloudinaryResult.public_id,
      asset_id: cloudinaryResult.asset_id,
      resource_type: cloudinaryResult._resource_type || cloudinaryResult.resource_type || 'image',
      delivery_type: cloudinaryResult.type || 'upload',
      format: cloudinaryResult.format,
      width: cloudinaryResult.width,
      height: cloudinaryResult.height,
      bytes: cloudinaryResult.bytes,
      original_filename: cloudinaryResult.original_filename,
      category,
      slot,
      blog_post_id: blogPostId,
      booking_id: bookingId,
      sort_order: sortOrder,
      alt,
    }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to save media record')
  }
  return res.json()
}

export async function listMedia({ slot, category } = {}) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
  const params = new URLSearchParams()
  if (slot) params.set('slot', slot)
  if (category) params.set('category', category)
  const res = await fetch(`${backend}/api/media?${params.toString()}`, { cache: 'no-store' })
  if (!res.ok) return { items: [] }
  return res.json()
}

export async function deleteMedia(id, adminToken) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
  const res = await fetch(`${backend}/api/media/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Delete failed')
  }
  return res.json()
}

export async function updateMedia(id, patch, adminToken) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || ''
  const res = await fetch(`${backend}/api/media/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify(patch),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Update failed')
  }
  return res.json()
}
