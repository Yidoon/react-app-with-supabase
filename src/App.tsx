import { useEffect, useState } from "react"
import "./App.css"
import supabase from "./client"
import AuthUI from "./AuthUI"

function App() {
  const [email, setEmail] = useState("email")
  const [password, setPassword] = useState("")
  const [userInfo, setUserInfo] = useState<any>()
  const [session, setSession] = useState<any>()

  const handleLoginSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    setUserInfo(data.user)
    setSession(data.session)
    console.log(data, "data")
    console.log(error, "error")
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    })
    setUserInfo(data.user)
    setSession(data.session)
    console.log(data, "data")
    console.log(error, "error")
  }

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    console.log(data, "data")
    setUserInfo(data.user)
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div style={{ padding: 30 }}>
      <div>
        <h1>Sign in with email</h1>
        <div>
          <div>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <label htmlFor="username">Password: </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <button style={{ cursor: "pointer" }} onClick={handleLoginSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div>
        <h1>Sign in with github</h1>
        <p>
          <a
            href="https://supabase.com/docs/guides/auth/social-login/auth-github"
            style={{ fontSize: 12 }}
          >
            supabase document of login with GitHub
          </a>
        </p>

        {userInfo ? (
          <button onClick={signOut}>Sign out</button>
        ) : (
          <button style={{ cursor: "pointer" }} onClick={signInWithGithub}>
            Sign in
          </button>
        )}
      </div>

      <div
        style={{
          width: 600,
          padding: 16,
          marginTop: 24,
        }}
      >
        <h1>Sign in with Auth UI</h1>
        <AuthUI />
      </div>

      <div style={{ marginTop: 60, borderTop: "1px solid #eee" }}>
        {userInfo ? (
          <div>
            <h2>Congraulation!</h2>
            <div>ID: {userInfo.id}</div>
            <div>Email: {userInfo.email}</div>
            {session && <div>Access token: {session?.access_token}</div>}

            <button style={{ marginTop: 24 }} onClick={signOut}>
              Sign out
            </button>
          </div>
        ) : (
          <h2>Login ☝️ </h2>
        )}
      </div>
    </div>
  )
}

export default App
