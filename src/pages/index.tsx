import { type NextPage, } from 'next'
import React from 'react'
import { useUser, } from '@clerk/nextjs'

import { api, } from '~/utils/api'
import OneRMCard from '~/components/oneRMCard'

const Home: NextPage = () => {
  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAll.useQuery()
  const {
    data: programsData, isLoading: programsLoading,
  } = api.blocks.getAllPrograms.useQuery()
  const ctx = api.useContext()
  const { user, } = useUser()

  if (!user) return <div>Login</div>

  const programs = userPrograms?.filter((program) => program.userId === user.id)
  if (programs?.length === 0) {
    console.log('no programs')
  }

  if (userProgramsLoading && userProgramsLoading) return <div>loading</div>

  return (
    <>
      <main className='h-full flex flex-col text-gray-300 font-semibold px-2'>
        <div className='mx-auto max-w-6xl w-full  flex flex-col h-fit py-6 sm:px-6 lg:px-8'>
          <OneRMCard/>

          <div className='grid mt-6'>
            <div className='text-gray-300'>
              <h2 className='text-xl font-bold text-gray-200'>Active Programs</h2>
              {
                programs
                && programs
                  .filter((program) => program.isProgramActive === true)
                  .map((program) => (
                    <div key={program.id}>
                      <div>{programsData?.filter((pd) => pd.id === program.programId)[0]?.name}</div>
                    </div>
                  ))
              }
            </div>
            <div className='text-gray-300'>
              <h2 className='text-xl font-bold text-gray-200'>Inactive Programs</h2>
              {
                programs
                && programs
                  .filter((program) => !program.isProgramActive)
                  .map((program) => (
                    <div key={program.id}>
                      <div>{programsData?.filter((pd) => pd.id === program.programId)[0]?.name}</div>
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
