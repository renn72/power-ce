import { type UserProgram } from '@prisma/client'
import { api } from '~/utils/api'

import ProgramDay from './programDay'
import { useUser } from '@clerk/nextjs'

const ProgramCard = ({ userProgram }: { userProgram: UserProgram }) => {
  const { user } = useUser()
  const { data: programs } = api.blocks.getAllUserPrograms.useQuery()
  api.oneRepMax.getUserCoreLifts.useQuery({
    userId: user?.id || '',
  })
  const program = programs?.find(
    (program) => program.id === userProgram.programId,
  )

  if (!program) return <div>Program not found</div>
  return (
    <>
      {userProgram.isProgramActive ? (
        <>
          <div className='flex flex-col gap-8 text-base sm:text-lg md:px-2'>
            {program.week.map((week, weekIndex) => (
              <div key={week.id}>
                <h1 className='mb-4 text-2xl font-bold'>
                  Week {weekIndex + 1}
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-7 md:px-2'>
                  {week.day.map((day, dayIndex) => (
                    <div
                      key={day.id}
                      className='p-2'
                    >
                      {day.isRestDay ? (
                        <div className='flex h-full items-baseline gap-4'>
                          <h2 className='text-xl font-bold'>
                            Day {dayIndex + 1}
                          </h2>
                          <h2 className='h-full text-xl font-normal text-gray-500'>
                            Rest Day
                          </h2>
                        </div>
                      ) : (
                        <ProgramDay
                          day={day}
                          dayIdx={dayIndex}
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
          Program: {userProgram.isProgramActive ? 'Active, ' : 'Inactive, '}
          Name: {program?.name}
        </div>
      )}
    </>
  )
}

export default ProgramCard
