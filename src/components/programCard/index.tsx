import { type UserProgram, } from '@prisma/client'
import { api, } from '~/utils/api'

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  const program = programs?.find((program) => program.id === userProgram.programId)
  console.log(program)
  return (
    <>
      {userProgram.isProgramActive
        ? (
          <div>
            Name: {program?.name}
            {program?.week.map((week, weekIdx) => (
              <div
                key={week.id}
                className=''
              >
                <div>
                  Week: {weekIdx + 1}
                </div>
                <div
                  className='grid grid-cols-7 gap-2'
                >
                  {week.day.map((day, dayIdx) => (
                    <div
                      key={day.id}
                    >
                      <div>
                        Day: {dayIdx + 1}
                      </div>
                      {day.isRestDay
                        ? (
                          <div>
                            Rest Day
                          </div>
                        )
                        : day.exercise.map((exercise) => (
                          <div key={exercise.id}>
                            <div>
                              {exercise.name}
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
            }
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
