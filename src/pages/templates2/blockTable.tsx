
/* eslint-disable react/display-name */
import React from 'react'
import { useFormContext, } from 'react-hook-form'
import { useAtom, } from 'jotai'

import getWeight from '~/utils/getWeight'

import type { Block, } from '~/pages/templates/form'

import {
  squatAtom, deadliftAtom, benchAtom,
} from '~/store/store'

const BlockTable = () => {
  const [squat,] = useAtom(squatAtom)
  const [deadlift,] = useAtom(deadliftAtom)
  const [bench,] = useAtom(benchAtom)

  const formMethods = useFormContext()

  if (!formMethods) return null

  const block = formMethods.watch()

  const checkWeight = (weekIdx: number, dayIdx: number, exerciseIdx: number) => {
    const lift = block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.lift
    const onerm = block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm

    if (!lift) return null
    if (!onerm) return null
    if (lift === 'unlinked') return null

    let weight = 0
    if (lift === 'Squat') weight = getWeight(squat, onerm)
    if (lift === 'Deadlift') weight = getWeight(deadlift, onerm)
    if (lift === 'Bench') weight = getWeight(bench, onerm)

    return `@${weight}kg`
  }

  if (!block.week) return null

  return (
    <div className='my-16 text-xxs md:text-sm '>
      <div className='rounded-lg bg-white p-1 md:p-8 '>
        <table className=''>
          <thead>
            <tr>
              <th>Day 1</th>
              <th>Day 2</th>
              <th>Day 3</th>
              <th>Day 4</th>
              <th>Day 5</th>
              <th>Day 6</th>
              <th>Day 7</th>
            </tr>
          </thead>
          <tbody>
            {block.week.map((week, weekIdx) => (
              <tr key={weekIdx} className='m-1 sm:m-2'>
                {week.day.map((day, dayIdx) => (
                  <td key={dayIdx} className='border-slate-400 border-2 p-0 md:p-2 divide-y-2  text-center'>
                    {day.isRestDay
                      ? 'Rest'
                      : day.exercise.map((exercise, exerciseIdx) => (
                        <div key={exerciseIdx} className='p-[1px] md:p-2 flex flex-col justify-center items-center '>
                          <div className='text-xxs leading-4 sm:leading-normal text-gray-400 w-10 md:w-full overflow-hidden'>{exercise.lift}</div>
                          <div className='md:h-6 w-12 md:w-full leading-3 sm:leading-normal overflow-hidden'>{exercise.name}</div>
                          <div className='leading-tight md:h-6'>{exercise.onerm ? exercise.onerm : ''}%</div>
                          <div className='grid grid-cols-3 md:flex md:flex-row sm:gap-1 md:h-6 leading-3 md:leading-normal'>
                            <div>{exercise.sets ? exercise.sets : ''}</div>
                            <div>X</div>
                            <div>{exercise.reps ? exercise.reps : ''}</div>
                            <div className='text-center col-span-3'>{checkWeight(weekIdx, dayIdx, exerciseIdx)}</div>
                          </div>

                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlockTable
