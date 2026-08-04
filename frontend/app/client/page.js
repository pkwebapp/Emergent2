import { cookies } from 'next/headers'
import { MongoClient } from 'mongodb'
import ClientAuth from './ClientAuth'
import ClientDashboard from './ClientDashboard'

export const dynamic = 'force-dynamic'

let _client
async function getDb() {
  if (!_client) {
    _client = new MongoClient(process.env.MONGO_URL)
    await _client.connect()
  }
  return _client.db(process.env.DB_NAME)
}

async function getUser() {
  const token = (await cookies()).get('session_token')?.value
  if (!token) return null
  try {
    const db = await getDb()
    const session = await db.collection('user_sessions').findOne({ session_token: token })
    if (!session) return null
    let exp = session.expires_at
    if (typeof exp === 'string') exp = new Date(exp)
    if (exp && exp < new Date()) return null
    const user = await db.collection('users').findOne({ user_id: session.user_id }, { projection: { _id: 0, created_at: 0 } })
    return user || null
  } catch {
    return null
  }
}

export default async function ClientPage() {
  const user = await getUser()
  if (user) return <ClientDashboard user={user} />
  return <ClientAuth />
}
