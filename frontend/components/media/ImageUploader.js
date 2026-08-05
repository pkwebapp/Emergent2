'use client'

import { useCallback, useRef, useState } from 'react'
import { uploadToCloudinary, saveMediaRecord } from '@/lib/cloudinary'

/**
 * Reusable media uploader (drag-drop + click). Supports images AND videos.
 * Props:
 *   - category (required)
 *   - slot?
 *   - multiple?
 *   - adminToken (required)
 *   - onUploaded?(record)
 *   - sortOrderStart?
 *   - label?
 *   - acceptVideo? (default: false)
 *   - maxSizeMB? (default: 10 for images, 100 for videos)
 */
export default function ImageUploader({
  category,
  slot,
  multiple = false,
  adminToken,
  onUploaded,
  sortOrderStart = 0,
  label,
  acceptVideo = false,
  maxSizeMB,
}) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState({})
  const [error, setError] = useState(null)
  const [drag, setDrag] = useState(false)

  const accept = acceptVideo
    ? 'image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm'
    : 'image/jpeg,image/png,image/webp'

  const handleFiles = useCallback(async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    setBusy(true)
    setError(null)
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const isVideo = file.type.startsWith('video/')
        const isImage = file.type.startsWith('image/')
        if (!isImage && !isVideo) throw new Error(`${file.name} is not an image or video`)
        if (!acceptVideo && isVideo) throw new Error(`Video uploads not allowed here`)
        const limitMB = maxSizeMB || (isVideo ? 100 : 10)
        if (file.size > limitMB * 1024 * 1024) throw new Error(`${file.name} exceeds ${limitMB}MB`)
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
  }, [category, slot, sortOrderStart, adminToken, onUploaded, acceptVideo, maxSizeMB])

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
          accept={accept}
          multiple={multiple}
          className="hidden"
          disabled={busy}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="text-sm text-neutral-300">
          {busy ? 'Uploading…' : (
            <>
              <p className="font-medium text-neutral-100">{label || (multiple ? 'Drop files here or click to upload' : 'Drop a file here or click to upload')}</p>
              <p className="mt-1 text-xs text-neutral-400">
                {acceptVideo ? 'JPG · PNG · WEBP · MP4 · MOV · WEBM' : 'JPG · PNG · WEBP'} · up to {maxSizeMB || (acceptVideo ? 100 : 10)} MB{multiple ? ' each' : ''}
              </p>
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
