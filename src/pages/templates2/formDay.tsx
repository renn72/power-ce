import { useFieldArray, useFormContext, Controller } from 'react-hook-form'

import { api } from '~/utils/api'

import { PlusCircleIcon } from '@heroicons/react/24/outline'

import { Switch } from '@headlessui/react'
import { type PrismaBlock } from '~/store/types'
import { type Set, SuperSet as SS } from '@prisma/client'

import { useEffect, useContext } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

import { cn } from '@/lib/utils'
import Warmup from './warmup'
import FormExercise from './formExercise'

import { FieldArrayContext } from './index'

import { useAtomValue } from 'jotai'
import { isProgramAtom, isEditProgramAtom } from './form'

const FormDay = ({ weekIdx, dayIdx }: { weekIdx: number; dayIdx: number }) => {
  const formMethods = useFormContext<PrismaBlock>()
  const { control, watch, getValues } = formMethods

  const isProgram = useAtomValue(isProgramAtom)
  const isEditProgram = useAtomValue(isEditProgramAtom)
  const isEnabled = !isProgram ? true : isEditProgram

  const fieldArrayContext = useContext(FieldArrayContext)

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  fieldArrayContext[`${weekIdx}-${dayIdx}`] = exerciseField

  api.warmups.getAll.useQuery()

  const exerciseArray = getValues(`week.${weekIdx}.day.${dayIdx}.exercise`)

  const onRemoveExercise = (index: number) => {
    exerciseField.remove(index)
  }

  const onInsertExercise = (index: number) => {
    // @ts-ignore
    exerciseField.insert(index + 1, {
      // id: '',
      name: '',
      lift: 'unlinked',
      sets: null,
      reps: null,
      onerm: null,
      onermTop: null,
      weightTop: null,
      weightBottom: null,
      targetRpe: null,
      notes: '',
      weightType: '',
      repUnit: '',
      htmlLink: '',
      isSS: false,
      isEstimatedOnerm: false,
      estimatedOnermIndex: null,
      targetRpeHigh: null,
      restTime: null,
      restUnit: '',
      flield1: null,
      flield2: null,
      flield3: null,
      flield4: null,
      flield5: null,
      tempoDown: null,
      tempoUp: null,
      tempoPause: null,
      isComplete: false,
      // ss: [] as SS[],
      // set: [] as Set[],
      createdAt: new Date(),
      userId: null,
      trainerId: null,
      isTemplate: false,
      setWieght: null,
      setTopWeight: null,
      actualReps: null,
      actualSets: null,
      rpe: null,
      weight: null,
      dayId: '',
    })
  }

  const isRest: boolean = watch(`week.${weekIdx}.day.${dayIdx}.isRestDay`)

  useEffect(() => {
    if (isRest) {
      exerciseField.remove()
    } else {
      if (exerciseArray.length === 0) {
      }
    }
  }, [isRest])

  return (
    <>
      <div className='flex w-full flex-col items-stretch justify-center gap-1'>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.isRestDay`}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <div className='flex flex-col items-center justify-center gap-0 text-lg text-gray-600'>
              {isEnabled && (
                <Switch
                  checked={value}
                  onChange={onChange}
                  className={cn(
                    value ? 'bg-gray-200' : 'bg-gray-600',
                    'relative inline-flex h-[18px] w-[64px] shrink-0 cursor-pointer rounded-full',
                    'border-2 border-transparent transition-colors duration-200 ease-in-out',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                  )}
                >
                  <span className='sr-only'>Is it a Rest Day</span>
                  <span
                    aria-hidden='true'
                    className={cn(
                      value ? 'translate-x-9' : 'translate-x-0',
                      'pointer-events-none inline-block h-[14px] w-[24px] transform rounded-full bg-gray-900',
                      'shadow-lg ring-0 transition duration-150 ease-in-out',
                    )}
                  />
                </Switch>
              )}
              <label className={value ? `mt-4` : `hidden`}>Rest Day</label>
            </div>
          )}
        />
        <Warmup
          weekIdx={weekIdx}
          dayIdx={dayIdx}
        />
        <Droppable
          droppableId={`${weekIdx}-${dayIdx}`}
          renderClone={(provided, snapshot, rubric) => {
            return (
              <div
                className={cn(
                  snapshot.isClone ? 'bg-gray-600' : '',
                  snapshot.isDragging ? 'bg-gray-700' : '',
                  'rounded-md bg-gray-700/80',
                )}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <FormExercise
                  // @ts-ignore
                  exercise={exerciseArray[rubric.source.index]}
                  exerciseIdx={rubric.source.index}
                  weekIdx={weekIdx}
                  dayIdx={dayIdx}
                />
              </div>
            )
          }}
        >
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex min-h-[200px] flex-col gap-2'
            >
              {exerciseField.fields.map((item, index) => {
                return (
                  <Draggable
                    isDragDisabled={!isEnabled}
                    key={`week.${weekIdx}.day.${dayIdx}.exercise.${index}`}
                    draggableId={`item-${weekIdx}-${dayIdx}-${index}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={cn(
                          snapshot.isClone ? 'bg-gray-600' : '',
                          snapshot.isDragging ? 'bg-gray-700' : '',
                          'rounded-md bg-gray-700/30 hover:bg-gray-700/60 ',
                        )}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FormExercise
                          exercise={item}
                          exerciseIdx={index}
                          weekIdx={weekIdx}
                          dayIdx={dayIdx}
                          onRemoveExercise={onRemoveExercise}
                        />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className='mx-auto'>
          {isEnabled && (
            <PlusCircleIcon
              onClick={() => onInsertExercise(exerciseArray.length - 1)}
              className={cn(
                isRest
                  ? 'hidden h-10 w-10'
                  : 'h-10 w-10 text-gray-400 hover:scale-110 hover:text-gray-200',
              )}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default FormDay
