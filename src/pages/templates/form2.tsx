
import React, { useState, useEffect, Fragment } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAtom, atom } from "jotai";

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon, PlusCircleIcon, MinusCircleIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

import { squatAtom, deadliftAtom, benchAtom } from "~/store/store";

const formDayAtom = atom(0)
const formWeekAtom = atom(0)
const formWeekSizeAtom = atom<number>(4)

type Props = {
  squat: number,
  deadlift: number,
  bench: number,
}

type Exercise = {
  lift: string,
  name: string,
  onerm: number,
  sets: number,
  reps: number,
}

type Day = {
  isRest: boolean,
  exercise: Exercise[],
};

type Week = {
  day: Day[],
}

type Block = {
  name: string,
  week: Week[],
}

const dayText = [
  'Day 1',
  'Day 2',
  'Day 3',
  'Day 4',
  'Day 5',
  'Day 6',
  'Day 7',
]

const lifts = ["unlinked", "Squat", "Deadlift", "Bench"];

const Form2 = () => {
  const [formDay, setFormDay] = useAtom(formDayAtom)
  const [formWeek, setFormWeek] = useAtom(formWeekAtom)
  const [formWeekSize, setFormWeekSize] = useAtom(formWeekSizeAtom)

  const { register, unregister, handleSubmit, getValues, setError, formState: { errors } } = useForm<Block>();
  const [formIndex, setFormIndex] = useState<number[][]>(
    [
      [1, 1, 1, 1, 1, 1, 1,],
      [1, 1, 1, 1, 1, 1, 1,],
      [1, 1, 1, 1, 1, 1, 1,],
      [1, 1, 1, 1, 1, 1, 1,],
    ],
  );

  const [squat, setSquat] = useAtom(squatAtom);
  const [deadlift, setDeadlift] = useAtom(deadliftAtom);
  const [bench, setBench] = useAtom(benchAtom);

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  const onAddExercise = () => {
    console.log("add exercise")
    formIndex[formWeek][formDay] += 1
    setFormIndex([...formIndex])
  }

  const onRemoveExercise = () => {
    console.log("remove exercise")
  }

  const onSelectLift = (key: string, idx: number) => {
    console.log('select lift')
  }

  const getWeight = (idx: number) => {
    console.log('getweight')
  }

  const onSetFormDay = (idx: number) => {
    const newDay = (formDay + idx)
    if (newDay >= 0 && newDay <= 6) {
      setFormDay(newDay)
    }
  }

  const onSetFormWeek = (idx: number) => {
    const newWeek = (formWeek + idx)
    if (newWeek >= 0 && newWeek < formWeekSize) {
      setFormWeek(newWeek)
    }
  }

  const onAddWeek = () => {
    setFormWeekSize(formWeekSize + 1)
    setFormIndex([...formIndex, [1, 1, 1, 1, 1, 1, 1,]])
  }
  const onRemoveWeek = () => {
    setFormWeekSize(formWeekSize - 1)
    setFormIndex(formIndex.slice(0, -1))
    unregister(`week.${formIndex.length - 1}`)
  }


  return (
    <div className="mt-8 text-xxs md:text-sm">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-6">

          {/* Title */}
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="relative rounded-md shadow-lg">
              <input className="block text-center h-full w-64 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                placeholder="Name"
                {...register("name", { required: 'This is required.' })}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <p className="text-red-400">{message}</p>}
            />
          </div>

          {/* week */}
          <div className="flex justify-center items-center gap-4 text-lg text-gray-200 py-6">
            <button type="button" onClick={() => onRemoveWeek()}>
              <MinusCircleIcon className="h-12 w-12 text-gray-800" aria-hidden="true" />
            </button>
            <ChevronLeftIcon className="h-8 w-8 cursor-pointer" onClick={() => onSetFormWeek(-1)} />
            Week {formWeek + 1}/{formIndex.length}
            <ChevronRightIcon className="h-8 w-8 cursor-pointer" onClick={() => onSetFormWeek(1)} />
            <button type="button" onClick={() => onAddWeek()}>
              <PlusCircleIcon className="h-12 w-12 text-gray-800" aria-hidden="true" />
            </button>
          </div>

          {/* day */}
          <div className="flex justify-center items-center gap-4 text-lg text-gray-200 py-6">
            <ChevronLeftIcon className="h-8 w-8 cursor-pointer" onClick={() => onSetFormDay(-1)} />
            {dayText[formDay]}
            <ChevronRightIcon className="h-8 w-8 cursor-pointer" onClick={() => onSetFormDay(1)} />
          </div>



          {/* form */}
          <div className="flex gap-10">
            {
              formIndex.map((week, weekIdx) => (
                <div key={weekIdx} className={`flex gap-10 ${weekIdx == formWeek ? `` : `hidden`}`}>
                  {
                    week.map((day, dayIdx) => (
                      <div key={dayIdx} className={`flex flex-col divide-y divide-dashed divide-gray-500 ${dayIdx == formDay ? `` : `hidden`}`}>
                        <div className="flex justify-center gap-4 mb-2">
                          <label>Is it a rest day?</label>
                          <input
                            className=" rounded-md p-2 text-gray-900"
                            type="checkbox"
                            {...register(`week.${weekIdx}.day.${dayIdx}.isRest`)}
                          />
                        </div>
                        {
                          Array.from({
                            length: day
                          }
                          ).map((value, idx) => (
                            <div key={idx} className="grid gap-1 md:gap-4 md:grid-cols-8 grid-cols-4 py-5 justify-items-center">
                              <div className="w-24 sm:w-36 flex flex-col justify-center col-span-2">
                                <input
                                  className="block h-full w-24 sm:w-36 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                  placeholder="Lift"
                                  {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.lift`,)}
                                />
                              </div>
                              {/* name */}
                              <input
                                className="block h-full col-span-2 w-24 sm:w-36 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                placeholder="Name"
                                defaultValue={`w${weekIdx + 1}.d${dayIdx + 1}.e${idx + 1}.name`}
                                type="text"
                                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.name`,)}
                              />
                              {/* percent of one rep max */}
                              <input
                                className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                type="number"
                                placeholder="1rm%"
                                {
                                ...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.onerm`,
                                  {
                                    valueAsNumber: true,
                                  })
                                }
                              />
                              {/* sets */}
                              <input
                                className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                type="number"
                                placeholder="Sets"
                                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.sets`, { valueAsNumber: true, })}
                              />
                              {/* reps */}
                              <input
                                className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                type="number"
                                placeholder="Reps"
                                {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.reps`, { valueAsNumber: true, })}
                              />
                              <div
                                className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                              >
                                Weight
                              </div>
                            </div>

                          ))}
                      </div>
                    ))}
                </div>
              ))}
          </div>


          <div className="flex justify-center gap-4 mt-16">
            <button type="button" onClick={() => onAddExercise()}>
              <PlusCircleIcon className="h-12 w-12 text-gray-800" aria-hidden="true" />
            </button>
            <button type="button" onClick={() => onRemoveExercise()}>
              <MinusCircleIcon className="h-12 w-12 text-gray-800" aria-hidden="true" />
            </button>
          </div>


          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="rounded-lg py-2 px-4 bg-white text-gray-600"
            >
              save new
            </button>
            <button
              type="submit"
              className="rounded-lg py-2 px-4 bg-white text-gray-600"
            >
              update
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}

export default Form2;
