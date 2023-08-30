import { type NextPage, } from 'next'
import React from 'react'

import { useUser, } from '@clerk/nextjs'
import { api, } from '~/utils/api'
import ProgramCard from '~/components/programCard'
import { LoadingPage, } from '~/components/loading'

const Home: NextPage = () => {
  const { user, } = useUser()
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })
  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAllUser.useQuery()

  console.log('userPrograms', userPrograms)

  const { isLoading: programsLoading, } = api.blocks.getAllUserPrograms.useQuery()

  if (userProgramsLoading && programsLoading ) return <div><LoadingPage /></div>

  return (
    <>
      <main className='h-full flex flex-col font-semibold px-2'>
        <div className='w-full md:mx-auto max-w-screen-2xl  flex flex-col py-6 sm:px-6 lg:px-8'>
          {/* <OneRMCard /> */}

          <div className='grid mt-6'>
            <div className=''>
              <h2 className='text-xl font-bold'>Active Program</h2>
              {
                userPrograms
                && userPrograms
                  .filter((userProgram) => userProgram.isProgramActive === true)
                  .map((userProgram) => (
                    <div key={userProgram.id}>
                      <ProgramCard userProgram={userProgram} />
                    </div>
                  ))
              }
            </div>
            <div className='mt-10'>
              <h2 className='text-xl font-bold'>Old Programs</h2>
              {
                userPrograms
                && userPrograms
                  .filter((userProgram) => !userProgram.isProgramActive)
                  .map((userProgram) => (
                    <div key={userProgram.id}>
                      <ProgramCard userProgram={userProgram} />
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
