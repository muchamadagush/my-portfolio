import { createClient } from '@supabase/supabase-js'
import ws from 'ws'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

const options: any = {
  auth: {
    persistSession: typeof window !== 'undefined'
  }
}

if (typeof window === 'undefined') {
  options.realtime = { transport: ws }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options)
