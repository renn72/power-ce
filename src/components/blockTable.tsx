/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle, forwardRef } from 'react'

import type { Block } from '~/pages/templates/form2'

const useForceRerender = () => {
  const [, setState] = useState({ value: 10 });

  function rerenderForcefully() {
    setState((prev) => {
      return { ...prev };
    });
  }

  return rerenderForcefully;
}

type BlockTableProps = {
  block : Block
}

export type BlockTableRefType = {
  update: () => void
}

const BlockTable  = forwardRef<BlockTableRefType, BlockTableProps>((props , ref ) => {
  const { block } = props

  const forceTableUpdate = useForceRerender()

  useImperativeHandle(ref, () => ({
    update() {
      forceTableUpdate()
    }
  }));

  if (!block.week) return null

  return (
    <div className="my-16">
      <div className="rounded-lg bg-white p-8">
        <table className="">
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
              <tr key={weekIdx} className="m-2">
                {week.day.map((day, dayIdx) => (
                  <td key={dayIdx} className="border-slate-400 border-2 p-2 divide-y-2">
                    {day.isRest ? 'Rest' : day.exercise.map((exercise, exerciseIdx) => (
                      <div key={exerciseIdx} className="p-2 flex flex-col justify-center items-center ">
                        <div>{exercise.lift}</div>
                        <div>{exercise.name}</div>
                        <div>{exercise.onerm}%</div>
                        <div className="flex gap-1">
                          <div>{exercise.sets}</div>
                          <div>X</div>
                          <div>{exercise.reps}</div>
                          <div>@</div>
                          <div>{145}kg</div>
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
})

export default BlockTable
