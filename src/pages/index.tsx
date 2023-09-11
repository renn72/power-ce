import { type NextPage } from 'next'

import { useUser } from '@clerk/nextjs'
import { api } from '~/utils/api'
import ProgramCard from '~/components/programCard'
import { LoadingPage } from '~/components/loading'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import CountDown from '~/components/countDown'

const Home: NextPage = () => {
  const { user } = useUser()

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '' })

  const { data: userPrograms, isLoading: userProgramsLoading } =
    api.userPrograms.getAllUser.useQuery()

  console.log('userPrograms', userPrograms)

  const { isLoading: programsLoading } =
    api.blocks.getAllUserPrograms.useQuery()

  if (userProgramsLoading || programsLoading) return <LoadingPage />

  return (
    <>
      <main className='flex h-full flex-col px-2 font-semibold'>
        <div className='flex w-full max-w-screen-2xl  flex-col py-6 sm:px-6 md:mx-auto lg:px-8'>
          <CountDown userId={user?.id || ''} />
          <div className='mt-6 grid'>
            <div className=''>
              <h2 className='text-xl font-bold'>Active Program</h2>
              {userPrograms &&
                userPrograms
                  .filter((userProgram) => userProgram.isProgramActive === true)
                  .map((userProgram) => (
                    <div key={userProgram.id}>
                      <ProgramCard userProgram={userProgram} />
                    </div>
                  ))}
            </div>
            <div className='mt-10'>
              <h2 className='text-xl font-bold'>Old Programs</h2>
              {userPrograms &&
                userPrograms
                  .filter((userProgram) => !userProgram.isProgramActive)
                  .map((userProgram) => (
                    <div key={userProgram.id}>
                      <ProgramCard userProgram={userProgram} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
