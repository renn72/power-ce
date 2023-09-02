import {
  useState, useEffect,
} from 'react'
import { useUser, } from '@clerk/nextjs'
import { toast, } from 'react-hot-toast'
import { api, } from '~/utils/api'

import * as React from 'react'
import {
  format, add,
} from 'date-fns'
import { Calendar as CalendarIcon, } from 'lucide-react'

import { CheckCircleIcon, } from '@heroicons/react/24/outline'

import { cn, } from '@/lib/utils'
import { Button, } from '@/components/ui/button'
import { Calendar, } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input, } from '@/components/ui/input'

const CompDate = ({ userId, }: { userId: string }) => {
  const { user, } = useUser()
  const [
    date,
    setDate,
  ] = useState<Date>()
  const [
    compName,
    setCompName,
  ] = useState<string>('')
  const [
    isSet,
    setIsSet,
  ] = useState<boolean>(false)

  const ctx = api.useContext()

  const { data: compDates, } = api.compDate.getAll.useQuery()
  const { data: compDateUser, } = api.compDate.getAllUser.useQuery({ userId: userId || '', })
  const { mutate: mutateCompDate, } = api.compDate.create.useMutation({
    onSuccess: () => {
      toast.success('Comp Date Created')
      void ctx.compDate.getAllUser.invalidate()
    },
    onError: (error) => {
      toast.error('error')
      console.log(error)
    },
  })

  const { mutate: mutateCompDateDelete, } = api.compDate.delete.useMutation({
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
  }, [compDateUser,])

  return (
    <>
      <div className='grid grid-cols-3 lg:grid-cols-6 gap-6 items-center m-2'>
        <div className='text-lg font-semibold col-span-3 lg:col-span-1 flex gap-2 items-center'>
          Next Comp
          {isSet && (<CheckCircleIcon className='h-8 w-8 text-green-600' />)}
        </div>
        <div className=''>
          <Input
            className='w-32 text-sm md:text-sm font-semibold'
            placeholder='Comp Name'
            value={compName}
            onChange={(e) => setCompName(e.target.value)}
          />
        </div>

        <Popover >
          <PopoverTrigger asChild>
            <Button
              className={cn(
                'w-[230px] col-span-2 justify-start text-left border-0 border-b border-gray-400 text-gray-200 rounded-none',
                !date && 'text-gray-600'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-3 z-10 bg-black text-gray-200'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={(e) => {
                const a = add(e, { hours: 8, })
                setDate(a)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
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
    </>
  )
}

export default CompDate
