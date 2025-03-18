import { useState } from 'react'
import type { PropsWithChildren } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import { useSession, signIn } from 'next-auth/react'
import { LoadingPage } from './loading'
import { useRouter } from 'next/router'

import { api } from '~/utils/api'
import { Toaster } from '@/components/ui/sonner'

const LayoutAuth = (props: PropsWithChildren) => {
  const { data: session } = useSession()
  const router = useRouter()

  const userId = session?.user?.id || ''
  const { data: user, isLoading: userLoading } = api.users.get.useQuery({
    userId: userId,
    location: 'base',
  })

  if (userLoading) return <LoadingPage />

  return (
    <>
      {
        router.pathname !== '/price-board' &&
        router.pathname !== '/image-roll' &&
        <Navbar user={user || null} />
      }
      <div className='grow'>{props.children}</div>
      {
        router.pathname !== '/templates2' &&
        router.pathname !== '/price-board' &&
        router.pathname !== '/image-roll' &&
        router.pathname !== '/users' &&
          <Footer />
      }
      <Toaster />
    </>
  )
}

const Layout = (props: PropsWithChildren) => {
  const { data: session, status } = useSession()

  const userId = session?.user?.id || ''
  const router = useRouter()
  const { isLoading: isUserLoading } = api.users.isUser.useQuery({
    userId: userId,
    location: status,
    url: router.pathname,
  })

  const [ email, setEmail ] = useState('')

  const { mutate: logUser } = api.users.logSignIn.useMutation()

  if (status === 'loading' || isUserLoading) return <LoadingPage />

  return (
    <>
      <div className='flex min-h-screen w-full flex-col overflow-auto bg-black text-gray-200'>
        {status === 'authenticated' ||
        router.pathname === '/records-men' ||
        router.pathname === '/price-board' ||
        router.pathname === '/image-roll' ||
        router.pathname === '/records-women' ? (
          <>
            <LayoutAuth>{props.children}</LayoutAuth>
          </>
        ) : (
          <div className='flex h-full w-full grow flex-col gap-6 items-center justify-center'>
            <input
              className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
              onClick={() => {
                logUser({
                  userId: userId,
                  location: 'SignIn',
                  url: router.pathname,
                })
                void signIn('email', { email, redirect: true })
              }}
            >
              Sign in with Email
            </button>
            <button
              className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mt-20'
              onClick={() => {
                logUser({
                  userId: userId,
                  location: 'SignIn',
                  url: router.pathname,
                })
                void signIn()
              }}
            >
                Open sign in form
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
