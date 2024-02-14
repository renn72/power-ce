import { type NextPage } from 'next'
import React from 'react'
import { useSession } from 'next-auth/react'

import Form from './form'

import { api } from '~/utils/api'

import { createContext } from 'react'
import { type UseFieldArrayReturn } from 'react-hook-form'

export type UseFieldArray = {
  [key: string]: UseFieldArrayReturn
}

export const FieldArrayContext = createContext<UseFieldArray[]>([])

const ProgramTemplate = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, location: 'base' })

  if (!user) return <div>Login</div>
  if (!user.isAdmin) return <div>Not Authorized</div>

  return (
    <>
      <FieldArrayContext.Provider value={[]}>
        <main className='flex h-full min-w-[1600px] max-w-[100vw] flex-col items-center justify-center text-sm font-semibold sm:text-base'>
          <div className='flex w-full flex-col items-center justify-center '>
            <Form />
          </div>
        </main>
      </FieldArrayContext.Provider>
    </>
  )
}

export default ProgramTemplate
