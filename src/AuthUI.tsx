import { Auth } from "@supabase/auth-ui-react"
import supabase from "./client"
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared"

export default function AuthUI() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["github"]}
    />
  )
}
