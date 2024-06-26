import { type NextPage, } from 'next'
import React from 'react'
import { useSession } from 'next-auth/react'

import Form from '~/components/form'

import { api, } from '~/utils/api'
import { LoadingPage, } from '~/components/loading'

const Templates: NextPage = () => {

  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAllBlockTitles.useQuery()

  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, location: 'base' })

  if (blocksLoading) {
    return (
      <div className='flex grow'>
        <LoadingPage />
      </div>
    )
  }

  if (!blocksData) return <div>Something went wrong</div>
  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  return (
    <>
        <main className='h-full flex flex-col justify-center items-center text-sm sm:text-base font-semibold'>
          <div className='flex flex-col w-full justify-center items-center '>
            <Form />
          </div>
        </main>
    </>
  )
}

export default Templates
