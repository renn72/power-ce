import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

import { Calendar } from '~/components/calendar'
import {
  Popover as PopoverCN,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon, HomeIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, add } from 'date-fns'

const DOB = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [value, setValue] = useState(
    defaultValue ? new Date(defaultValue) : null,
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateDOB.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })

      if (!previousData) return

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          DOB: newData.DOB,
        },
      )

      return { previousData }
    },
    onError: (err, _newData, context) => {
      console.log(err)
      utils.settings.get.setData(
        { userId: user?.id || '' },
        context?.previousData,
      )
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>DOB</h4>
        <p className='h-8 text-base text-gray-400'>
          {defaultValue == null
            ? '...'
            : new Date(defaultValue).toLocaleDateString('en-AU', {
                year: 'numeric',
                day: 'numeric',
                month: 'short',
              })}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='flex items-end justify-between gap-2 md:justify-normal md:gap-6'>
          <PopoverCN
            open={popoverOpen}
            setOpen={setPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                onClick={() => setPopoverOpen(true)}
                className={cn(
                  'col-span-2 w-full items-center justify-start rounded-none border-0 border-b border-gray-600 px-1 text-left text-gray-200 hover:border-gray-200 md:w-[230px] md:px-2 ',
                  !value && 'text-gray-600',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {value ? (
                  format(value, 'PPP')
                ) : (
                  <span className='ml-4 text-gray-400'>DOB</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='z-10 mt-[-10rem] border-gray-600 bg-black py-3 text-gray-200 md:px-3'>
              <div>
                <XIcon
                  onClick={() => setPopoverOpen(false)}
                  className='float-right h-5 w-5 cursor-pointer'
                />
              </div>
              <Calendar
                mode='single'
                selected={value ? value : undefined}
                onSelect={(e) => {
                  if (!e) return
                  setValue(new Date(e))
                }}
                defaultMonth={value ? value : undefined}
                captionLayout='dropdown'
                fromYear={new Date().getFullYear() - 100}
                toYear={new Date().getFullYear()}
              />
              <div className='flex w-full justify-center'>
                <Button
                  onClick={() => {
                    setPopoverOpen(false)
                  }}
                >
                  Set
                </Button>
              </div>
            </PopoverContent>
          </PopoverCN>
        </div>
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', DOB: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

export default DOB
