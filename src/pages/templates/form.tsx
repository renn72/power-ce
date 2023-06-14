import React, { useState, Fragment } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAtom, atom } from "jotai";

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline'

import { squatAtom, deadliftAtom, benchAtom } from "~/store/store";

const formDayAtom = atom(0)

type Props = {
  squat: number,
  deadlift: number,
  bench: number,
}

type Exercise = {
  name: string,
  onerm: number,
  sets: number,
  reps: number,
  weight: number,
}

type Day = {
  exercise: Exercise[],
};

type Week = {
  name: string,
  day: Day[],
}

const lifts = ["unlinked", "Squat", "Deadlift", "Bench"];

const Form = () => {
  const [formDay, setFormDay] = useAtom(formDayAtom)

  const { register, handleSubmit, watch, reset, getValues, setValue, formState: { errors } } = useForm<Week>({
    // defaultValues: {
    //   name: "",
    //   day: [
    //     {
    //       exercise: [
    //         {
    //           name: "",
    //           onerm: '',
    //           sets: '',
    //           reps: 5,
    //           weight: 152.5,
    //         }
    //       ],
    //     },
    //   ],
    // }
    //
  });
  const [exerciseID, setExerciseID] = useState<number[]>([0]);
  console.log("exerciseID", exerciseID)

  const [selectedLift, setSelectedLift] = useState(new Map([[0, "unlinked"]]));

  const [isPercentageSet, setIsPercentageSet] = useState(false);

  const [squat, setSquat] = useAtom(squatAtom);
  const [deadlift, setDeadlift] = useAtom(deadliftAtom);
  const [bench, setBench] = useAtom(benchAtom);

  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  // const onSubmit: SubmitHandler<Week> = (data) => {
  //   console.log("submit", data);}
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  const onAddExercise = () => {
    console.log("add exercise")
    setExerciseID([...exerciseID, +exerciseID[exerciseID.length - 1] + 1])
    setSelectedLift(new Map(selectedLift.set(exerciseID.length, '')))
  }

  const onRemoveExercise = () => {
    console.log("remove exercise")
    if (exerciseID.length > 1) setExerciseID([...exerciseID.slice(0, -1)])
    if (selectedLift.size > 1) setSelectedLift(new Map([...selectedLift].slice(0, -1)))
  }

  const onSelectLift = (key: string, idx: number) => {
    setSelectedLift(new Map(selectedLift.set(idx, key)))
    getWeight(idx)
  }

  const getWeight = (idx: number) => {
    const percent = getValues(`day.${formDay}.exercise.${idx}.onerm`) / 100
    let rm = 0
    if (selectedLift.get(idx) === 'Squat') rm = squat
    if (selectedLift.get(idx) === 'Deadlift') rm = deadlift
    if (selectedLift.get(idx) === 'Bench') rm = bench

    const weight = Math.round((rm * percent) / 2.5) * 2.5

    setValue(`day.${formDay}.exercise.${idx}.weight`, weight)
    setIsPercentageSet(true)

    return //weight.toString()
  }

  return (
    <div className="mt-8 text-xs md:text-sm">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit, onError)}>

        <div className="flex justify-center">
          <div className="relative rounded-md shadow-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 pr-4 border rounded-l-md">
              <span className="text-gray-500 text-base">
                Title
              </span>
            </div>
            <input className="block w-64 rounded-md border-0 py-1.5 pl-24 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              defaultValue=""
              {...register("name")}
            />
          </div>
        </div>
        <div ref={parent} className="flex flex-col divide-y divide-dashed divide-gray-500">
          {exerciseID.map((idx) => (
            <div key={idx} className="grid gap-1 md:gap-2 md:grid-cols-8 grid-cols-4 py-5 justify-items-center">
              <div className="w-36 flex flex-col justify-center col-span-2">
                <Listbox value={selectedLift.get(idx)} onChange={(key) => onSelectLift(key, idx)}>
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                      <span className="flex items-center h-6">{selectedLift.get(idx)}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {lifts.map((lift, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                              }`
                            }
                            value={lift}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  {lift}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              {/* name */}
              <div className="relative rounded-md shadow-sm col-span-2">
                <input
                  className="block h-full w-32 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="Name"
                  {...register(`day.${formDay}.exercise.${idx}.name`)}
                />
              </div>
              {/* percent of one rep max */}
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block  h-full w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  type="number"
                  placeholder="1rm %"
                  {
                  ...register(`day.${formDay}.exercise.${idx}.onerm`,
                    {
                      valueAsNumber: true, validate: (value) => value > 0 && value <= 100,
                      onChange: (e) => getWeight(idx)
                    })
                  }
                />
                <div className="pointer-events-none flex justify-center absolute inset-y-0 right-0 flex items-center pr-6">
                  <span className="text-gray-900 ">
                    { isPercentageSet ? '%' : ''}
                  </span>
                </div>
              </div>
              {/* sets */}
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block  h-full w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  type="number"
                  placeholder="Sets"
                  {...register(`day.${formDay}.exercise.${idx}.sets`, { valueAsNumber: true, validate: (value) => value > 0, })}
                />
              </div>
              {/* reps */}
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block  h-full w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  type="number"
                  placeholder="Reps"
                  {...register(`day.${formDay}.exercise.${idx}.reps`, { valueAsNumber: true, validate: (value) => value > 0, })}
                />
              </div>
              {/* weight */}
              <div className="relative rounded-md shadow-sm">
                <input
                  className="block  h-full w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="Weight"
                  {...register(`day.${formDay}.exercise.${idx}.weight`, { valueAsNumber: true, pattern: {value: /^(0|[1-9]\d*)(\.\d+)?$/ }})}
                />
              </div>
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

      </form>

    </div>
  );
}

export default Form;
