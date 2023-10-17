import {
  useForm,
  FormProvider,
  useFieldArray,
  Controller,
} from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, add } from 'date-fns'

import { useUser, clerkClient } from '@clerk/nextjs'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Settings = () => {
  const { user } = useUser()

  const formMethods = useForm()
  const {
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const onError = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <FormProvider {...formMethods}>
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className='flex flex-col gap-4'
            >
              <Input
                placeholder='Height'
                {...register('height')}
                defaultValue={''}
              />
              <Input
                placeholder='Weight'
                {...register('weight')}
                defaultValue={''}
              />
              <Controller
                control={control}
                name='dob'
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                  <div className='flex items-end justify-between gap-2 md:justify-normal md:gap-6'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className={cn(
                            'col-span-2 w-[190px] justify-start rounded-none border-0 border-b border-gray-600 px-1 text-left text-gray-200 hover:border-gray-200 md:w-[230px] md:px-2 ',
                            !value && 'text-gray-600',
                          )}
                        >
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {value ? (
                            format(value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='z-10 w-auto bg-black py-3 text-gray-200 md:px-3'>
                        <Calendar
                          mode='single'
                          selected={value}
                          onSelect={(e) => {
                            onChange(e)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  )
}
export default Settings
