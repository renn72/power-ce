import { type AppType } from 'next/app'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs'
import { Provider } from 'jotai'
import Head from 'next/head'
import Layout from '~/components/layout'

import { api } from '~/utils/api'

import localFont from 'next/font/local'

import '~/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { cn } from '@/lib/utils'

const geist = localFont({
  src: [
    { path: '../../public/fonts/Geist/Geist-UltraLight.otf', weight: '200' },
    { path: '../../public/fonts/Geist/Geist-Thin.otf', weight: '300' },
    { path: '../../public/fonts/Geist/Geist-Light.otf', weight: '400' },
    { path: '../../public/fonts/Geist/Geist-Regular.otf', weight: '500' },
    { path: '../../public/fonts/Geist/Geist-Medium.otf', weight: '600' },
    { path: '../../public/fonts/Geist/Geist-SemiBold.otf', weight: '700' },
    { path: '../../public/fonts/Geist/Geist-Bold.otf', weight: '800' },
    { path: '../../public/fonts/Geist/Geist-Black.otf', weight: '900' },
  ],
  display: 'swap',
  variable: '--font-geist-sans',
  fallback: ['inter'],
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider>
      <ClerkProvider {...pageProps}>
        <main >
          <Head>
            <title>Power CE</title>
            <meta
              name='description'
              content='Piwer Lifting App'
            />
            <link
              rel='icon'
              href='/favicon.ico'
            />
          </Head>

          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
          <SignedIn>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SignedIn>

          <Toaster
            position='bottom-center'
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </main>
      </ClerkProvider>
    </Provider>
  )
}

export default api.withTRPC(MyApp)
