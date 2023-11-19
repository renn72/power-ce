import { api } from '~/utils/api'

import ProgramDay from './programDay'
import { LoadingSpinner } from '../loading'

import { Transition, Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const ProgramCard = ({
  programId,
  isAdmin = false,
  userId,
}: {
  programId: string
  isAdmin: boolean
  userId: string
}) => {
  api.oneRepMax.getUserCoreLifts.useQuery({
    userId: userId || '',
  })
  const { data: allUsers } = api.users.getAllUsers.useQuery()
  const { data: program, isLoading: programLoading } = api.blocks.get.useQuery({
    id: programId,
  })

  if (!program) return null

  const defaultOpen: { day: number; week: number } = program.week.reduce(
    (acc, week, weekIdx) => {
      week.day.forEach((day, dayIdx) => {
        if (!day.isComplete && acc.day === -1 && !day.isRestDay) {
          acc.day = dayIdx
          acc.week = weekIdx
        }
      })

      return acc
    },
    { day: -1, week: -1 },
  )

  if (programLoading) return <LoadingSpinner />

  return (
    <>
      {program?.isProgramActive && !isAdmin ? (
        <>
          <div className='flex flex-col gap-6 text-base sm:text-lg md:px-2'>
            {program.week.map((week, weekIndex) => (
              <div key={week.id}>
                <h1 className='text-2xl font-bold'>Week {weekIndex + 1}</h1>
                <div className='grid grid-cols-1 md:grid-cols-7 md:px-2'>
                  {week.day.map((day, dayIndex) => (
                    <div
                      key={day.id}
                      className='p-1'
                    >
                      {day.isRestDay ? (
                        <div className='flex h-full w-full items-baseline justify-between'>
                          <h2 className='text-xl font-bold'>
                            Day {dayIndex + 1}
                          </h2>
                          <h2 className='h-full text-lg font-normal text-gray-500'>
                            Rest Day
                          </h2>
                          <h2 className='w-8'></h2>
                        </div>
                      ) : (
                        <ProgramDay
                          day={day}
                          dayIdx={dayIndex}
                          weekIdx={weekIndex}
                          programId={programId}
                          openDay={defaultOpen.day}
                          openWeek={defaultOpen.week}
                          userId={userId}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <Disclosure defaultOpen={false}>
            {({ open }) => (
              <div className='flex flex-col md:gap-8'>
                <div className='flex flex-col sm:flex-row md:gap-6'>
                  <Disclosure.Button
                    className={`${
                      open
                        ? 'border-b border-yellow-500'
                        : 'border-b border-black hover:border-white'
                    } flex items-center gap-2 text-lg font-medium`}
                  >
                    <div className='flex gap-4'>
                      <h2>{program.name}</h2>
                      <h3>{program.createdAt.toLocaleDateString()}</h3>
                      <h3>
                        {
                          allUsers?.find(
                            (u) => u.id === program.userIdOfProgram,
                          )?.firstName
                        }
                      </h3>
                    </div>
                    <ChevronUpIcon
                      className={`${
                        open
                          ? 'rotate-180 transform text-white/80'
                          : 'text-white/30'
                      } h-8 w-8 text-gray-400`}
                    />
                  </Disclosure.Button>
                </div>

                <Transition
                  className='transition-all duration-300 ease-out'
                  enterFrom='transform scale-70 opacity-0'
                  enterTo='transform scale-100 opacity-100'
                  leaveFrom='transform scale-100 opacity-100'
                  leaveTo='transform scale-70 opacity-0'
                >
                  <Disclosure.Panel className=''>
                    <div className='flex gap-1'>
                      {program.week.map((week, weekIndex) => (
                        <div key={week.id}>
                          <h3>Week {weekIndex + 1}</h3>
                          {week.day.map((day, dayIndex) => (
                            <div
                              key={day.id}
                              className='flex gap-2'
                            >
                              Day {dayIndex + 1}
                              {day.isRestDay ? (
                                <div>Rest Day</div>
                              ) : (
                                <div>
                                  {day.isComplete === true ? (
                                    <div className='font-bold text-green-500'>
                                      Complete
                                    </div>
                                  ) : (
                                    <div className='font-extralight'>
                                      Incomplete
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
                </Transition>
              </div>
            )}
          </Disclosure>
        </div>
      )}
    </>
  )
}

export default ProgramCard
