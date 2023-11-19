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

  useEffect(() => {
    if (compDateUser && compDateUser.length > 0 && compDateUser[0]) {
      setDate(new Date(compDateUser[0].date))
      setCompName(compDateUser[0].name)
      setIsSet(true)
    } else {
      setDate(undefined)
      setCompName('')
      setIsSet(false)
    }
  }, [compDateUser])

  return (
    <>
      <div className='mx-2 flex flex-col gap-2 md:gap-6 lg:flex-row'>
        <div className='flex items-end justify-between gap-2 md:justify-normal md:gap-6'>
          <div className='text-lg font-semibold md:w-64'>
            <div>Next Comp</div>
          </div>
          <div className=''>
            <Input
              className='w-[13.2rem] text-sm font-semibold md:w-72 md:text-sm'
              placeholder='Comp Name'
              value={compName}
              onChange={(e) => setCompName(e.target.value)}
            />
          </div>
        </div>

        <div className='flex items-end justify-between gap-2 md:justify-normal md:gap-6'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  'col-span-2 md:w-[230px] w-[190px] px-1 md:px-2 justify-start rounded-none border-0 border-b border-gray-600 text-left text-gray-200 hover:border-gray-200 ',
                  !date && 'text-gray-600',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='z-10 w-auto bg-black py-3 md:px-3 text-gray-200'>
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
              className='w-16 md:w-28'
              onClick={onSave}
            >
              Save
            </Button>
            <Button
              className='w-16 md:w-28'
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
