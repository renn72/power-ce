import { PrismaAdapter } from '@auth/prisma-adapter'
import { type GetServerSidePropsContext } from 'next'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type DefaultUser,
} from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { db } from '~/server/db'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
      // isDiet: boolean
      // isDietTrainer: boolean
      // isPower: boolean
      // isPowerTrainer: boolean
      // isTrainer: boolean
      // isClient: boolean
      // isRecordEditor: boolean
      // isAdmin: boolean
      // isSuper: boolean
      // isHiiT: boolean
      // isHiiTTrainer: boolean
      // isRoot: boolean
      // ...other properties
      // role: UserRole;
    }
  }

  interface User extends DefaultUser {
    id: string
    // isDiet: boolean
    // isPower: boolean
    // isTrainer: boolean
    // isClient: boolean
    // isRecordEditor: boolean
    // isAdmin: boolean
    // isSuper: boolean
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      if (token) {
        session.user = {
          id: token.sub as string,
        }
      }
      return session
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id
        console.log('jwt token', token)
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
    maxAge: 90 * 24 * 60 * 60, // 90 days
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
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
