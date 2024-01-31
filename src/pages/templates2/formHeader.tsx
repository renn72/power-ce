import React, { useState, useContext } from 'react'
import { useAtom } from 'jotai'
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
import ModalWrapper from '~/components/modalWrapper'
import { XIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

const FormHeader = ({
  setBlockId,
  onSubmit,
  onUpdate,
}: {
  setBlockId: (id: string) => void
  onSubmit: (data: Block) => void
  onUpdate: (data: Block) => void
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

  const [isSaveOpen, setIsSaveOpen] = useState(false)
  const [isLoadOpen, setIsLoadOpen] = useState(false)

  const [isSuperAdmin, setIsSuperAdmin] = useAtom(isSuperAdminAtom)
  const isMe = userId === 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a'

  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom)
  api.template.getAllTemplateTitles.useQuery({
    userId: userId,
    isSuperAdmin: isSuperAdmin,
  })
  const { data: blocksData } = api.blocks.getAll.useQuery() // TODO: just load titles

  const onNewTemplate = () => {
    reset(defaultValues)
    setBlockId('')
  }

  const onSelectTemplate = (template: string) => {
    setSelectedTemplate(template)
  }

  const onLoadTemplate = () => {
    const block = blocksData?.find((block) => block.id === selectedTemplate)
    setBlockId(block?.id || '')

    reset(block)

    toast.success('Loaded')
  }

  const title = watch('name')

  return (
    <div className='flex w-full items-center justify-between rounded-lg bg-gray-900 p-2 '>
      <div className='flex w-full gap-2'>
        <div className='flex w-full items-center justify-center gap-8 md:w-full'>
          <div className='text-xl'>{title || 'New Training Template'}</div>
          <Dialog
            modal={false}
            open={isSaveOpen}
            onOpenChange={setIsSaveOpen}
          >
            <DialogTrigger asChild>
              <Button
                type='button'
                variant='secondary'
                className='tracking-tighter'
              >
                Save
              </Button>
            </DialogTrigger>

            <DialogContent
              className='flex flex-col items-center justify-center gap-4 bg-gray-900'
              forceMount
            >
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
                    setIsSaveOpen(false)
                    handleSubmit(onSubmit)()
                  }}
                >
                  Save New
                </Button>
                <Button
                  type='submit'
                  variant='secondary'
                  onClick={() => {
                    setIsSaveOpen(false)
                    handleSubmit(onUpdate)()
                  }}
                >
                  Update
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            type='button'
            variant='secondary'
            className='tracking-tighter'
            onClick={() => onNewTemplate()}
          >
            Clear
          </Button>

          <Dialog
            modal={false}
            open={isLoadOpen}
            onOpenChange={setIsLoadOpen}
          >
            <DialogTrigger asChild>
              <Button
                type='button'
                variant='secondary'
                className='tracking-tighter'
                onClick={() => setIsLoadOpen(true)}
              >
                Load
              </Button>
            </DialogTrigger>

            <DialogContent
              className='flex flex-col items-center justify-center gap-4 bg-gray-900'
              forceMount
            >
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
                        isSuperAdmin ? 'translate-x-6' : 'translate-x-0',
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
        </div>
      </div>

      <ModalWrapper
        isOpen={isLoadOpen}
        setIsOpen={setIsLoadOpen}
      ></ModalWrapper>
    </div>
  )
}

export default FormHeader
