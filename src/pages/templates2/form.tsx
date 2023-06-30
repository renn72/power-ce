import React, { useState, } from 'react'
import {
  useAtom, atom,
} from 'jotai'

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
import TemplateSelect from './templateSelect'

import { defaultValues, } from './defaultValues'
import { type Block, } from './types'
import { type BlockData, } from './types'

import { getRandomInt, } from '~/utils/utils'

export const selectedTemplateAtom = atom('')

const Form = () => {
  const formMethods = useForm({ defaultValues, })
  const {
    register, unregister, getValues, watch, reset, setValue, control, handleSubmit, setError, formState: { errors, },
  } = formMethods

  const [
    isUpdate,
    setIsUpdate,
  ] = useState(false)

  const [
    blockId,
    setBlockId,
  ] = useState('')

  const [
    selectedTemplate,
    setSelectedTemplate,
  ] = useAtom(selectedTemplateAtom)

  const {
    data: blocksData, isLoading: blocksLoading,
  } = api.blocks.getAll.useQuery()
  const blocksTitle = blocksData?.map((block) => block.name)

  const ctx = api.useContext()

  const { mutate: blockCreateMutate, } = api.blocks.create.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: blockUpdateMutate, } = api.blocks.update.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
    },
  })

  const onSubmit = (data: Block) => {
    console.log('submit')
    if (isUpdate) {
      updateBlock(data)
    } else {
      saveNewBlock(data)
    }
  }

  const saveNewBlock = (data: Block) => {
    console.log('saveNewBlock', data)
    if (blocksTitle && blocksTitle.includes(data.name) && !isUpdate) {
      setError('name', {
        type: 'manual',
        message: 'Need a unique name',
      })
      console.log('clash')
      return
    }
    const block: BlockData = {
      name: data.name,
      id: '',
      isProgram: false,
      week: data.week.map(
        (week) => ({
          name: week.name || '',
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name,
                  lift: exercise.lift,
                  onerm: exercise.onerm ? +exercise.onerm : null,
                  sets: exercise.sets ? +exercise.sets : null,
                  reps: exercise.reps ? +exercise.reps : null,
                })
              ),
            })
          ),
        })
      ),
    }

    blockCreateMutate(block)
  }

  const updateBlock = (data: Block) => {
    console.log('updateBlock', data)
  }

  const onError = (errors, e) => {
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

  const onNewTemplate = () => {
    reset(defaultValues)
    setIsUpdate(false)
    setBlockId('')
    setValue('name', `block-${getRandomInt(1000)}`)
  }

  const onSelectTemplate = (template: string) => {
    console.log('onSelectTemplate', template)
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {

    const block = blocksData?.filter((block) => block.name === selectedTemplate)[0]
    console.log('onLoadTemplate', block)
    setBlockId(block?.id || '')

    const template = {
      name: block?.name || '',
      week: block?.week.map(
        (week) => ({
          name: week.name || '',
          day: week.day.map(
            (day) => ({
              isRestDay: day.isRestDay,
              exercise: day.exercise.map(
                (exercise) => ({
                  name: exercise.name || '',
                  lift: exercise.lift || '',
                  onerm: exercise.onerm ? exercise.onerm.toString() : undefined,
                  sets: exercise.sets ? exercise.sets.toString() : undefined,
                  reps: exercise.reps ? exercise.reps.toString() : undefined,
                })
              ),
            })
          ),
        })
      ),
    }
    console.log(template)
    reset(template)

    toast.success('Loaded')

  }

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  watch('week')
  console.log('load', getValues())
  console.log('load', weekField.fields)

  const [parent,] = useAutoAnimate(/* optional config */)

  return (
    <>
      <div className='mt-2 md:mt-8 text-xxs md:text-base w-full flex flex-col justify-center items-center px-2 '>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit, onError)} className='w-full flex flex-col justify-center items-center'>
            <div ref={parent} className='flex flex-col w-full max-w-7xl gap-1 sm:gap-4 border border-gray-600 rounded-xl p-2 sm:p-6'>

              {/* template select */}
              <div className='flex gap-2 items-center justify-center'>
                <Button
                  type='button'
                  className=''
                  onClick={() => onNewTemplate()}
                >
                  New Template
                </Button>
                <TemplateSelect onSelectTemplate={onSelectTemplate} />
                <Button
                  type='button'
                  className=''
                  onClick={() => onLoadTemplate()}
                >
                  Load
                </Button>
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

              {
                weekField.fields.map((week, weekIdx) => (
                  <Disclosure key={week.id} defaultOpen={true} >
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
