import { api } from '~/utils/api'

import ProgramDay from './programDay'
import { LoadingSpinner } from '../loading'

import { useState, useEffect } from 'react'

const ProgramCard = ({
  programId,
  isAdmin = false,
  userId,
}: {
  programId: string
  isAdmin: boolean
  userId: string
}) => {
  const [isMobile, setIsMobile] = useState(true)
  api.oneRepMax.getUserCoreLifts.useQuery({
    userId: userId || '',
  })
  const { data: program, isLoading: programLoading } = api.blocks.get.useQuery({
    id: programId,
  })

  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [])

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

  console.log(isMobile)

  if (programLoading) return <LoadingSpinner />

  return (
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
                      <h2 className='text-xl font-bold'>Day {dayIndex + 1}</h2>
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
  )
}

export default ProgramCard
