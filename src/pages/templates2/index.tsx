import { type NextPage, } from 'next'
import React from 'react'
import { useSession } from 'next-auth/react'

import Form from './form'

import { api, } from '~/utils/api'
import { LoadingPage, } from '~/components/loading'

const Templates: NextPage = () => {

  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, location: 'base' })

  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  return (
    <>
        <main className='h-full flex max-w-[100vw] min-w-[1600px] flex-col justify-center items-center text-sm sm:text-base font-semibold'>
          <div className='flex flex-col w-full justify-center items-center '>
            <Form />
          </div>
        </main>
    </>
  )
}

export default Templates

