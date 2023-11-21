import type { PropsWithChildren } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import { useSession, signIn } from 'next-auth/react'
import { LoadingPage } from './loading'

const Layout = (props: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === 'loading') return <LoadingPage />

  return (
    <>
      <div className='flex min-h-screen min-w-fit flex-col bg-black text-gray-200'>
        <Navbar />
        {user ? (
          <div className='grow'>{props.children}</div>
        ) : (
          <div className='grow flex h-full w-full justify-center items-center'>
            <button
              className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          </div>
        )}
        <Footer />
      </div>
    </>
  )
}

export default Layout
