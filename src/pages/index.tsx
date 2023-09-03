import { type NextPage, } from 'next'
import React, {
  useState, useEffect,
} from 'react'

import { useUser, } from '@clerk/nextjs'
import { api, } from '~/utils/api'
import ProgramCard from '~/components/programCard'
import { LoadingPage, } from '~/components/loading'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import Countdown from 'react-countdown';

const Home: NextPage = () => {
  const [
    compDate,
    setCompDate,
  ] = useState<Date>()
  const [
    compName,
    setCompName,
  ] = useState<string>('')
  const { user, } = useUser()
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })
  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAllUser.useQuery()
  const { data: compDateUser, } = api.compDate.getAllUser.useQuery({ userId: user?.id || '', })

  console.log('userPrograms', userPrograms)

  const { isLoading: programsLoading, } = api.blocks.getAllUserPrograms.useQuery()

  useEffect(() => {
    if (compDateUser && compDateUser.length > 0 && compDateUser[0]) {
      setCompDate(new Date(compDateUser[0].date))
      setCompName(compDateUser[0].name)
    }
  }, [compDateUser,])

  if (userProgramsLoading && programsLoading) return <div><LoadingPage /></div>

  return (
    <>
      <main className='h-full flex flex-col font-semibold px-2'>
        <div className='w-full md:mx-auto max-w-screen-2xl  flex flex-col py-6 sm:px-6 lg:px-8'>
          {/* <OneRMCard /> */}
          {compDate && compName
            && (
              <div className='flex gap-4 items-baseline'>
                <h2 className='text-lg font-bold text-gray-300'>{compName}</h2>
                <Countdown
                  className='text-xl font-bold'
                  date={compDate}
                />
              </div>
            )
          }
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
