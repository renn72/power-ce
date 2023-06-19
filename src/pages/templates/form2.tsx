import React, { useState, useRef, Fragment } from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAtom, atom } from "jotai";

import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon, PlusCircleIcon, MinusCircleIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

import { squatAtom, deadliftAtom, benchAtom } from "~/store/store";

import { api } from '~/utils/api'
import BlockTable from "./blockTable";

import getWeight from '~/utils/getWeight'

const formDayAtom = atom(0)
const formWeekAtom = atom(0)
const formWeekSizeAtom = atom<number>(2)
const blockIndexAtom = atom('')

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

export type Block = {
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

function getRandomInt(max: number) {
  return Math.ceil(Math.random() * max);
}

const GetWeight = ({ week, day, exercise }: { week: number, day: number, exercise: number }) => {
  const [squat,] = useAtom(squatAtom);
  const [deadlift,] = useAtom(deadliftAtom);
  const [bench,] = useAtom(benchAtom);
  const formMethods = useFormContext<Block>();

  const watch = formMethods.watch([`week.${week}.day.${day}.exercise.${exercise}.onerm`, `week.${week}.day.${day}.exercise.${exercise}.lift`])

  const checkWeight = (weekIdx : number, dayIdx : number, exerciseIdx : number) => {
    const lift = watch[1] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.lift
    const onerm = watch[0] //block?.week[weekIdx]?.day[dayIdx]?.exercise[exerciseIdx]?.onerm

    if (!lift) return null
    if (!onerm) return null
     
    let weight = 0
    if (lift === 'squat') weight = getWeight(squat, onerm)
    if (lift === 'deadlift') weight = getWeight(deadlift, onerm)
    if (lift === 'bench') weight = getWeight(bench, onerm)

    return `${weight}kg`
  }
  // const checkWeight = () => {
  //   const onerm = watch[0] //formMethods.getValues(`week.${week}.day.${day}.exercise.${exercise}.onerm`)
  //   const lift = watch[1] //formMethods.getValues(`week.${week}.day.${day}.exercise.${exercise}.lift`)
  //   if (!onerm || onerm === 0 || lift === "unlinked") return 'nil'
  //
  //   let weight = 0
  //   if (lift === 'squat') weight = getWeight(squat, onerm)
  //   if (lift === 'deadlift') weight = getWeight(deadlift, onerm)
  //   if (lift === 'bench') weight = getWeight(bench, onerm)
  //   console.log(weight)
  //   return weight + 'kg'
  // }
  return (
    <div>
      {checkWeight()}
    </div>
  )
}

const lifts = ["unlinked", "Squat", "Deadlift", "Bench"];


const Form2 = () => {
  const [formDay, setFormDay] = useAtom(formDayAtom)
  const [formWeek, setFormWeek] = useAtom(formWeekAtom)
  const [formWeekSize, setFormWeekSize] = useAtom(formWeekSizeAtom)
  const [blockIndex, setBlockIndex] = useAtom(blockIndexAtom)

  const formMethods = useForm<Block>();
  const { register, unregister, reset, handleSubmit, getValues, setError, formState: { errors } } = formMethods
  const [formIndex, setFormIndex] = useState<number[][]>(
    [
      [2, 2, 2, 2, 2, 2, 2,],
      [2, 2, 2, 2, 2, 2, 2,],
    ],
  );

  const [squat,] = useAtom(squatAtom);
  const [deadlift,] = useAtom(deadliftAtom);
  const [bench,] = useAtom(benchAtom);

  const [template, setTemplate] = useState('');

  // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)


  const { data: blocksData, isLoading: blocksLoading } = api.blocks.getAll.useQuery();
  const blocksTitle = blocksData?.map((block) => block.name)

  const { mutate: blockMutate, } = api.blocks.create.useMutation({
    onSuccess: () => {
      console.log('success')
    },
    onError: (e) => {
      console.log('error', e)
    },
  });

  const onSubmit = (data: Block) => {
    console.log(data.name)

    if (blocksTitle && blocksTitle.includes(data.name)) {
      setError("name", {
        type: "manual",
        message: "Need a unique name"
      })
      console.log('clash')
      return
    }
    // blockMutate(data)
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onError = (errors, e) => console.log(errors, e);

  const onAddExercise = () => {
    console.log("add exercise")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formIndex[formWeek][formDay] += 1
    setFormIndex([...formIndex])
  }

  const onRemoveExercise = () => {
    console.log("remove exercise")
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
  const onNewTemplate = () => {
    console.log('new')
    setFormWeekSize(2)
    setFormIndex([
      [2, 2, 2, 2, 2, 2, 2,],
      [2, 2, 2, 2, 2, 2, 2,],
    ])
    setBlockIndex('')
    setFormDay(0)
    setFormWeek(0)
    setFormWeekSize(2)
    reset()
  }



  if (blocksLoading) {
    return <div>Loading...</div>
  }


  return (
    <>
      <div className="flex gap-6 justify-center items-center text-sm sm:text-base">

        <div>
          <button
            className="rounded-lg p-2 bg-white text-gray-900"
            onClick={() => onNewTemplate()}
          >
            New Template
          </button>
        </div>

        <div className="w-44  sm:w-52 flex flex-col justify-center">
          <Listbox value={template} onChange={setTemplate}>
            <div className="relative z-10">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white max-h-min h-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                <span className="block truncate">{template}</span>
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
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {blocksTitle?.map((template, Idx) => (
                    <Listbox.Option
                      key={Idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={template}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {template}
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

      </div>
      <div className="mt-8 text-xxs md:text-sm flex flex-col items-center">
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col gap-6">

              {/* Title */}
              <div className="flex flex-col gap-2 items-center justify-center">
                <div className="relative rounded-md shadow-lg">
                  <input className="block text-center h-full w-64 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="Name"
                    defaultValue="block-"


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
                                defaultChecked={false}
                                {...register(`week.${weekIdx}.day.${dayIdx}.isRest`,)}
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
                                    // defaultValue={getRandomInt(90)}
                                    placeholder="1rm%"
                                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.onerm`,
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
                                    defaultValue={getRandomInt(10)}
                                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.sets`, {
                                      valueAsNumber: true,

                                    })}
                                  />
                                  {/* reps */}
                                  <input
                                    className="block  h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                    type="number"
                                    placeholder="Reps"
                                    defaultValue={getRandomInt(10)}
                                    {...register(`week.${weekIdx}.day.${dayIdx}.exercise.${idx}.reps`, {
                                      valueAsNumber: true,
                                    })}
                                  />
                                  <div
                                    className="block bg-white font-semibold h-full w-12 sm:w-20 rounded-md border-2 border-white py-1.5 px-2 text-gray-400"
                                  >
                                    <GetWeight
                                      week={weekIdx}
                                      day={dayIdx}
                                      exercise={idx}
                                    />
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

          <BlockTable />

        </FormProvider>
      </div>
    </>
  );
}

export default Form2;
