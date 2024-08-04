import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

import { ErrorMessage } from '@hookform/error-message'

import { useFormContext } from 'react-hook-form'

import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Switch } from '@headlessui/react'

import TemplateSelect from './templateSelect'

import { defaultValues } from '~/store/defaultValues'

import { selectedTemplateAtom, isSuperAdminAtom } from './form'
import { PrismaBlock as Block } from '~/store/types'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAtomValue, useAtom } from 'jotai'
import { isProgramAtom, isEditProgramAtom } from './form'
import { Menu, MenuSquare } from 'lucide-react'

const FormHeader = ({
  setBlockId,
  onSubmit,
  onUpdate,
  setIsSaveOpen,
  isSaveOpen,
  onResetProgram,
  onSaveProgram,
}: {
  setBlockId: (id: string) => void
  onSubmit: (data: Block) => void
  onUpdate: (data: Block) => void
  setIsSaveOpen: (isOpen: boolean) => void
  isSaveOpen: boolean
  onResetProgram: () => void
  onSaveProgram: (data: Block) => void
}) => {
  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id || ''
  const formMethods = useFormContext<Block>()
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const isProgram = useAtomValue(isProgramAtom)
  const [isEditProgram, setIsEditProgram] = useAtom(isEditProgramAtom)
  const isEnabled = !isProgram ? true : isEditProgram

  const [isLoadOpen, setIsLoadOpen] = useState(false)

  const [isSuperAdmin, setIsSuperAdmin] = useAtom(isSuperAdminAtom)
  const isMe = userId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a'

  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)

  const { data: templateData, isLoading: templateLoading } =
    api.templateBuilder.getTemplate.useQuery({
      id: selectedTemplate,
    })

  const onNewTemplate = () => {
    reset(defaultValues)
    setBlockId('')
  }

  const onSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {
    if (!templateData) {
      toast.error('error')
      return
    }

    setBlockId(templateData.id)
    console.log('setBlockId', templateData.id)

    console.log('temp', templateData)

    const resetData = {
      ...templateData,
      week: templateData.week?.map((_week) => {
        const { blockId, ...week } = _week
        return {
          ...week,
          day: week?.day?.map((_day) => {
            const { weekId, ...day } = _day
            return {
              ...day,
              exercise: day?.exercise?.map((_exercise) => {
                const { dayId, set, ...exercise } = _exercise
                return {
                  ...exercise,
                  ss: exercise?.ss?.map((_s) => {
                    const { exerciseId, ...s } = _s
                    return {
                      ...s,
                    }
                  }),
                }
              }),
            }
          }),
        }
      }),
    }

    console.log('reset', resetData)

    reset(resetData)

    toast.success('Loaded')
  }

  const title = watch('name')

  return (
    <div className='flex w-full items-center justify-between rounded-lg bg-gray-900 p-2 '>
      <div className='flex w-full gap-2'>
        <div className='relative flex w-full items-center justify-between px-4 md:w-full'>
          <div />
          <div className='text-xl'>{title || 'New Training Template'}</div>
          {isEnabled && !isProgram && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Menu
                  strokeWidth={3}
                  className='h-8 w-8 cursor-pointer text-yellow-500 hover:text-yellow-200'
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                sideOffset={5}
                forceMount={true}
                className='bg-gray-800'
              >
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Dialog
                    open={isSaveOpen}
                    onOpenChange={setIsSaveOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type='button'
                        variant='secondary'
                        className='w-full'
                      >
                        Save
                      </Button>
                    </DialogTrigger>

                    <DialogContent className='flex flex-col items-center justify-center gap-4 bg-gray-900'>
                      <DialogHeader className='flex items-center justify-center gap-2 text-xl font-semibold'>
                        Save Template
                      </DialogHeader>
                      <div className='flex flex-col items-start justify-center gap-2'>
                        <div className='relative rounded-md px-4 shadow-lg'>
                          <Input
                            className='w-40 bg-gray-900  md:w-64 '
                            placeholder='Title'
                            defaultValue={``}
                            {...register('name', {
                              required: 'This is required.',
                            })}
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
                      <div className='flex gap-4'>
                        <Button
                          type='submit'
                          variant='secondary'
                          onClick={() => {
                            handleSubmit(onSubmit)()
                          }}
                        >
                          Save New
                        </Button>
                        <Button
                          type='submit'
                          variant='secondary'
                          onClick={() => {
                            handleSubmit(onUpdate)()
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Button
                    type='button'
                    variant='secondary'
                    className='w-full'
                    onClick={() => onNewTemplate()}
                  >
                    Clear
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <Dialog
                    open={isLoadOpen}
                    onOpenChange={setIsLoadOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type='button'
                        variant='secondary'
                        className='w-full'
                        onClick={() => setIsLoadOpen(true)}
                      >
                        Load
                      </Button>
                    </DialogTrigger>

                    <DialogContent className='flex flex-col items-center justify-center gap-4 bg-gray-900'>
                      <DialogHeader className='flex items-center justify-center gap-2 text-xl font-semibold'>
                        Save Template
                      </DialogHeader>
                      {isMe && (
                        <div className='flex items-center gap-1 text-sm'>
                          Super
                          <Switch
                            checked={isSuperAdmin}
                            onChange={setIsSuperAdmin}
                            className={cn(
                              isSuperAdmin ? 'bg-gray-200' : 'bg-gray-600',
                              'relative inline-flex h-[14px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent',
                              ' transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                            )}
                          >
                            <span
                              aria-hidden='true'
                              className={cn(
                                isSuperAdmin
                                  ? 'translate-x-6'
                                  : 'translate-x-0',
                                'pointer-events-none inline-block h-[10px] w-[14px] transform',
                                'rounded-full bg-gray-900 shadow-lg ring-0 transition duration-200 ease-in-out',
                              )}
                            />
                          </Switch>
                        </div>
                      )}
                      <div className='flex items-center justify-center gap-2 px-8 py-16'>
                        <TemplateSelect onSelectTemplate={onSelectTemplate} />
                        <Button
                          type='button'
                          className='w-24 bg-gray-900 px-0  text-sm tracking-tighter sm:text-lg sm:tracking-normal md:w-36'
                          disabled={templateLoading}
                          onClick={() => {
                            setIsLoadOpen(false)
                            onLoadTemplate()
                          }}
                        >
                          Load
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </DropdownMenuItem>
                {isProgram && (
                  <Button
                    type='button'
                    variant='secondary'
                    className='absolute right-10 top-1/2 h-6 -translate-y-1/2 transform'
                    onClick={() => setIsEditProgram(false)}
                  >
                    Finish Editing
                  </Button>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!isEnabled && isProgram && (
            <Button
              type='button'
              variant='secondary'
              className=''
              onClick={() => setIsEditProgram(true)}
            >
              Edit
            </Button>
          )}
          {isEnabled && isProgram && (
            <div className='flex gap-2'>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  handleSubmit(onUpdate)()
                }}
              >
                Update
              </Button>
              <Button
                type='button'
                variant='secondary'
                onClick={onResetProgram}
              >
                Undo
              </Button>
              <Button
                type='button'
                variant='secondary'
                className=''
                onClick={() => setIsEditProgram(false)}
              >
                Finish Editing
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormHeader
