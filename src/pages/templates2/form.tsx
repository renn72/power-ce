import React, { useState, } from 'react'

import { ErrorMessage, } from '@hookform/error-message'

import {
  useForm, FormProvider, useFieldArray,
} from 'react-hook-form'

import { toast, } from 'react-hot-toast'

import { api, } from '~/utils/api'

import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'

import { useAutoAnimate, } from '@formkit/auto-animate/react'

import {
  Disclosure, Transition,
} from '@headlessui/react'
import { ChevronUpIcon, } from '@heroicons/react/20/solid'

import FormWeek from './formWeek'

import { defaultValues, } from './defaultValues'
import { type Block, } from './types'

const Form = () => {
  const formMethods = useForm({ defaultValues, })
  const {
    register, reset, control, handleSubmit, setError, formState: { errors, },
  } = formMethods

  const [
    isUpdate,
    setIsUpdate,
  ] = useState(false)

  const [
    blockId,
    setBlockId,
  ] = useState('')

  const onSubmit = (data: Block) => {

    console.log('submit', data)
  }
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e)
  }

  const onAddWeek = () => {
    weekField.append({
      name: '',
      day: [
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
        {
          exercise: [], isRestDay: false,
        },
      ],
    })
  }

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  const [parent,] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='mt-2 md:mt-8 text-xxs md:text-base w-full flex flex-col justify-center items-center px-2 '>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col justify-center items-center'>
            <div ref={parent} className='flex flex-col w-full max-w-7xl gap-1 sm:gap-4 border border-gray-600 rounded-xl p-2 sm:p-6'>

              {/* template select */}
              <div className='flex gap-2 items-center justify-center'>
                <div>
                  <Button
                    type='button'
                    className=''
                  >
                    New Template
                  </Button>
                </div>
              </div>

              {/* Title */}
              <div className='flex flex-col gap-2 items-center justify-center'>
                <div className='relative rounded-md shadow-lg'>
                  <Input className=''
                    placeholder='Title'
                    defaultValue={``}
                    {...register('name', { required: 'This is required.', })}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name='name'
                  render={({ message, }) => <p className='text-red-400'>{message}</p>}
                />
              </div>

              {/* week */}

              {/* form */}
              {
                weekField.fields.map((week, weekIdx) => (
                  <Disclosure key={week.id} >
                    {({ open, }) => (
                      <div className='border border-gray-400 min-w-full p-2 rounded-xl'>
                        <Disclosure.Button className='flex justify-between items-center gap-2 rounded-lg px-8 py-2 text-left text-lg hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                          <span>{`Week ${weekIdx + 1}`}</span>
                          <ChevronUpIcon
                            className={`${open ? 'rotate-180 transform' : ''
                              } h-8 w-8 text-gray-400`}
                          />
                        </Disclosure.Button>

                        <Transition
                          className='transition-all duration-300 ease-out'
                          enterFrom='transform scale-70 opacity-0'
                          enterTo='transform scale-100 opacity-100'
                          leaveFrom='transform scale-100 opacity-100'
                          leaveTo='transform scale-70 opacity-0'
                        >
                          <Disclosure.Panel>
                            <FormWeek weekIdx={weekIdx} />
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                ))}

              <Button type='button' onClick={() => onAddWeek()}>Add Week</Button>
              <div className='flex gap-4 justify-center'>
                <button
                  type='submit'
                  className='rounded-lg py-2 px-4 bg-white text-gray-600'
                  onClick={() => setIsUpdate(false)}
                >
                  save new
                </button>
                <button
                  type='submit'
                  className='rounded-lg py-2 px-4 bg-white text-gray-600'
                  onClick={() => setIsUpdate(true)}
                >
                  update
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default Form
