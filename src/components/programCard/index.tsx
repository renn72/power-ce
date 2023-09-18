import { useEffect, useState } from 'react'
import { api } from '~/utils/api'

import ProgramDay from './programDay'
import { useUser } from '@clerk/nextjs'

const ProgramCard = ({ programId }: { programId: string }) => {
  const { user } = useUser()
  api.oneRepMax.getUserCoreLifts.useQuery({
    userId: user?.id || '',
  })
  const { data: programs } = api.blocks.getAllUserPrograms.useQuery({
    userId: user?.id || '',
  })

  const program = programs?.find((program) => program.id === programId)

  const defaultOpen = program?.week.reduce((acc, week, weekIdx) => {
    week.day.forEach((day, dayIdx) => {
      if ((day.isComplete ? false : true) && acc.day === -1 && acc.week === -1) {
        acc.day = dayIdx
        acc.week = weekIdx
      }
    })

    return acc
  }, { day: -1, week: -1 })

  console.log('defaultOpen', defaultOpen)

  if (program?.isProgramActive) {
    console.log('program', program)
  }

  return (
    <>
      {program?.isProgramActive ? (
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
                          weekIdx={weekIndex}
                          openDay={defaultOpen?.day}
                          openWeek={defaultOpen?.week}
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
        <div>Name: {program?.name}</div>
      )}
    </>
  )
}

export default ProgramCard
