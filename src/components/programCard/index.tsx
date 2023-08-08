import { type UserProgram, } from '@prisma/client'
import { api, } from '~/utils/api'

import ProgramDay from './programDay'

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  const program = programs?.find((program) => program.id === userProgram.programId)
  return (
    <>
      {userProgram.isProgramActive
        ? (
          <div
            className='border font-normal border-gray-600 rounded-lg px-2 py-4'
          >
            <div className='font-bold'>
              Name: {program?.name}
            </div>
            <div
              className='flex flex-col gap-4'
            >
              {program?.week.map((week, weekIdx) => (
                <div
                  key={week.id}
                  className='border border-gray-600 rounded-lg px-1 py-6 '
                >
                  <div className='text-lg font-bold text-center md:text-left'>
                    Week {weekIdx + 1}
                  </div>
                  <div
                    className='grid md:grid-cols-4 mt-4 divide-y md:divide-y-0 md:divide-x divide-gray-600 px-2'
                  >
                    {week.day.map((day, dayIdx) => (
                      <ProgramDay
                        key={day.id}
                        day={day}
                        dayIdx={dayIdx}
                      />
                    ))}
                  </div>
                </div>
              ))
              }
            </div>
          </div>

        )
        : (

          <div>
            Program: {userProgram.isProgramActive ? 'Active, ' : 'Inactive, '}
            Name: {program?.name}
          </div>
        )}
    </>
  )
}

export default ProgramCard
