import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message'
import { useAtom, atom } from "jotai";

import { PlusCircleIcon, MinusCircleIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'

import { api } from '~/utils/api'

import BlockTable from "./blockTable";
import TemplateSelect from "./templateSelect";
import FormDay from "./formDay";

export const formDayAtom = atom(0)
export const formWeekAtom = atom(0)
export const formWeekSizeAtom = atom<number>(2)
export const blockIndexAtom = atom('')
export const selectedTemplateAtom = atom('')

type Exercise = {
  lift: string,
  name: string,
  onerm: number | null,
  sets: number,
  reps: number,
}

type Day = {
  isRestDay: boolean,
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

const Form = () => {
  const [formDay, setFormDay] = useAtom(formDayAtom)
  const [formWeek, setFormWeek] = useAtom(formWeekAtom)
  // const [formWeekSize, setFormWeekSize] = useAtom(formWeekSizeAtom)
  const [, setBlockIndex] = useAtom(blockIndexAtom)
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const formMethods = useForm<Block>();
  const { register, unregister, reset, setValue, getValues, handleSubmit, setError, formState: { errors } } = formMethods
  const [formIndex, setFormIndex] = useState<number[][]>(
    [
      [2, 2, 2, 2, 2, 2, 2,],
      [2, 2, 2, 2, 2, 2, 2,],
    ],
  );
  // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const { data: blocksData, isLoading: blocksLoading } = api.blocks.getAll.useQuery();
  const blocksTitle = blocksData?.map((block) => block.name)

  const { mutate: blockCreateMutate, } = api.blocks.create.useMutation({
    onSuccess: () => {
      console.log('success')
    },
    onError: (e) => {
      console.log('error', e)
    },
  });

  const onSubmit = (data: Block) => {
    if (blocksTitle && blocksTitle.includes(data.name)) {
      setError("name", {
        type: "manual",
        message: "Need a unique name"
      })
      console.log('clash')
      return
    }
    const block = {
      name: data.name,
      week: data.week.map(
        (week) => ({
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name,
                  lift: exercise.lift,
                  onerm: exercise.onerm ? exercise.onerm : null,
                  sets: exercise.sets ? exercise.sets : null,
                  reps: exercise.reps ? exercise.reps : null,
                })
              )
            })
          )
        }))
    }
    console.log(block)

    blockCreasteMutate(block)
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
    if (newWeek >= 0 && newWeek < formIndex.length) {
      setFormWeek(newWeek)
    }
  }
  const onAddWeek = () => {
    // setFormWeekSize(formWeekSize + 1)
    setFormIndex([...formIndex, [1, 1, 1, 1, 1, 1, 1,]])
  }
  const onRemoveWeek = () => {
    // setFormWeekSize(formWeekSize - 1)
    if (formIndex.length - 1 <= 0) return
    setFormIndex(formIndex.slice(0, -1))
    if (formIndex.length - 1 <= formWeek) setFormWeek(formWeek - 1)
    unregister(`week.${formIndex.length - 1}`)
  }
  const onNewTemplate = () => {
    console.log('new')
    // setFormWeekSize(2)
    setFormIndex([
      [2, 2, 2, 2, 2, 2, 2,],
      [2, 2, 2, 2, 2, 2, 2,],
    ])
    setBlockIndex('')
    setFormDay(0)
    setFormWeek(0)
    // setFormWeekSize(2)
    reset()
  }

  const onSelectTemplate = (templateName: string) => {
    setSelectedTemplate(templateName)

    const block = blocksData?.filter((block) => block.name === templateName)[0]

    console.log('blocks', block)
    unregister()
    setValue('name', block?.name || '')
    const newFormIndex: number[][] = [[]]
    block?.week.forEach((week, weekIdx) => {
      newFormIndex[weekIdx] = [0, 0, 0, 0, 0, 0, 0]
      week.day.forEach((day, dayIdx) => {
        if (typeof day.isRestDay === 'boolean') setValue(`week.${weekIdx}.day.${dayIdx}.isRestDay`, day.isRestDay)
        newFormIndex[weekIdx][dayIdx] = day?.exercise?.length || 0
        day.exercise.forEach((exercise, exerciseIdx) => {
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.lift`, exercise.lift || null)
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.name`, exercise.name || null)
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.onerm`, exercise.onerm || null)
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.sets`, exercise.sets || null)
          setValue(`week.${weekIdx}.day.${dayIdx}.exercise.${exerciseIdx}.reps`, exercise.reps || null)
        })
      })
    })

    setBlockIndex(block?.id || '')
    setFormDay(0)
    setFormWeek(0)
    setFormIndex(newFormIndex)

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

        <TemplateSelect onSelectTemplate={onSelectTemplate} />

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
              <div className="flex gap-10 items-center justify-center">
                {
                  formIndex.map((week, weekIdx) => (
                    <div key={weekIdx} className={`flex gap-10 ${weekIdx == formWeek ? `` : `hidden`}`}>
                      {
                        week.map((day, dayIdx) => (
                          <FormDay key={dayIdx} weekIdx={weekIdx} dayIdx={dayIdx} day={day} />
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

export default Form;
