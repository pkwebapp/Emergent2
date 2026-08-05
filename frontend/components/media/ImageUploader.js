'use client'

import { useCallback, useRef, useState } from 'react'
import { uploadToCloudinary, saveMediaRecord } from '@/lib/cloudinary'

/**
 * Reusable image uploader (drag-drop + click).
 * Props:
 *   - category (required)  e.g. 'wedding' | 'homepage'
 *   - slot?                 e.g. 'hero-slides'
 *   - multiple?             boolean
 *   - adminToken (required) admin bearer token
 *   - onUploaded?(record)   callback after saveMediaRecord
 *   - sortOrderStart?       starting sort_order (default 0)
 *   - label?                label shown in the dropzone
 */
export default function ImageUploader({
  category,
  slot,
  multiple = false,
  adminToken,
  onUploaded,
  sortOrderStart = 0,
  label,
}) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState({})
  const [error, setError] = useState(null)
  const [drag, setDrag] = useState(false)

  const handleFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setBusy(true)
    setError(null)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image`)
        }
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} exceeds 10MB`)
        }
        const key = `${file.name}-${i}`
        const result = await uploadToCloudinary(file, {
          onProgress: (p) => setProgress((old) => ({ ...old, [key]: p })),
        })
        const record = await saveMediaRecord({
          cloudinaryResult: result,
          category,
          slot,
          sortOrder: sortOrderStart + i,
          adminToken,
        })
        onUploaded?.(record)
      }
      setProgress({})
    } catch (e) {
      setError(e.message || 'Upload failed')
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [category, slot, sortOrderStart, adminToken, onUploaded])

  return (
    <div className="w-full">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed transition-colors p-6 text-center ${
          drag ? 'border-orange-500 bg-orange-500/5' : 'border-neutral-700 hover:border-neutral-500 bg-neutral-900/40'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple={multiple}
          className="hidden"
          disabled={busy}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="text-sm text-neutral-300">
          {busy ? 'Uploading…' : (
            <>
              <p className="font-medium text-neutral-100">{label || (multiple ? 'Drop images here or click to upload' : 'Drop an image here or click to upload')}</p>
              <p className="mt-1 text-xs text-neutral-400">JPG · PNG · WEBP · up to 10 MB{multiple ? ' each' : ''}</p>
            </>
          )}
        </div>
        {Object.keys(progress).length > 0 && (
          <div className="mt-4 space-y-2 text-left">
            {Object.entries(progress).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-xs text-neutral-400">
                  <span className="truncate max-w-[70%]">{key}</span>
                  <span>{value}%</span>
                </div>
                <div className="h-1.5 rounded bg-neutral-800 overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && (
        <div className="mt-2 rounded-md bg-red-500/10 text-red-300 text-sm px-3 py-2">{error}</div>
      )}
    </div>
  )
}
