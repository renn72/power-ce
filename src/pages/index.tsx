import { type NextPage, } from 'next'
import React from 'react'

import { api, } from '~/utils/api'
import OneRMCard from '~/components/oneRMCard'
import ProgramCard from '~/components/ProgramCard'

const Home: NextPage = () => {
  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAllUser.useQuery()
  const { isLoading: programsLoading, } = api.blocks.getAllUserPrograms.useQuery()

  if (userProgramsLoading && programsLoading) return <div>loading</div>

  return (
    <>
      <main className='h-full flex flex-col text-gray-300 font-semibold px-2'>
        <div className='mx-auto max-w-6xl w-full  flex flex-col h-fit py-6 sm:px-6 lg:px-8'>
          <OneRMCard />

          <div className='grid mt-6'>
            <div className='text-gray-300'>
              <h2 className='text-xl font-bold text-gray-200'>Active Programs</h2>
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
            <div className='text-gray-300'>
              <h2 className='text-xl font-bold text-gray-200'>Inactive Programs</h2>
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
