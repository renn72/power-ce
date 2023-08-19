import { type AppType, } from 'next/app'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from '@clerk/nextjs'
import { Provider, } from 'jotai'
import Head from 'next/head'
import Layout from '~/components/layout'

import { api, } from '~/utils/api'

import '~/styles/globals.css'
import { Toaster, } from 'react-hot-toast'

const MyApp: AppType = ({
  Component, pageProps,
}) => {
  return (
    <Provider>
      <ClerkProvider {...pageProps}>

        <Head>
          <title>Power CE</title>
          <meta name='description' content='Piwer Lifting App' />
          <link rel='icon' href='/favicon.ico' />
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
      </ClerkProvider>
    </Provider>
  )

}

export default api.withTRPC(MyApp)
