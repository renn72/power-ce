import { type NextPage, } from 'next'
import React from 'react'
import { useSession } from 'next-auth/react'

import Form from './form'

import { api, } from '~/utils/api'
import { LoadingPage, } from '~/components/loading'

const Templates: NextPage = () => {

  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()

  // Check for admin role
  const { data: session } = useSession()
  const user = session?.user
  if (!user) return <div>Login</div>
  // if (user.organizationMemberships[0]?.role !== 'admin') return <div>Not auth</div>

  if (blocksLoading) {
    return (
      <div className='flex grow'>
        <LoadingPage />
      </div>
    )
  }

  if (!blocksData) return <div>Something went wrong</div>

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
