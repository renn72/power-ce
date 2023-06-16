
import React, { useState, Fragment } from "react"
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAtom, atom } from "jotai";

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon, PlusCircleIcon, MinusCircleIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

import { squatAtom, deadliftAtom, benchAtom } from "~/store/store";

const formDayAtom = atom(0)

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
  weight: number | null,
}

type Day = {
  exercise: Exercise[],
};

type Week = {
  name: string,
  day: Day[],
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

  const { register, handleSubmit, watch, reset, getValues, setValue, formState: { errors } } = useForm<Week>({});
  const [exerciseID, setExerciseID] = useState<number[][]>([[0], [0], [0], [0], [0], [0], [0],]);

  const [squat, setSquat] = useAtom(squatAtom);
  const [deadlift, setDeadlift] = useAtom(deadliftAtom);
  const [bench, setBench] = useAtom(benchAtom);

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  const onAddExercise = () => {
    console.log("add exercise")
    const newExerciseID = exerciseID[formDay].concat(+exerciseID[formDay][exerciseID[formDay].length - 1] + 1)
    console.log(exerciseID)
    exerciseID[formDay] = [...newExerciseID]
    setExerciseID([...exerciseID])
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

  return (
    <div className="mt-8 text-xxs md:text-sm">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-6">

          {/* Title */}
          <div className="flex justify-center">
            <div className="relative rounded-md shadow-lg">
              <input className="block text-center h-full w-64 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                placeholder="Name"
                {...register("name")}
              />
            </div>
          </div>

          {/* day */}
          <div className="flex justify-center items-center gap-4 text-lg text-gray-200 py-6">
            <ChevronLeftIcon className="h-8 w-8 cursor-pointer" onClick={() => onSetFormDay(-1)} />
            {dayText[formDay]}
            <ChevronRightIcon className="h-8 w-8 cursor-pointer" onClick={() => onSetFormDay(1)} />
          </div>



          {/* form */}
          <div className="flex gap-10">
            {exerciseID.map((day, dayIdx) => (
              <div key={dayIdx} className={`flex flex-col divide-y divide-dashed divide-gray-500 ${dayIdx == formDay ? `` : `hidden`}`}>
                {exerciseID[formDay].map((idx) => (
                  <div key={idx} className="grid gap-1 md:gap-2 md:grid-cols-8 grid-cols-4 py-5 justify-items-center">
                    <div className="w-24 sm:w-36 flex flex-col justify-center col-span-2">
                      <input
                        className="block h-full w-24 sm:w-36 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder="Lift"
                        {...register(`day.${dayIdx}.exercise.${idx}.lift`,)}
                      />
                    </div>
                    {/* name */}
                    <input
                      className="block h-full w-24 sm:w-36 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="Name"
                      {...register(`day.${dayIdx}.exercise.${idx}.name`,)}
                    />
                    {/* percent of one rep max */}
                    <input
                      className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      type="number"
                      placeholder="1rm%"
                      {
                      ...register(`day.${dayIdx}.exercise.${idx}.onerm`,
                        {
                          valueAsNumber: true, validate: (value) => value > 0 && value <= 100,
                          onChange: (e) => getWeight(idx)
                        })
                      }
                    />
                    {/* sets */}
                    <input
                      className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      type="number"
                      placeholder="Sets"
                      {...register(`day.${dayIdx}.exercise.${idx}.sets`, { valueAsNumber: true, validate: (value) => value > 0, })}
                    />
                    {/* reps */}
                    <input
                      className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      type="number"
                      placeholder="Reps"
                      {...register(`day.${dayIdx}.exercise.${idx}.reps`, { valueAsNumber: true, validate: (value) => value > 0, })}
                    />
                    {/* weight */}
                    <input
                      className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      placeholder="Weight"
                      type="number"
                      {...register(`day.${dayIdx}.exercise.${idx}.weight`, { valueAsNumber: true, })} // pattern: {value: /^(0|[1-9]\d*)(\.\d+)?$/}
                    />
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


          <button type="submit" > save </button>
        </div>

      </form>

    </div>
  );
}

export default Form2;
