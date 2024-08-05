import {
  ArrowDownToLine,
  ArrowUpToLine,
  PauseOctagonIcon,
  PlaySquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

import { type PrismaExercise as Exercise } from '~/store/types'

const ExerciseView = ({
  exercise,
  exerciseIdx,
  isAdmin,
}: {
  exercise: Exercise
  exerciseIdx: number
  isAdmin: boolean
}) => {
  const isSS = exercise?.ss && exercise?.ss.length > 0

  return (
    <>
      <div className='flex cursor-pointer flex-col overflow-hidden px-2 py-2 text-base min-w-60'>
        <div>
          <div className='flex justify-between mt-1'>
            <div className='flex gap-0 overflow-hidden text-lg tracking-tighter items-baseline'>
              <h2>{exerciseIdx + 1}.</h2>
              <h3 className='font-bold capitalize text-yellow-500'>
                {exercise.name ? exercise.name : 'No Name'}
              </h3>
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
        </div>
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
            {exercise?.tempoDown ||
            exercise?.tempoUp ||
            exercise?.tempoPause ? (
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
      </div>
    </>
  )
}

export default ExerciseView
