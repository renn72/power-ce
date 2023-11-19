import { type AppType } from 'next/app'

import { type Session } from 'next-auth'
import { SessionProvider, } from 'next-auth/react'

import { Provider } from 'jotai'
import Head from 'next/head'
import Layout from '~/components/layout'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { Toaster } from 'react-hot-toast'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider>
        <main>
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

          <Layout>
            <Component {...pageProps} />
          </Layout>

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
      </Provider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
