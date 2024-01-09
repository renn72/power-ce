import type { PropsWithChildren } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import { useSession, signIn } from 'next-auth/react'
import { LoadingPage } from './loading'
import { useRouter } from 'next/router'

import { api } from '~/utils/api'

const Layout = (props: PropsWithChildren) => {
  const { data: session, status } = useSession()
  const userId = session?.user?.id || ''
  const router = useRouter()

  if (status === 'loading') return <LoadingPage />

  return (
    <>
      <div className='flex min-h-screen w-full flex-col overflow-auto bg-black text-gray-200'>
        {false ||
        router.pathname === '/records-men' ||
        router.pathname === '/records-women' ? (
          <>
            <Navbar />
            <div className='grow'>{props.children}</div>
            <Footer />
          </>
        ) : (
          <div className='flex h-full w-full grow items-center justify-center'>
              Please check back shortly
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
