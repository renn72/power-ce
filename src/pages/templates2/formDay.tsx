import { useFieldArray, useFormContext, Controller } from 'react-hook-form'

import { api } from '~/utils/api'

import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@/components/ui/button'
import { Switch, Listbox, Transition } from '@headlessui/react'
import { type Block } from '~/store/types'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Fragment, useEffect } from 'react'
import { LoadingSpinner } from '~/components/loading'

import { cn } from '@/lib/utils'

const FormDay = ({ weekIdx, dayIdx }: { weekIdx: number; dayIdx: number }) => {
  const formMethods = useFormContext<Block>()
  const { control, watch, getValues } = formMethods

  const exerciseField = useFieldArray({
    control,
    name: `week.${weekIdx}.day.${dayIdx}.exercise`,
  })

  const { data: warmups, isLoading: warmupsLoading } =
    api.warmups.getAll.useQuery()

  const exerciseArray = getValues(`week.${weekIdx}.day.${dayIdx}.exercise`)

  const onRemoveExercise = (index: number) => {
    exerciseField.remove(index)
  }

  const onInsertExercise = (index: number) => {
    exerciseField.insert(index + 1, {
      name: '',
      lift: 'unlinked',
      sets: '',
      reps: '',
      onerm: '',
      onermTop: '',
      weightTop: '',
      weightBottom: '',
      targetRpe: '',
      notes: '',
      weightType: '',
      repUnit: '',
      htmlLink: '',
      isSS: false,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isRest: boolean = watch(`week.${weekIdx}.day.${dayIdx}.isRestDay`)

  useEffect(() => {
    if (isRest) {
      exerciseField.remove()
    }
  }, [isRest])

  const [parent] = useAutoAnimate(/* optional config */)

  if (warmupsLoading) <LoadingSpinner />

  return (
    <>
      <div className='flex flex-col items-stretch justify-center gap-2'>
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.isRestDay`}
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <div className='mb-2 flex flex-col items-center justify-center gap-0 text-lg text-gray-600'>
              <label className={value ? `` : `hidden`}>
                Rest Day
              </label>
              <Switch
                checked={value}
                onChange={onChange}
                className={cn(
                  value ? 'bg-gray-200' : 'bg-gray-600',
                  'relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full',
                  'border-2 border-transparent transition-colors duration-200 ease-in-out',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                  'sm:h-[28px] sm:w-[74px]',
                )}
              >
                <span className='sr-only'>Is it a Rest Day</span>
                <span
                  aria-hidden='true'
                  className={cn(
                    value ? 'translate-x-9' : 'translate-x-0',
                    'pointer-events-none inline-block h-[20px] w-[24px] transform rounded-full bg-gray-900',
                    'shadow-lg ring-0 transition duration-150 ease-in-out sm:h-[24px] sm:w-[34px]',
                  )}
                />
              </Switch>
            </div>
          )}
        />
        <ul
          ref={parent}
          className='mb-12 flex flex-col gap-6'
        >
          <div className={`flex items-center gap-2 ${isRest ? 'hidden' : ''}`}>
            <Controller
              control={control}
              name={`week.${weekIdx}.day.${dayIdx}.warmupTemplateId`}
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={value as string}
                  onChange={(e) => {
                    onChange(e)
                    console.log(e)
                  }}
                >
                  <div className='relative h-full w-60 overflow-visible text-xs sm:text-base'>
                    <div className='flex items-center gap-4'>
                      <Listbox.Button className='relative h-12 max-h-min min-h-[40px] w-full cursor-pointer border-b border-gray-600 py-2 pl-3 pr-10 text-left focus:outline-none '>
                        <span 
                          className={
                            cn('flex items-center capitalize',
                            value ? 'text-lg' : 'text-gray-600',
                            )}>
                          {warmups?.find((warmup) => warmup.id === value)
                            ?.name || 'Warmup'}
                        </span>
                        <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                          <ChevronUpDownIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </span>
                      </Listbox.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='max-h-160 absolute z-30 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 '>
                        {warmups?.map((warmup, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'text-gray-200'
                              }`
                            }
                            value={warmup.id}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate capitalize ${
                                    selected ? 'font-bold' : 'font-semibold'
                                  }`}
                                >
                                  {warmup.name}
                                </span>
                                {selected ? (
                                  <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                    <CheckIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
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
              )}
            />
            <XMarkIcon
              className='h-6 w-6 shrink-0 cursor-pointer text-gray-400 hover:text-white'
              onClick={() =>
                formMethods.setValue(
                  `week.${weekIdx}.day.${dayIdx}.warmupTemplateId`,
                  '',
                )
              }
            />
          </div>
          {exerciseField.fields.map((item, index) => {
            return (
              <li key={item.id}>
                <PlusCircleIcon
                  className='mx-auto mt-8 h-8 w-8 text-gray-400 hover:text-gray-200'
                  onClick={() => onInsertExercise(index)}
                />
              </li>
            )
          })}
        </ul>
        <div className='mx-auto flex gap-2 bg-opacity-100'>
            <PlusCircleIcon
              onClick={() => exerciseField.append({})}
              className={cn(
                isRest ? 'hidden h-10 w-10' : 'h-10 w-10 hover:scale-110',
                exerciseArray?.length === 0 ? '' : 'hidden',
              )}
            />
        </div>
      </div>
    </>
  )
}

export default FormDay
