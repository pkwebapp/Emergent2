/**
 * Safely resolve the backend base URL for client-side fetches.
 *
 * In some Next.js client chunks `process.env.NEXT_PUBLIC_BACKEND_URL` is not
 * statically inlined, which means `process.env` can be undefined in the browser
 * and accessing it throws ("Cannot read properties of undefined ...").
 *
 * This helper guards that access. When the env var is available it is used
 * (so an external backend origin is respected). Otherwise it returns an empty
 * string, which makes fetches use a same-origin relative path like
 * `/api/...` — that is correctly proxied to the backend by the ingress.
 */
export function backendUrl() {
  try {
    if (
      typeof process !== 'undefined' &&
      process.env &&
      process.env.NEXT_PUBLIC_BACKEND_URL
    ) {
      return process.env.NEXT_PUBLIC_BACKEND_URL
    }
  } catch (e) {
    // process not defined in this browser chunk — fall through to relative.
  }
  return ''
}
