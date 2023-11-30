import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'

import * as React from 'react'
import { format, add } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { XMarkIcon } from '@heroicons/react/24/outline'

const CompDate = ({ userId }: { userId: string }) => {
  const [date, setDate] = useState<Date>()
  const [compName, setCompName] = useState<string>('')
  const [isSet, setIsSet] = useState<boolean>(false)

  const ctx = api.useContext()

  const { data: compDateUser } = api.compDate.getAllUser.useQuery({
    userId: userId || '',
  })
  const { mutate: mutateCompDate } = api.compDate.create.useMutation({
    onSuccess: () => {
      toast.success('Comp Date Created')
      void ctx.compDate.getAllUser.invalidate()
    },
    onError: (error) => {
      toast.error('error')
      console.log(error)
    },
  })

  const { mutate: mutateCompDateDelete } = api.compDate.delete.useMutation({
    onSuccess: () => {
      toast.success('Deleted')
      void ctx.compDate.getAllUser.invalidate()
    },
    onError: (error) => {
      toast.error('error')
      console.log(error)
    },
  })

  const onSave = () => {
    console.log('save')
    mutateCompDate({
      userId: userId,
      name: compName,
      date: date?.toISOString() || '',
    })
  }

  const onClear = () => {
    console.log('clear')
    mutateCompDateDelete({
      userId: userId,
      name: compName,
      date: date?.toISOString() || '',
    })
  }


  console.log('compDateUser', compDateUser)

  return (
    <>
      <div className='mx-2 flex flex-col gap-6'>
        <div className='w-64 text-lg font-semibold'>
          <div>Upcoming Comp</div>
        </div>

        <div className='flex flex-col gap-2'>
          {compDateUser?.map((comp) => (
            <div
              key={comp.id}
              className='flex flex-row gap-2'
            >
              <div className='w-64 text-lg font-semibold'>{comp.name}</div>
              <div className='w-64 text-lg font-semibold'>
                {format(new Date(comp.date), 'PPP')}
              </div>
              <XMarkIcon
                className='h-6 w-6 cursor-pointer text-gray-300 hover:text-gray-100'
                onClick={() => {
                  mutateCompDateDelete({
                    userId: userId,
                    name: comp.name,
                    date: comp.date,
                  })
                }}
              />
            </div>
          ))}
        </div>

        <div className='flex items-end justify-normal gap-6 md:gap-6'>
          <Input
            className='w-72 text-sm font-semibold md:text-sm'
            placeholder='Comp Name'
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  'col-span-2 w-[230px] justify-start rounded-none border-0 border-b border-gray-600 px-2 text-left text-gray-200 hover:border-gray-200 ',
                  !date && 'text-gray-600',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='z-10 w-auto bg-black py-3 text-gray-200 md:px-3'>
              <Calendar
                mode='single'
                selected={date}
                onSelect={(e) => {
                  const a = add(e, { hours: 8 })
                  setDate(a)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className='flex gap-2'>
            <Button
              className='w-28'
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              className='w-28'
              onClick={onClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompDate
