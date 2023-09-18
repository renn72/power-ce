import { useEffect, useState } from 'react'
import { type UserProgram } from '@prisma/client'
import { api } from '~/utils/api'

import ProgramDay from './programDay'
import { useUser } from '@clerk/nextjs'

const ProgramCard = ({ userProgram }: { userProgram: UserProgram }) => {
  const { user } = useUser()
  const { data: programs } = api.blocks.getAllUserPrograms.useQuery({userId: user?.id || ''})
  api.oneRepMax.getUserCoreLifts.useQuery({
    userId: user?.id || '',
  })

  const program = programs?.find(
    (program) => program.isProgramActive
  )
  console.log('program', program)

  const [openDay, setOpenDay] = useState<number | null>(null)
  const [openWeek, setOpenWeek] = useState<number | null>(null)

  useEffect(() => {
    let _day = -1 
    let _week = -1
    program?.week.forEach((week, weekIdx) => {
      week.day.forEach((day, dayIdx) => {
          if (!day.isComplete && _day === -1 && _week === -1) {
            _day = dayIdx
            _week = weekIdx
          }
      })
    })

    if (_day !== -1 && _week !== -1) {
      setOpenDay(_day)
      setOpenWeek(_week)
    }
  }, [program])

  console.log('openDay', openDay)
  console.log('openWeek', openWeek)

  if (!program) return <div>Program not found</div>
  return (
    <>
      {userProgram.isProgramActive ? (
        <>
          <div className='flex flex-col gap-4 text-base sm:text-lg md:px-2'>
            {program.week.map((week, weekIndex) => (
              <div key={week.id}>
                <h1 className='text-2xl font-bold'>
                  Week {weekIndex + 1}
                </h1>
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
                          openDay={openDay}
                          openWeek={openWeek}
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
