import { type NextPage } from 'next'

import { useUser } from '@clerk/nextjs'
import { api } from '~/utils/api'
import ProgramCard from '~/components/programCard'
import { LoadingPage } from '~/components/loading'

import { Disclosure, Transition } from '@headlessui/react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import CountDown from '~/components/countDown'
import ProgramView from '~/components/programView'

const Home: NextPage = () => {
  const { user } = useUser()

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '' })

  const { data: programs, isLoading: programsLoading } =
    api.blocks.getAllUserProgramsTitles.useQuery({ userId: user?.id || '' })

  if (programsLoading || !user) return <LoadingPage />

  return (
    <>
      <main className='flex h-full flex-col px-2 font-semibold'>
        <div className='flex w-full flex-col py-2 sm:px-6 md:mx-auto lg:px-2'>
          <CountDown userId={user?.id || ''} />
          <div className='flex flex-col gap-16'>
            {programs &&
              programs.map((program) => (
                <div key={program.id}>
                  {program.isProgramActive ? (
                    <ProgramCard
                      programId={program.id}
                      isAdmin={false}
                    />
                  ) : (
                    <Disclosure defaultOpen={false}>
                      {({ open }) => (
                        <div className='flex flex-col md:gap-8'>
                          <div className='flex flex-col sm:flex-row md:gap-6'>
                            <Disclosure.Button
                              className={`${
                                open
                                  ? 'border-b border-yellow-500'
                                  : 'border-b border-black hover:border-white'
                              } flex items-center gap-2 px-2 py-2 text-lg font-medium `}
                            >
                              {program.name}
                              <ChevronUpIcon
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-8 w-8 text-gray-400`}
                              />
                            </Disclosure.Button>
                            <div className='flex gap-2'></div>
                          </div>

                          <Transition
                            className='transition-all duration-300 ease-out'
                            enterFrom='transform scale-70 opacity-0'
                            enterTo='transform scale-100 opacity-100'
                            leaveFrom='transform scale-100 opacity-100'
                            leaveTo='transform scale-70 opacity-0'
                          >
                            <Disclosure.Panel className=''>
                              <ProgramView
                                userId={user.id}
                                programId={program.id}
                                isAdmin={false}
                              />
                            </Disclosure.Panel>
                          </Transition>
                        </div>
                      )}
                    </Disclosure>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className='2xl:grid-cols-7'></div>
        <div className='2xl:grid-cols-8'></div>
        <div className='2xl:grid-cols-9'></div>
        <div className='2xl:grid-cols-10'></div>
        <div className='2xl:grid-cols-11'></div>
        <div className='2xl:grid-cols-12'></div>
        <div className='2xl:grid-cols-13'></div>
        <div className='2xl:grid-cols-14'></div>
        <div className='2xl:grid-cols-15'></div>
        <div className='2xl:grid-cols-16'></div>
      </main>
    </>
  )
}

export default Home
