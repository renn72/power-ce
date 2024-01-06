import { Prisma, Set } from '@prisma/client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const exerciseWithSetSS = Prisma.validator<Prisma.ExerciseArgs>()({
  include: {
    set: true,
    ss: true,
  },
})

type Exercise = Prisma.ExerciseGetPayload<typeof exerciseWithSetSS>

const SetsModal = ({
  exercise,
  onSetDone,
  set,
  onDeleteSet,
}: {
  exercise: Exercise
  onSetDone: (reps: number) => void
  set: Set
  onDeleteSet: (setId: string) => void
}) => {
  const [reps, setReps] = useState<number>(Number(exercise.reps))
  const isSS = exercise.ss && exercise.ss.length > 0

  const onUpdateRpeWrapper = (increase: boolean) => {
    console.log('update', increase)
    if (increase) {
      setReps((prev) => prev + 1)
    } else {
      if (reps < 2) return
      setReps((prev) => prev - 1)
    }
  }
  const onSetDoneWrapper = () => {
    onSetDone(reps)
  }

  return (
    <>
      {!set?.isComplete ? (
        <>
          {!exercise.isComplete && (
            <div className='flex flex-col items-center justify-center gap-1'>
              {!isSS ? (
                <ChevronUpIcon
                  onClick={() => onUpdateRpeWrapper(true)}
                  className='h-10 w-10 cursor-pointer text-gray-400'
                />
              ) : (
                <div className=''></div>
              )}
              <div
                className={`flex h-12 min-w-[3rem] cursor-pointer items-center justify-center rounded-full bg-gray-800 text-2xl font-semibold hover:scale-105`}
                onClick={(e) => {
                  e.stopPropagation()
                  onSetDoneWrapper()
                }}
              >
                {isSS ? 'SS' : reps}
              </div>
              {!isSS && (
                <ChevronDownIcon
                  onClick={() => onUpdateRpeWrapper(false)}
                  className='h-10 w-10 cursor-pointer text-gray-400'
                />
              )}
            </div>
          )}
        </>
      ) : (
        <div className='relative flex h-full shrink-0 flex-col items-center items-center justify-center'>
          <div
            className='flex flex-col gap-1'
            onClick={(e) => {
              e.stopPropagation()
              onDeleteSet(set.id)
            }}
          >
            <div className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-accent text-2xl font-bold tracking-tight text-black'>
              {isSS ? 'SS' : set.rep}
            </div>
          </div>
          <div className=''>
            <div className='absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center text-sm tracking-tighter text-gray-400'>
              {!isSS && (
                <div
                  className={
                    Number(set.weight) == 0 && exercise.lift != 'unlinked'
                      ? 'text-red-500'
                      : ''
                  }
                >
                  <span className='text-base font-bold text-gray-200'>
                    {Number(set.weight) === 0 ? '' : `${Number(set.weight)}kg`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SetsModal
