/**
 * Seed sample talent profiles for the /talents directory.
 * Run: node /app/scripts/seed_talents.js
 * Safe to re-run — replaces any existing seed docs.
 */
const { MongoClient } = require('mongodb')
const fs = require('fs')
const path = require('path')

// Load .env manually (no dotenv dep)
const envPath = path.join(__dirname, '..', 'frontend', '.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  })
}

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'pk_photography'

const TALENTS = [
  {
    id: 'seed-t1',
    name: 'Ananya Iyer',
    category: 'model',
    city: 'Mumbai',
    tagline: 'Editorial · Fashion · Runway',
    bio: 'Trained in classical dance, Ananya brings a poised, unhurried presence to fashion and editorial shoots. Featured in three national fashion weeks.',
    image_url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=85&fm=jpg',
    age: 24,
    height: '5\'8"',
    experience_years: 4,
    languages: ['English', 'Hindi', 'Tamil'],
    skills: ['Runway', 'Editorial', 'Beauty', 'Lookbook'],
    instagram: '@ananya.iyer',
    portfolio_url: '',
    featured: true,
  },
  {
    id: 'seed-t2',
    name: 'Rohan Malhotra',
    category: 'model',
    city: 'Mumbai',
    tagline: 'Fitness · Luxury · Automotive',
    bio: 'A former state-level swimmer, Rohan is a go-to for luxury lifestyle, fitness and automotive campaigns. Comfortable in both stills and motion.',
    image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=85&fm=jpg',
    age: 28,
    height: '6\'1"',
    experience_years: 6,
    languages: ['English', 'Hindi', 'Punjabi'],
    skills: ['Fitness', 'Commercial', 'Automotive', 'Motion'],
    instagram: '@rohan.malhotra',
    portfolio_url: '',
    featured: true,
  },
  {
    id: 'seed-t3',
    name: 'Meera Nair',
    category: 'actor',
    city: 'Mumbai',
    tagline: 'Screen · Theatre · Voice',
    bio: 'A theatre-trained actor with three feature-film credits and a stack of streaming ads. Known for emotional range in the two-minute story format.',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=85&fm=jpg',
    age: 27,
    height: '5\'6"',
    experience_years: 7,
    languages: ['English', 'Hindi', 'Malayalam'],
    skills: ['Acting', 'Voice-over', 'Theatre', 'Improv'],
    instagram: '@meera.nair',
    portfolio_url: '',
    featured: false,
  },
  {
    id: 'seed-t4',
    name: 'Aditya Rao',
    category: 'actor',
    city: 'Goa',
    tagline: 'Digital films · OTT · Character roles',
    bio: 'Aditya brings a lived-in, everyday-hero look — perfect for OTT features, brand films and casting for character-driven scripts.',
    image_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=85&fm=jpg',
    age: 32,
    height: '5\'11"',
    experience_years: 9,
    languages: ['English', 'Hindi', 'Kannada', 'Konkani'],
    skills: ['Acting', 'Method', 'Improv', 'Dialects'],
    instagram: '@adityarao.official',
    portfolio_url: '',
    featured: false,
  },
  {
    id: 'seed-t5',
    name: 'Nisha Kapoor',
    category: 'dancer',
    city: 'Mumbai',
    tagline: 'Contemporary · Bollywood · Choreo',
    bio: 'Bollywood-trained choreographer & performer. Delivers polished sequences under tight shoot windows and doubles as a movement director for brand films.',
    image_url: 'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=800&q=85&fm=jpg',
    age: 25,
    height: '5\'5"',
    experience_years: 6,
    languages: ['English', 'Hindi'],
    skills: ['Bollywood', 'Contemporary', 'Choreography', 'Movement direction'],
    instagram: '@nisha.dances',
    portfolio_url: '',
    featured: true,
  },
  {
    id: 'seed-t6',
    name: 'Karan Deshmukh',
    category: 'musician',
    city: 'Pune',
    tagline: 'Guitar · Composer · Live sessions',
    bio: 'Session guitarist and composer. Original scores for two web series and a growing catalogue of brand jingles. Available for live and in-studio.',
    image_url: 'https://images.unsplash.com/photo-1627161683077-e34782c24d81?w=800&q=85&fm=jpg',
    age: 30,
    height: '5\'10"',
    experience_years: 10,
    languages: ['English', 'Hindi', 'Marathi'],
    skills: ['Guitar', 'Composition', 'Sound design', 'Live music'],
    instagram: '@karan.strings',
    portfolio_url: '',
    featured: false,
  },
  {
    id: 'seed-t7',
    name: 'Priya Sharma',
    category: 'model',
    city: 'Delhi',
    tagline: 'Beauty · Skincare · Ecom',
    bio: 'Beauty and skincare specialist — a soft, expressive face that reads well in tight beauty product frames and long-form ecom lookbooks.',
    image_url: 'https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    age: 23,
    height: '5\'7"',
    experience_years: 3,
    languages: ['English', 'Hindi'],
    skills: ['Beauty', 'Skincare', 'Ecom', 'Lookbook'],
    instagram: '@priyasharma.beauty',
    portfolio_url: '',
    featured: false,
  },
  {
    id: 'seed-t8',
    name: 'Zara Khan',
    category: 'voice_artist',
    city: 'Mumbai',
    tagline: 'Voice-over · Narration · Dubbing',
    bio: 'A warm, mid-range voice that lands equally well on brand narrations, corporate films and children\'s content. English, Hindi and Urdu.',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=85&fm=jpg&sat=-20',
    age: 29,
    height: '5\'5"',
    experience_years: 8,
    languages: ['English', 'Hindi', 'Urdu'],
    skills: ['Voice-over', 'Narration', 'Dubbing', 'Radio'],
    instagram: '@zara.voices',
    portfolio_url: '',
    featured: false,
  },
]

async function main() {
  if (!MONGO_URL) throw new Error('MONGO_URL missing from env')
  const client = new MongoClient(MONGO_URL)
  await client.connect()
  const db = client.db(DB_NAME)
  const col = db.collection('talents')

  const now = new Date().toISOString()
  const docs = TALENTS.map((t) => ({
    ...t,
    approved: true,
    status: 'active',
    source: 'seed',
    created_at: now,
    updated_at: now,
  }))

  // Upsert each so re-runs stay idempotent
  for (const doc of docs) {
    await col.updateOne({ id: doc.id }, { $set: doc }, { upsert: true })
  }

  const count = await col.countDocuments({ approved: true })
  console.log(`Seeded ${docs.length} talents. Approved total = ${count}`)
  await client.close()
}

main().catch((e) => { console.error(e); process.exit(1) })
