import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div style={{"display": "flex", "alignItems": "center"}}>
        <img width={20} height={20} style={{"margin": "2px"}} src={session.user?.image!} />{" "}
        {/* Signed in as {session.user?.email} <br /> */}
        <button style={{'border': 'none', 'background': 'none'}} onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      {/*Not signed in{" "}*/}
      <button style={{'border': 'none', 'background': 'none'}} onClick={() => signIn("github", /* { callbackUrl: '/' } */)}>Sign in</button>
    </>
  )
}