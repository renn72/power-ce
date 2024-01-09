import type { PropsWithChildren } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import { useSession, signIn } from 'next-auth/react'
import { LoadingPage } from './loading'
import { useRouter } from 'next/router'

import { api } from '~/utils/api'

const Layout = (props: PropsWithChildren) => {
  const { data: session, status } = useSession()
  console.log(session)
  const userId = session?.user?.id || ''
  const { data: isUser, isLoading: userLoading } = api.users.isUser.useQuery({
    userId: userId,
  })
  const router = useRouter()

  if (status === 'loading' || userLoading) return <LoadingPage />

  return (
    <>
      <div className='flex min-h-screen w-full flex-col overflow-auto bg-black text-gray-200'>
        {isUser ||
        router.pathname === '/records-men' ||
        router.pathname === '/records-women' ? (
          <>
            <Navbar />
            <div className='grow'>{props.children}</div>
            <Footer />
          </>
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
      </div>
    </>
  )
}

export default Layout
