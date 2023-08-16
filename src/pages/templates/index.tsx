import { type NextPage, } from 'next'
import React from 'react'
import { useUser, } from '@clerk/nextjs'

import { useAtom, } from 'jotai'

import Form from './form'

import {
  squatAtom, deadliftAtom, benchAtom,
} from '~/store/store'

import { api, } from '~/utils/api'
import { LoadingPage, } from '~/components/loading'
import { Input, } from '@/components/ui/input'

const Templates: NextPage = () => {
  const [
    squat,
    setSquat,
  ] = useAtom(squatAtom)
  const [
    deadlift,
    setDeadlift,
  ] = useAtom(deadliftAtom)
  const [
    bench,
    setBench,
  ] = useAtom(benchAtom)

  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()

  // Check for admin role
  const { user, } = useUser()
  if (!user) return <div>Login</div>
  if (user.organizationMemberships[0]?.role !== 'admin') return <div>Not auth</div>

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
          <div className='flex flex-col w-full justify-center items-center my-8 '>
            <Form />
          </div>
        </main>
    </>
  )
}

export default Templates
