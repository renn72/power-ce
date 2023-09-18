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

  const { data: programs, isLoading: programsLoading } =
    api.blocks.getAllUserProgramsTitles.useQuery({ userId: user?.id || '' })


  if (programsLoading) return <LoadingPage />

  return (
    <>
      <main className='flex h-full flex-col px-2 font-semibold'>
        <div className='flex w-full max-w-screen-2xl  flex-col py-2 sm:px-6 md:mx-auto lg:px-8'>
          <CountDown userId={user?.id || ''} />
            <div className='flex flex-col gap-4'>
              {programs &&
                programs.map((program) => (
                  <div key={program.id}>
                    <ProgramCard programId={program.id} />
                  </div>
                ))}
            </div>
        </div>
      </main>
    </>
  )
}

export default Home
