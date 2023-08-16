import { useState, } from 'react'

import { api, } from '~/utils/api'

const ProgramView = ({ userId, }: { userId: string }) => {

  const {
    data: userPrograms, isLoading: userProgramsLoading,
  } = api.userPrograms.getAll.useQuery()
  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const { data: programsData, } = api.blocks.getAllPrograms.useQuery()

  const userProgram = userPrograms?.find((userProgram) => userProgram.userId === userId && userProgram.isProgramActive)
  const program = programsData?.find((program) => program.id === userProgram?.programId)
  console.log(program)

  if (!userProgram || !program) return null

  const blocksTitle = blocksData?.map((block) => block.name)
  return (
    <div>
      {
        program.week.map((week, weekIndex) => (
          <div key={week.id}>
            <h1>Week {weekIndex + 1}</h1>
            {
              week.day.map((day, dayIndex) => (
                <div key={day.id}>
                  <h2>Day {dayIndex + 1}</h2>
                  {
                    day.exercise.map((exercise, exerciseIndex) => (
                      <div key={exercise.id}
                      className='flex gap-4'>
                        <h3>{exercise.name}</h3>
                        <h3>- {exercise.sets}</h3>
                        <h3>- {exercise.reps}</h3>
                        <h3>- {exercise.lift}</h3>
                        <h3>- {exercise.weightType}</h3>


                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default ProgramView
