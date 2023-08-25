import {
  useState, Fragment,
} from 'react'
import { type UserProgram, } from '@prisma/client'
import { api, } from '~/utils/api'
import getWeight from '~/utils/getWeight'

import {
  Dialog, Transition,
  Listbox, RadioGroup,
} from '@headlessui/react'

import ProgramDay from './programDay'
import { useUser, } from '@clerk/nextjs'
import DayModal from './dayModal'

const ProgramCard = ({ userProgram, }: { userProgram: UserProgram }) => {
  const { user, } = useUser()
  const { data: programs, } = api.blocks.getAllUserPrograms.useQuery()
  const { data: userCoreOneRM, } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: user?.id || '', })
  const program = programs?.find((program) => program.id === userProgram.programId)
  const [
    isOpen,
    setIsOpen,
  ] = useState(false)
  const [
    exerciseId,
    setExerciseId,
  ] = useState('')

  const checkWeight = (lift: string | null, onerm: number | null) => {
    if (!lift || !onerm) return ''
    const w = userCoreOneRM?.find((coreLift) => coreLift?.lift === lift.toLowerCase())?.weight

    if (!w) return ''

    return getWeight(+w, onerm,)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = (id: string) => {
    setExerciseId(id)
    setIsOpen(true)
  }

  if (!program) return <div>Program not found</div>
  return (
    <>
      {userProgram.isProgramActive
        ? (
          <>
            <div className='flex flex-col gap-8 text-base sm:text-lg md:px-2'>
              {
                program.week.map((week, weekIndex) => (
                  <div key={week.id}>
                    <h1
                      className='text-2xl font-bold mb-4'
                    >Week {weekIndex + 1}</h1>
                    <div className='grid grid-cols-1 md:grid-cols-7 md:px-2'>
                      {
                        week.day.map((day, dayIndex) => (
                          <div key={day.id} className='p-2'>
                            {
                              day.isRestDay
                                ? (
                                  <div className='h-full'>
                                    <h2
                                      className='text-xl font-bold mb-4'
                                    >
                                      Day {dayIndex + 1}
                                    </h2>
                                    <h2 className='lg:w-44 text-xl md:text-2xl text-gray-500 h-full flex flex-col justify-center items-center'>Rest Day</h2>
                                  </div>

                                )
                                : (
                                  <ProgramDay
                                    day={day}
                                    dayIdx={dayIndex}
                                  />
                                )
                            }
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </>

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
