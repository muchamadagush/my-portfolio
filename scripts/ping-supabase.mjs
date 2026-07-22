import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.log('⚠️ Supabase credentials not configured in .env.local')
  process.exit(0)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function pingSupabase() {
  console.log(`[${new Date().toISOString()}] Pinging Supabase to prevent auto-pause...`)
  try {
    const { data, error } = await supabase.from('projects').select('id').limit(1)
    if (error) {
      console.error('❌ Supabase ping error:', error.message)
    } else {
      console.log('✅ Supabase ping successful! Projects count query returned:', data?.length ?? 0)
    }
  } catch (err) {
    console.error('❌ Failed to ping Supabase:', err)
  }
}

pingSupabase()
