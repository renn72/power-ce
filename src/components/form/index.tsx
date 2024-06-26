import React, { useState } from 'react'
import { useAtom, atom } from 'jotai'
import { useSession } from 'next-auth/react'

import { ErrorMessage } from '@hookform/error-message'

import { useForm, FormProvider, useFieldArray } from 'react-hook-form'

import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { Switch, Tab } from '@headlessui/react'

import FormWeekData from './formWeekData'
import TemplateSelect from './templateSelect'

import { defaultValues } from '~/store/defaultValues'
import { type Block } from '~/store/types'
import { type BlockData } from '~/store/types'

import { classNames } from '~/utils/utils'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { LoadingWrapper } from '../loading'

export const selectedTemplateAtom = atom('')
export const isSuperAdminAtom = atom(false)

const Form = () => {
  const { data: session } = useSession()
  const user = session?.user
  const formMethods = useForm({ defaultValues })
  const {
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods

  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [blockId, setBlockId] = useState('')
  const [isSuperAdmin, setIsSuperAdmin] = useAtom(isSuperAdminAtom)
  const isMe = user?.id === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a'

  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const { data: blocksData } = api.blocks.getAllBlockTitles.useQuery() // TODO: just load titles
  const blocksTitle = blocksData?.map((block) => block.name)

    const { data: selectedTemplateData } = api.blocks.get.useQuery({
      id: selectedTemplate,
    })

  const ctx = api.useUtils()

  const { mutate: blockCreateMutate } = api.blocks.create.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      toast.success('Saved')
      void ctx.blocks.getAllBlockTitles.invalidate()
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: blockUpdateMutate } = api.blocks.update.useMutation({
    onSuccess: (e) => {
      console.log('success', e)
      setBlockId(e[1]?.id)
      setIsOpen(false)
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllBlockTitles.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const onSubmit = (data: Block) => {
    setIsOpen(true)
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
      week: data.week.map((week) => ({
        id: '',
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          warmupTemplateId: day.warmupTemplateId || '',
          exercise: day.exercise.map((exercise) => ({
            name: exercise.name,
            lift: exercise.lift,
            onerm: exercise.onerm ? +exercise.onerm : null,
            onermTop: exercise.onermTop ? +exercise.onermTop : null,
            weightTop: exercise.weightTop ? +exercise.weightTop : null,
            weightBottom: exercise.weightBottom ? +exercise.weightBottom : null,
            targetRpe: exercise.targetRpe ? +exercise.targetRpe : null,
            sets: exercise.sets ? +exercise.sets : null,
            reps: exercise.reps ? +exercise.reps : null,
            notes: exercise.notes,
            isEstimatedOnerm: exercise.isEstimatedOnerm || false,
            estimatedOnermIndex: exercise.estimatedOnermIndex,
            weightType: exercise.weightType,
            repUnit: exercise.repUnit,
            htmlLink: exercise.htmlLink,
            isComplete: false,
            tempoDown: exercise.tempoDown ? +exercise.tempoDown : null,
            tempoUp: exercise.tempoUp ? +exercise.tempoUp : null,
            tempoPause: exercise.tempoPause ? +exercise.tempoPause : null,
            isSS: exercise.isSS || false,
            ss: exercise.ss.map((s) => ({
              name: s.name,
              onerm: s.onerm ? +s.onerm : null,
              onermTop: s.onermTop ? +s.onermTop : null,
              weightTop: s.weightTop ? +s.weightTop : null,
              weightBottom: s.weightBottom ? +s.weightBottom : null,
              targetRpe: s.targetRpe ? +s.targetRpe : null,
              reps: s.reps ? +s.reps : null,
              weightType: s.weightType,
              repUnit: s.repUnit,
              notes: s.notes,
              htmlLink: s.htmlLink,
            })),
          })),
        })),
      })),
    }

    blockCreateMutate(block)
  }

  const updateBlock = (data: Block) => {
    console.log('updateBlock', data)
    console.log('blockId', blockId)
    const block: BlockData = {
      name: data.name,
      id: blockId,
      isProgram: false,
      week: data.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          isComplete: false,
          warmupTemplateId: day.warmupTemplateId || '',
          exercise: day.exercise.map((exercise) => ({
            name: exercise.name,
            lift: exercise.lift,
            onerm: exercise.onerm ? +exercise.onerm : null,
            onermTop: exercise.onermTop ? +exercise.onermTop : null,
            weightTop: exercise.weightTop ? +exercise.weightTop : null,
            weightBottom: exercise.weightBottom ? +exercise.weightBottom : null,
            targetRpe: exercise.targetRpe ? +exercise.targetRpe : null,
            sets: exercise.sets ? +exercise.sets : null,
            reps: exercise.reps ? +exercise.reps : null,
            notes: exercise.notes,
            isEstimatedOnerm: exercise.isEstimatedOnerm || false,
            estimatedOnermIndex: exercise.estimatedOnermIndex,
            weightType: exercise.weightType,
            repUnit: exercise.repUnit,
            htmlLink: exercise.htmlLink,
            isComplete: false,
            tempoDown: exercise.tempoDown ? +exercise.tempoDown : null,
            tempoUp: exercise.tempoUp ? +exercise.tempoUp : null,
            tempoPause: exercise.tempoPause ? +exercise.tempoPause : null,
            isSS: exercise.isSS || false,
            ss: exercise.ss.map((s) => ({
              name: s.name,
              onerm: s.onerm ? +s.onerm : null,
              onermTop: s.onermTop ? +s.onermTop : null,
              weightTop: s.weightTop ? +s.weightTop : null,
              weightBottom: s.weightBottom ? +s.weightBottom : null,
              targetRpe: s.targetRpe ? +s.targetRpe : null,
              reps: s.reps ? +s.reps : null,
              weightType: s.weightType,
              repUnit: s.repUnit,
              notes: s.notes,
              htmlLink: s.htmlLink,
            })),
          })),
        })),
      })),
    }

    blockUpdateMutate(block)
  }

  const onError = (errors, e) => {
    toast.error('Error')
    console.log('error', errors, e)
  }

  const onAddWeek = () => {
    weekField.append({
      name: '',
      isTemplate: false,
      day: [
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
        {
          exercise: [],
          isRestDay: true,
        },
      ],
    })
  }

  const onNewTemplate = () => {
    reset(defaultValues)
    setIsUpdate(false)
    setBlockId('')
  }

  const onSelectTemplate = (template: string) => {
    console.log('onSelectTemplate', template)
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {
    // const block = blocksData?.find((block) => block.id === selectedTemplate)
    console.log(selectedTemplate)
    console.log('onLoadTemplate', selectedTemplateData)
    setBlockId(selectedTemplateData?.id || '')

    const template = {
      name: selectedTemplateData?.name || '',
      week: selectedTemplateData?.week.map((week) => ({
        name: week.name || '',
        isTemplate: false,
        day: week.day.map((day) => ({
          isRestDay: day.isRestDay,
          warmupTemplateId: day.warmupTemplateId || '',
          exercise: day.exercise.map((exercise) => ({
            name: exercise.name || '',
            lift: exercise.lift || '',
            onerm: exercise.onerm ? exercise.onerm.toString() : undefined,
            onermTop: exercise.onermTop
              ? exercise.onermTop.toString()
              : undefined,
            weightTop: exercise.weightTop
              ? exercise.weightTop.toString()
              : undefined,
            weightBottom: exercise.weightBottom
              ? exercise.weightBottom.toString()
              : undefined,
            sets: exercise.sets ? exercise.sets.toString() : undefined,
            reps: exercise.reps ? exercise.reps.toString() : undefined,
            targetRpe: exercise.targetRpe
              ? exercise.targetRpe.toString()
              : undefined,
            isEstimatedOnerm: exercise.isEstimatedOnerm || false,
            estimatedOnermIndex: exercise.estimatedOnermIndex,
            notes: exercise.notes || '',
            weightType: exercise.weightType || undefined,
            repUnit: exercise.repUnit || undefined,
            htmlLink: exercise.htmlLink || undefined,
            tempoDown: exercise.tempoDown || undefined,
            tempoUp: exercise.tempoUp || undefined,
            tempoPause: exercise.tempoPause || undefined,
            isSS: exercise.ss.length > 0 ? true : false,
            ss: exercise.ss.map((s) => ({
              name: s.name || '',
              lift: s.lift || '',
              onerm: s.onerm ? s.onerm.toString() : undefined,
              onermTop: s.onermTop ? s.onermTop.toString() : undefined,
              weightTop: s.weightTop ? s.weightTop.toString() : undefined,
              weightBottom: s.weightBottom
                ? s.weightBottom.toString()
                : undefined,
              sets: s.sets ? s.sets.toString() : undefined,
              reps: s.reps ? s.reps.toString() : undefined,
              targetRpe: s.targetRpe ? s.targetRpe.toString() : undefined,
              weightType: s.weightType || undefined,
              repUnit: s.repUnit || undefined,
              notes: s.notes || '',
              htmlLink: s.htmlLink || undefined,
            })),
          })),
        })),
      })),
    }
    console.log(template)
    reset(template)

    toast.success('Loaded')
  }

  const weekField = useFieldArray({
    control,
    name: 'week',
  })

  const onRemoveWeek = () => {
    console.log('remove week')
    weekField.remove(weekField.fields.length - 1)
  }

  const [parent] = useAutoAnimate(/* optional config */)

  return (
    <>
      <LoadingWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isMe ? (
        <div className='flex items-center gap-1'>
          Super
          <Switch
            checked={isSuperAdmin}
            onChange={setIsSuperAdmin}
            className={`${isSuperAdmin ? 'bg-gray-200' : 'bg-gray-600'}
          relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75  sm:h-[28px] sm:w-[74px]`}
          >
            <span
              aria-hidden='true'
              className={`${isSuperAdmin ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[24px] transform rounded-full bg-gray-900 shadow-lg ring-0 transition duration-200 ease-in-out sm:h-[24px] sm:w-[34px]`}
            />
          </Switch>
        </div>
      ) : null}
      <div className='text-xxs flex h-full w-full flex-col items-center justify-center md:text-base'>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className='flex w-full flex-col items-center justify-center '
          >
            <div
              ref={parent}
              className='flex w-full flex-col items-center gap-1 sm:gap-8'
            >
              <div className='flex min-h-[80vh] w-full max-w-[1600px] flex-col items-center gap-2 p-1 sm:gap-8 sm:p-4 '>
                {/* template select */}
                <div className='flex w-full flex-col items-center  gap-2 md:flex-row '>
                  <TemplateSelect onSelectTemplate={onSelectTemplate} />
                  <div className='flex w-full items-center justify-around gap-2 md:w-fit md:justify-start'>
                    <Button
                      type='button'
                      className='w-36 text-sm tracking-tighter sm:text-xl sm:tracking-normal'
                      onClick={() => onNewTemplate()}
                    >
                      New
                    </Button>
                    <Button
                      type='button'
                      className='w-36 text-sm tracking-tighter sm:text-xl sm:tracking-normal'
                      onClick={() => onLoadTemplate()}
                    >
                      Load
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <div className='mb-6  flex w-full gap-2'>
                  <div className='flex flex-col items-start justify-center gap-2'>
                    <div className='relative rounded-md shadow-lg'>
                      <Input
                        className='w-40 md:w-72'
                        placeholder='Title'
                        defaultValue={``}
                        {...register('name', { required: 'This is required.' })}
                      />
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name='name'
                      render={({ message }) => (
                        <p className='text-red-400'>{message}</p>
                      )}
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-24 px-0 text-sm tracking-tighter sm:text-xl sm:tracking-normal md:w-36'
                    onClick={() => setIsUpdate(false)}
                  >
                    Save New
                  </Button>
                  <Button
                    type='submit'
                    className='w-24 text-sm tracking-tighter sm:text-xl sm:tracking-normal md:w-36'
                    onClick={() => setIsUpdate(true)}
                  >
                    Update
                  </Button>
                </div>

                <div className='flex w-full flex-col gap-2 '>
                  <Tab.Group>
                    <Tab.List className='flex justify-start gap-8 text-xl'>
                      <MinusCircleIcon
                        type='button'
                        className='h-10 w-10 text-gray-500 hover:text-gray-200'
                        onClick={() => onRemoveWeek()}
                      />
                      {weekField.fields.map((item, index) => {
                        return (
                          <Tab
                            key={item.id}
                            className={({ selected }) =>
                              classNames(
                                'mx-1 border-b border-transparent px-6 py-1.5',
                                'focus:outline-none',
                                selected
                                  ? 'text-bold border-b border-yellow-400 shadow'
                                  : 'font-normal hover:border-b hover:border-gray-400',
                              )
                            }
                          >
                            {`Week ${index + 1}`}
                          </Tab>
                        )
                      })}
                      <PlusCircleIcon
                        className='h-10 w-10 text-gray-500 hover:text-gray-200'
                        onClick={() => onAddWeek()}
                      />
                    </Tab.List>
                    <Tab.Panels className='mt-4'>
                      {weekField.fields.map((item, index) => {
                        return (
                          <Tab.Panel
                            key={item.id}
                            className={classNames('rounded-xl', '')}
                          >
                            <FormWeekData weekIdx={index} />
                          </Tab.Panel>
                        )
                      })}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className='mt-12 flex items-center justify-center gap-2'></div>
                </div>
              </div>
              <div className='my-28 flex justify-center gap-4'></div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  )
}

export default Form
