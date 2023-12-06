import type { PropsWithChildren } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import { useSession, signIn } from 'next-auth/react'
import { LoadingPage } from './loading'
import { useRouter } from 'next/router'

const Layout = (props: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const user = session?.user
  const router = useRouter()
   console.log(router.pathname)

  if (status === 'loading') return <LoadingPage />

  return (
    <>
      <div className='flex min-h-screen w-full flex-col overflow-auto bg-black text-gray-200'>
        <Navbar />
        {user ||
        router.pathname === '/records-men' ||
        router.pathname === '/records-women' ? (
          <div className='grow'>{props.children}</div>
        ) : (
          <div className='flex h-full w-full grow items-center justify-center'>
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
