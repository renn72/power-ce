import { Prisma } from '@prisma/client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
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
}: {
  exercise: Exercise
  onSetDone: (reps: number) => void
  isComplete: boolean
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
      <motion.div
        initial={{ opacity: 0, scale: 1, y: 2 }}
        transition={{ ease: 'easeIn', duration: 0.6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1 }}
      >
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
            className={`flex h-12 min-w-[3rem] cursor-pointer items-center justify-center rounded-full bg-gray-800 text-xl hover:scale-105`}
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
      </motion.div>
    </>
  )
}

export default SetsModal
