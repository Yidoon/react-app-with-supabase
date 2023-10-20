import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_NUXT_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_NUXT_PUBLIC_SUPABASE_KEY
)

export default supabase
