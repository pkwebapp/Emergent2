import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// MongoDB connection
let client
let db
let connectPromise

async function connectToMongo() {
  if (db) return db
  if (!connectPromise) {
    connectPromise = (async () => {
      try {
        client = new MongoClient(process.env.MONGO_URL)
        await client.connect()
        db = client.db(process.env.DB_NAME)
        return db
      } catch (e) {
        // Reset so the next call retries instead of caching the failed promise
        connectPromise = null
        throw e
      }
    })()
  }
  return connectPromise
}

// Helper function to handle CORS
function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

// Route handler function
async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Root endpoint - GET /api/root (since /api/ is not accessible with catch-all)
    if (route === '/root' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Hello World" }))
    }
    // Root endpoint - GET /api/root (since /api/ is not accessible with catch-all)
    if (route === '/' && method === 'GET') {
      return handleCORS(NextResponse.json({ message: "Hello World" }))
    }

    if (route === '/health' && method === 'GET') {
      return handleCORS(NextResponse.json({ status: 'ok' }))
    }

    // next-auth's <SessionProvider> automatically polls these endpoints on every
    // page. This app actually uses a custom cookie session (see /auth/me &
    // /auth/google-session), so there is no next-auth backend. Return the same
    // safe empty responses next-auth itself returns for anonymous users, to
    // avoid CLIENT_FETCH_ERROR noise in the browser console on every page load.
    if (route === '/auth/session' && method === 'GET') {
      return handleCORS(NextResponse.json({}))
    }
    if (route === '/auth/providers' && method === 'GET') {
      return handleCORS(NextResponse.json({}))
    }
    if (route === '/auth/csrf' && method === 'GET') {
      return handleCORS(NextResponse.json({ csrfToken: '' }))
    }
    if (route === '/auth/_log' && method === 'POST') {
      return handleCORS(NextResponse.json({}))
    }

    // Booking/contact enquiries - POST /api/contact
    if (route === '/contact' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const requiredFields = ['name', 'email', 'phone', 'date', 'service']
      const missing = requiredFields.filter((field) => !String(body[field] || '').trim())

      if (missing.length) {
        return handleCORS(NextResponse.json(
          { error: `Missing required fields: ${missing.join(', ')}` },
          { status: 400 }
        ))
      }

      const enquiry = {
        id: uuidv4(),
        name: String(body.name).trim(),
        email: String(body.email).trim().toLowerCase(),
        phone: String(body.phone).trim(),
        date: String(body.date).trim(),
        service: String(body.service).trim(),
        message: String(body.message || '').trim(),
        source: 'booking-page',
        status: 'new',
        created_at: new Date().toISOString(),
      }

      await db.collection('contact_enquiries').insertOne({ ...enquiry })
      return handleCORS(NextResponse.json({ ok: true, enquiry }, { status: 201 }))
    }

    // Newsletter subscribe - POST /api/newsletter
    if (route === '/newsletter' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const email = String(body.email || '').trim().toLowerCase()
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return handleCORS(NextResponse.json(
          { error: 'Please enter a valid email address.' },
          { status: 400 }
        ))
      }
      await db.collection('newsletter_subscribers').updateOne(
        { email },
        { $setOnInsert: { id: uuidv4(), email, source: 'blog-journal', created_at: new Date().toISOString() } },
        { upsert: true }
      )
      return handleCORS(NextResponse.json({ ok: true }, { status: 201 }))
    }

    // Status endpoints - POST /api/status
    if (route === '/status' && method === 'POST') {
      const body = await request.json()
      
      if (!body.client_name) {
        return handleCORS(NextResponse.json(
          { error: "client_name is required" }, 
          { status: 400 }
        ))
      }

      const statusObj = {
        id: uuidv4(),
        client_name: body.client_name,
        timestamp: new Date()
      }

      await db.collection('status_checks').insertOne(statusObj)
      return handleCORS(NextResponse.json(statusObj))
    }

    // Status endpoints - GET /api/status
    if (route === '/status' && method === 'GET') {
      const statusChecks = await db.collection('status_checks')
        .find({})
        .limit(1000)
        .toArray()

      // Remove MongoDB's _id field from response
      const cleanedStatusChecks = statusChecks.map(({ _id, ...rest }) => rest)
      
      return handleCORS(NextResponse.json(cleanedStatusChecks))
    }

    // ---------- Emergent-managed Google Auth ----------
    // Exchange the one-time session_id (from URL fragment) for a persistent session.
    if (route === '/auth/google-session' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const sessionId = body.session_id
      if (!sessionId) {
        return handleCORS(NextResponse.json({ error: 'session_id required' }, { status: 400 }))
      }
      const sdResp = await fetch('https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data', {
        headers: { 'X-Session-ID': sessionId },
      })
      if (!sdResp.ok) {
        return handleCORS(NextResponse.json({ error: 'invalid session' }, { status: 401 }))
      }
      const data = await sdResp.json() // { id, email, name, picture, session_token }
      const ownerEmail = (process.env.OWNER_EMAIL || '').toLowerCase()
      let user = await db.collection('users').findOne({ email: data.email })
      if (!user) {
        user = {
          user_id: `user_${uuidv4().replace(/-/g, '').slice(0, 12)}`,
          email: data.email,
          name: data.name,
          picture: data.picture,
          role: data.email && data.email.toLowerCase() === ownerEmail ? 'owner' : 'client',
          created_at: new Date(),
        }
        await db.collection('users').insertOne(user)
      } else {
        await db.collection('users').updateOne({ email: data.email }, { $set: { name: data.name, picture: data.picture } })
      }
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      await db.collection('user_sessions').insertOne({
        user_id: user.user_id,
        session_token: data.session_token,
        expires_at: expiresAt,
        created_at: new Date(),
      })
      const res = handleCORS(NextResponse.json({
        user_id: user.user_id, email: user.email, name: user.name, picture: user.picture, role: user.role || 'client',
      }))
      res.cookies.set('session_token', data.session_token, {
        httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 7 * 24 * 60 * 60,
      })
      return res
    }

    // ---- Talents ----------------------------------------------------
    if (route === '/talents' && method === 'GET') {
      const url = new URL(request.url)
      const category = (url.searchParams.get('category') || '').trim().toLowerCase()
      const search = (url.searchParams.get('search') || '').trim()
      const q = { approved: true }
      if (category && category !== 'all') q.category = category
      if (search) {
        const re = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
        q.$or = [{ name: re }, { city: re }, { skills: re }, { category: re }]
      }
      const items = await db.collection('talents').find(q, { projection: { _id: 0 } })
        .sort({ featured: -1, created_at: -1 }).limit(60).toArray()
      return handleCORS(NextResponse.json({ items }))
    }

    if (route === '/talents/apply' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const name = String(body.name || '').trim()
      const email = String(body.email || '').trim().toLowerCase()
      const phone = String(body.phone || '').replace(/\D/g, '')
      const category = String(body.category || '').trim().toLowerCase()
      const city = String(body.city || '').trim()

      if (!name || name.length < 2) {
        return handleCORS(NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 }))
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return handleCORS(NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 }))
      }
      if (phone.length !== 10 && !(phone.startsWith('91') && phone.length === 12)) {
        return handleCORS(NextResponse.json({ error: 'Enter a valid 10-digit mobile.' }, { status: 400 }))
      }
      if (!category) {
        return handleCORS(NextResponse.json({ error: 'Please choose a talent category.' }, { status: 400 }))
      }
      if (!city) {
        return handleCORS(NextResponse.json({ error: 'Please share your base city.' }, { status: 400 }))
      }

      const application = {
        id: uuidv4(),
        name,
        email,
        phone: phone.length === 10 ? phone : phone.slice(-10),
        category,
        city,
        experience: String(body.experience || '').trim() || null,
        portfolio_url: String(body.portfolio_url || '').trim() || null,
        instagram: String(body.instagram || '').trim() || null,
        message: String(body.message || '').trim() || null,
        approved: false,
        featured: false,
        status: 'pending',
        source: 'talents-page',
        created_at: new Date().toISOString(),
      }
      await db.collection('talent_applications').insertOne({ ...application })
      return handleCORS(NextResponse.json({ ok: true, id: application.id }))
    }

    // Signup — collects early access details (name + optional email + mobile)
    if (route === '/auth/signup' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const fullName = String(body.full_name || '').trim()
      const email = body.email ? String(body.email).trim().toLowerCase() : null
      const mobileDigits = String(body.mobile || '').replace(/\D/g, '')

      if (!fullName) {
        return handleCORS(NextResponse.json({ error: 'Full name is required.' }, { status: 400 }))
      }
      const isValidMobile = mobileDigits.length === 10
        || (mobileDigits.startsWith('91') && mobileDigits.length === 12)
      if (!isValidMobile) {
        return handleCORS(NextResponse.json({ error: 'Enter a valid 10-digit mobile number.' }, { status: 400 }))
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return handleCORS(NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 }))
      }

      const record = {
        id: uuidv4(),
        full_name: fullName,
        email: email || null,
        mobile: mobileDigits.length === 10 ? mobileDigits : mobileDigits.slice(-10),
        source: 'signup-page',
        status: 'pending',
        created_at: new Date().toISOString(),
      }
      await db.collection('signups').insertOne({ ...record })
      return handleCORS(NextResponse.json({ ok: true, id: record.id }))
    }

    // Current authenticated user
    if (route === '/auth/me' && method === 'GET') {
      const token = request.cookies.get('session_token')?.value
        || (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '')
      if (!token) {
        return handleCORS(NextResponse.json({ error: 'not authenticated' }, { status: 401 }))
      }
      const session = await db.collection('user_sessions').findOne({ session_token: token })
      if (!session) {
        return handleCORS(NextResponse.json({ error: 'not authenticated' }, { status: 401 }))
      }
      let exp = session.expires_at
      if (typeof exp === 'string') exp = new Date(exp)
      if (exp && exp < new Date()) {
        return handleCORS(NextResponse.json({ error: 'session expired' }, { status: 401 }))
      }
      const user = await db.collection('users').findOne({ user_id: session.user_id }, { projection: { _id: 0 } })
      if (!user) {
        return handleCORS(NextResponse.json({ error: 'not authenticated' }, { status: 401 }))
      }
      return handleCORS(NextResponse.json(user))
    }

    // Logout
    if (route === '/auth/logout' && method === 'POST') {
      const token = request.cookies.get('session_token')?.value
      if (token) await db.collection('user_sessions').deleteOne({ session_token: token })
      const res = handleCORS(NextResponse.json({ ok: true }))
      res.cookies.set('session_token', '', {
        httpOnly: true, secure: true, sameSite: 'none', path: '/', maxAge: 0,
      })
      return res
    }

    // ---------- Admin token gate ----------
    function requireAdmin() {
      const token = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim()
        || (request.headers.get('x-admin-token') || '').trim()
      const expected = process.env.ADMIN_TOKEN || ''
      if (!expected || token !== expected) return false
      return true
    }

    // POST /api/admin/login  { token }
    if (route === '/admin/login' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const token = String(body.token || '').trim()
      const expected = process.env.ADMIN_TOKEN || ''
      if (!expected || token !== expected) {
        return handleCORS(NextResponse.json({ error: 'Invalid admin token' }, { status: 401 }))
      }
      return handleCORS(NextResponse.json({ ok: true, token }))
    }

    // GET /api/admin/verify
    if (route === '/admin/verify' && method === 'GET') {
      if (!requireAdmin()) return handleCORS(NextResponse.json({ error: 'unauthorized' }, { status: 401 }))
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // ---------- Media (Cloudinary-backed) ----------
    // POST /api/cloudinary/sign — signed upload params (admin required)
    if (route === '/cloudinary/sign' && method === 'POST') {
      if (!requireAdmin()) return handleCORS(NextResponse.json({ error: 'unauthorized' }, { status: 401 }))
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME
      const apiKey = process.env.CLOUDINARY_API_KEY
      const apiSecret = process.env.CLOUDINARY_API_SECRET
      if (!cloudName || !apiKey || !apiSecret) {
        return handleCORS(NextResponse.json({ error: 'Cloudinary is not configured on the server' }, { status: 503 }))
      }
      const body = await request.json().catch(() => ({}))
      const folder = String(body.folder || 'pk-media').trim().replace(/[^a-zA-Z0-9_\/-]/g, '') || 'pk-media'
      const crypto = await import('crypto')
      const timestamp = Math.floor(Date.now() / 1000)
      const paramsToSign = `folder=${folder}&timestamp=${timestamp}`
      const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex')
      return handleCORS(NextResponse.json({ cloud_name: cloudName, api_key: apiKey, timestamp, signature, folder }))
    }

    // POST /api/media  — record an uploaded asset (admin required)
    if (route === '/media' && method === 'POST') {
      if (!requireAdmin()) return handleCORS(NextResponse.json({ error: 'unauthorized' }, { status: 401 }))
      const body = await request.json().catch(() => ({}))
      const publicId = String(body.public_id || '').trim()
      const secureUrl = String(body.secure_url || body.url || '').trim()
      if (!publicId || !secureUrl) {
        return handleCORS(NextResponse.json({ error: 'public_id and secure_url required' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        public_id: publicId,
        url: String(body.url || secureUrl),
        secure_url: secureUrl,
        asset_id: String(body.asset_id || '') || null,
        resource_type: String(body.resource_type || 'image'),
        delivery_type: String(body.delivery_type || 'upload'),
        format: String(body.format || '') || null,
        width: Number(body.width) || null,
        height: Number(body.height) || null,
        bytes: Number(body.bytes) || null,
        original_filename: String(body.original_filename || '') || null,
        category: String(body.category || 'general').trim(),
        slot: body.slot ? String(body.slot).trim() : null,
        blog_post_id: body.blog_post_id ? String(body.blog_post_id) : null,
        booking_id: body.booking_id ? String(body.booking_id) : null,
        sort_order: Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : 0,
        alt: body.alt ? String(body.alt).slice(0, 300) : null,
        location: body.location ? String(body.location).slice(0, 200) : null,
        active: body.active === false ? false : true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      await db.collection('media').insertOne({ ...doc })
      return handleCORS(NextResponse.json(doc, { status: 201 }))
    }

    // GET /api/media?slot=hero-slides&category=wedding&limit=100
    if (route === '/media' && method === 'GET') {
      const url = new URL(request.url)
      const slot = (url.searchParams.get('slot') || '').trim()
      const category = (url.searchParams.get('category') || '').trim()
      const limit = Math.min(500, Math.max(1, parseInt(url.searchParams.get('limit') || '200', 10)))
      const q = { active: { $ne: false } }
      if (slot) q.slot = slot
      if (category) q.category = category
      const items = await db.collection('media')
        .find(q, { projection: { _id: 0 } })
        .sort({ sort_order: 1, created_at: 1 })
        .limit(limit)
        .toArray()
      return handleCORS(NextResponse.json({ items }))
    }

    // PATCH /api/media/:id  — update sort_order / alt / slot / active
    if (route.startsWith('/media/') && method === 'PATCH') {
      if (!requireAdmin()) return handleCORS(NextResponse.json({ error: 'unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      const body = await request.json().catch(() => ({}))
      const $set = { updated_at: new Date().toISOString() }
      if (body.sort_order != null) $set.sort_order = Number(body.sort_order) || 0
      if (body.alt != null) $set.alt = String(body.alt).slice(0, 300)
      if (body.location != null) $set.location = String(body.location).slice(0, 200) || null
      if (body.slot != null) $set.slot = String(body.slot).trim() || null
      if (body.category != null) $set.category = String(body.category).trim()
      if (body.active != null) $set.active = !!body.active
      const result = await db.collection('media').findOneAndUpdate(
        { id },
        { $set },
        { returnDocument: 'after', projection: { _id: 0 } }
      )
      const doc = result?.value || result // driver compatibility
      if (!doc) return handleCORS(NextResponse.json({ error: 'not found' }, { status: 404 }))
      return handleCORS(NextResponse.json(doc))
    }

    // DELETE /api/media/:id — signed destroy on Cloudinary + Mongo remove
    if (route.startsWith('/media/') && method === 'DELETE') {
      if (!requireAdmin()) return handleCORS(NextResponse.json({ error: 'unauthorized' }, { status: 401 }))
      const id = route.split('/')[2]
      const doc = await db.collection('media').findOne({ id })
      if (!doc) return handleCORS(NextResponse.json({ error: 'not found' }, { status: 404 }))

      // Sign destroy request (Cloudinary needs sha1 of sorted signable params + api_secret)
      const cloudName = process.env.CLOUDINARY_CLOUD_NAME
      const apiKey = process.env.CLOUDINARY_API_KEY
      const apiSecret = process.env.CLOUDINARY_API_SECRET
      if (cloudName && apiKey && apiSecret) {
        try {
          const crypto = await import('crypto')
          const timestamp = Math.floor(Date.now() / 1000)
          const publicId = doc.public_id
          const paramsToSign = `invalidate=true&public_id=${publicId}&timestamp=${timestamp}`
          const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex')
          const form = new URLSearchParams()
          form.append('public_id', publicId)
          form.append('timestamp', String(timestamp))
          form.append('invalidate', 'true')
          form.append('api_key', apiKey)
          form.append('signature', signature)
          const resourceType = doc.resource_type || 'image'
          const destroyResp = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: form.toString(),
          })
          const destroyJson = await destroyResp.json().catch(() => ({}))
          if (!(destroyJson.result === 'ok' || destroyJson.result === 'not found')) {
            console.warn('Cloudinary destroy did not return ok:', destroyJson)
          }
        } catch (e) {
          console.error('Cloudinary destroy error:', e)
        }
      }

      await db.collection('media').deleteOne({ id })
      return handleCORS(NextResponse.json({ deleted: true, id }))
    }

    // Route not found
    return handleCORS(NextResponse.json(
      { error: `Route ${route} not found` }, 
      { status: 404 }
    ))

  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    ))
  }
}

// Export all HTTP methods
export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute