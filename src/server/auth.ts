import { PrismaAdapter } from '@auth/prisma-adapter'
import { type GetServerSidePropsContext } from 'next'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
} from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import DiscordProvider from 'next-auth/providers/discord'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import type { Adapter } from 'next-auth/adapters'

import { db } from '~/server/db'

import { env } from '~/env.mjs'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    }
  }

  interface User extends DefaultUser {
    id: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user, account, profile, email, credentials })
      return true
    },
    session: async ({ session, token }) => {
      if (session.user && token) {
        session.user = {
          ...session.user,
          id: token.sub as string,
        }
      }
      return Promise.resolve(session)
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.sub = user.id
      }
      return Promise.resolve(token)
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 90 * 24 * 60 * 60, // 90 days
  },
  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === 'production' ? '__Secure-' : ''
      }next-auth.session-token`,
      options: {
        httpOnly: false,
        // sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
    state: {
      name: `${
        process.env.NODE_ENV === 'production' ? '__Secure-' : ''
      }next-auth.state`,
      options: {
        httpOnly: true,
        // sameSite: 'none',
        path: '/',
        secure: true,
        maxAge: 900,
      },
    },
  },
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: env.EMAIL_FROM,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) return null
        if (!credentials.username) return null
        const user = await db.user.findFirst({
          where: {
            email: credentials.username,
          },
        })
        console.log({ user, credentials, req })

        if (user) {
          if (user.flield1 === null) {
            await db.user.update({
              where: {
                id: user.id,
              },
              data: {
                flield1: credentials.password,
              },
            })
            return user
          }
          if (user.flield1 !== credentials.password) {
            return null
          }
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
