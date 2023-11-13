import { signIn, signOut, useSession, } from 'next-auth/react'

const SignInPage = () => {
  const { data: sessionData } = useSession()
  console.log(sessionData)
  return (
    <div>
      <button
        className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? 'Sign out' : 'Sign in'}
      </button>
    </div>
  )
}

export default SignInPage
