import {
  ArrowDownToLine,
  ArrowUpToLine,
  PauseOctagonIcon,
  PlaySquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { type PrismaExercise as Exercise } from '~/store/types'

import { useAtomValue } from 'jotai'
import { isProgramAtom, isEditProgramAtom } from './form'
import { StarIcon } from '@heroicons/react/20/solid'

const ExerciseView = ({
  exercise,
  exerciseIdx,
  isDayComplete,
  isExerciseComplete,
}: {
  exercise: Exercise
  exerciseIdx: number
  isDayComplete: boolean
  isExerciseComplete: boolean
}) => {
  const isSS = exercise?.ss && exercise?.ss.length > 0

  const isProgram = useAtomValue(isProgramAtom)
  const isEditProgram = useAtomValue(isEditProgramAtom)
  const isEnabled = !isProgram
    ? true
    : isDayComplete
    ? false
    : isExerciseComplete
    ? false
    : isEditProgram

  return (
    <>
      <div
        className={cn(
          'flex flex-col overflow-hidden px-2 py-2 text-base',
          isEnabled ? 'cursor-move' : 'cursor-default',
        )}
      >
        <div className='flex justify-between'>
          <div className='relative flex w-full gap-0 overflow-hidden text-lg tracking-tighter'>
            <h2 className='font-medium'>{exerciseIdx + 1}.</h2>
            <h3
              className={cn(
                'truncate font-bold capitalize text-yellow-500',
                exercise.isComplete ? 'text-green-500' : '',
                isDayComplete && !isExerciseComplete ? 'text-red-500' : '',
                Number(exercise?.sets) > exercise?.set?.length && isDayComplete
                  ? 'text-orange-500'
                  : '',
                Number(exercise?.sets) < exercise?.set?.length && isDayComplete
                  ? 'text-indigo-400'
                  : '',
              )}
            >
              {exercise.name ? exercise.name?.slice(0, 27) : 'No Name'}
            </h3>
            {exercise.isComplete && (
              <div className='absolute right-1 top-0 transform text-yellow-500'>
                <StarIcon className='h-5 w-5' />
              </div>
            )}
          </div>
          {exercise.htmlLink && (
            <div
              className=''
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={exercise.htmlLink}
                target='_blank'
                rel='noreferrer'
                className=''
              >
                <PlaySquare
                  size={26}
                  fill='#EAB308'
                  color='#373751'
                />
              </a>
            </div>
          )}
        </div>
        <h3 className='text-xxs capitalize leading-none text-gray-600'>
          {exercise.lift}
        </h3>
      {isSS ? (
        <div>
          <div className='relative flex flex-col items-baseline gap-1 overflow-hidden text-sm'>
            <h3>{exercise.sets} X</h3>
            <div className='flex flex-col pl-3 '>
              {exercise.ss.map((s, i) => (
                <div
                  key={i}
                  className='flex items-center gap-2'
                >
                  <div
                    className='w-4'
                    onClick={(e) => e.stopPropagation()}
                  >
                    {s.htmlLink && s.htmlLink !== '' && (
                      <a
                        href={s.htmlLink}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <PlaySquare className='h-4 w-4 text-yellow-500' />
                      </a>
                    )}
                  </div>
                  <h3>{s.reps}</h3>
                  <h3>-</h3>
                  <h3>{s.name}</h3>
                  {s.notes && (
                    <div className='w-fit overflow-hidden whitespace-nowrap'>
                      {s.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <div className='flex gap-1'>
              <h3>{exercise.sets}</h3>
              <h3>X</h3>
              <h3>{exercise.reps}</h3>
              <h3>{exercise.repUnit ? exercise.repUnit : 'reps'}</h3>
            </div>
            <div>
              {exercise.weightType === 'onerm' && (
                <div className='flex'>
                  <h4>{exercise.onerm}%</h4>
                  <h4>{exercise.onermTop && '-'}</h4>
                  <h4>{exercise.onermTop && exercise.onermTop}%</h4>
                </div>
              )}
              {exercise.weightType === 'rpe' && (
                <div className='flex items-baseline gap-0'>
                  <h4>RPE:&nbsp;</h4>
                  <h4 className='flex items-baseline justify-center'>
                    {exercise?.targetRpe && +exercise?.targetRpe}
                  </h4>
                  {exercise.targetRpeHigh && (
                    <>
                      <h4>-</h4>
                      <h4>{+exercise.targetRpeHigh}</h4>
                    </>
                  )}
                </div>
              )}
              {exercise.weightType === 'weight' && (
                <div className='flex items-baseline'>
                  <h4>
                    {exercise?.weightBottom ? (
                      +exercise?.weightBottom
                    ) : (
                      <div className='text-red-500'>Missing Weight</div>
                    )}
                  </h4>
                  <h4>{exercise?.weightTop && '-'}</h4>
                  {exercise?.weightTop && <h4>{+exercise?.weightTop}</h4>}
                  {exercise?.weightBottom || exercise?.weightTop ? (
                    <h4>kg</h4>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {exercise?.tempoDown || exercise?.tempoUp || exercise?.tempoPause ? (
            <div className='flex gap-4 text-sm'>
              <div>Tempo:</div>
              {exercise?.tempoDown && (
                <div className='flex items-center gap-0 tracking-tighter'>
                  <h4>{exercise.tempoDown}</h4>
                  <ArrowDownToLine size={16} />
                </div>
              )}
              {exercise?.tempoPause && (
                <div className='flex items-center gap-0 tracking-tighter'>
                  <h4>{exercise.tempoPause}</h4>
                  <PauseOctagonIcon size={16} />
                </div>
              )}
              {exercise?.tempoUp && (
                <div className='flex items-center gap-0 tracking-tighter'>
                  <h4>{exercise.tempoUp}</h4>
                  <ArrowUpToLine size={16} />
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
      {exercise.restTime && (
        <div className='flex gap-2 text-sm text-gray-400'>
          <div>Rest: {exercise.restTime}</div>
          {exercise.restUnit && <div>{exercise.restUnit}</div>}
        </div>
      )}
      <div>
        {exercise.notes && (
          <div className='text-sm text-gray-400'>{exercise.notes}</div>
        )}
      </div>
      <div className='flex justify-between'>
        <h3 className='text-xxs leading-3 text-gray-600'>
          {exercise.weightType}
        </h3>
      </div>
        {exercise.isComplete && (
          <>
            {exercise?.set ? (
              <div className=''>
                {exercise.set.map((s, i) => (
                  <div
                    key={s.id}
                  className='grid grid-cols-9 gap-x-1 tracking-tighter font-medium text-sm text-gray-400'
                  >
                    <h4 className=''>{i + 1}.</h4>
                    <h4 className=''>{s?.rep}</h4>
                    {s.weight && +s.weight !== 0 && (
                      <h4 className='col-span-2'>{+s.weight}kg</h4>
                    )}
                    <h4 className='col-span-2'>rpe {s?.rpe && +s?.rpe}</h4>
                    {s.estiamtedOnerm &&
                      exercise.lift !== 'unlinked' &&
                      Number(s.estiamtedOnerm) != 0 && (
                        <h4 className='col-span-3'>
                          E1rm {+s.estiamtedOnerm}kg
                        </h4>
                      )}
                  </div>
                ))}
              </div>
            ) : (
              <div>nil</div>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default ExerciseView
