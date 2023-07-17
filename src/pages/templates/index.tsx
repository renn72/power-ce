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
          <div className='flex flex-col w-full justify-center items-center mt-2 '>
            <Form />
          </div>
          <div className='my-4 sm:px-6 lg:px-8'>
            <div className='flex md:gap-6 md:p-4 justify-center border border-gray-600 rounded-xl max-w-7xl'>
              <div className='rounded-lg p-2 flex flex-col'>
                <label className='text-center' htmlFor='squat'>Squat</label>
                <Input className='bg-gray-900 border border-gray-600 rounded-xl w-20 sm:w-28'
                  type='number'
                  id='squat'
                  placeholder='Squat'
                  value={squat}
                  onChange={(e) => setSquat(parseInt(e.target.value))}
                />
              </div>
              <div className='rounded-lg p-2 flex flex-col'>
                <label className='text-center' htmlFor='deadlift'>Deadlift</label>
                <Input className='bg-gray-900 border border-gray-600 rounded-xl w-20 sm:w-28'
                  type='number'
                  id='deadlift'
                  placeholder='Deadlift'
                  value={deadlift}
                  onChange={(e) => setDeadlift(parseInt(e.target.value))}
                />
              </div>
              <div className='rounded-lg p-2 flex flex-col'>
                <label className='text-center' htmlFor='squat'>Bench</label>
                <Input className='bg-gray-900 border border-gray-600 rounded-xl w-20 sm:w-28'
                  type='number'
                  id='bench'
                  placeholder='Bench'
                  value={bench}
                  onChange={(e) => setBench(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </main>
    </>
  )
}

export default Templates
