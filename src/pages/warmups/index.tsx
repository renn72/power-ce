import { useForm, useFieldArray } from 'react-hook-form'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DotIcon, UndoDotIcon } from 'lucide-react'

export const defaultValues = {
  name: '',
  warmups: [
    {
      warmup: '',
    },
  ],
}

const Warmups = () => {
  const formMethods = useForm({ defaultValues })
  const {
    getValues,
    watch,
    register,
    reset,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = formMethods

  const warmupsField = useFieldArray({
    control,
    name: `warmups`,
  })

  const onSubmit = (data: any) => {
    console.log(data)
  }
  const [parent] = useAutoAnimate(/* optional config */)
  return (
    <div className='mx-4 flex flex-col gap-4'>
      <h1>Warmups</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col '
      >
        <div
          ref={parent}
          className='flex w-fit flex-col gap-1 sm:gap-8'
        >
          <Input
            className='w-60'
            placeholder='Name'
            defaultValue={''}
            {...register('name', { required: 'Name is required' })}
          />
          {warmupsField.fields.map((item, index) => (
            <div
              key={item.id}
              className='flex items-center lg:gap-6'
            >
              <DotIcon className='h-6 w-6 text-gray-400' />
              <Input
                placeholder='Warmup'
                defaultValue={''}
                {...register(`warmups.${index}.warmup`)}
                className='min-w-[200px] max-w-[90vw] font-mono'
                size={watch(`warmups.${index}.warmup`).length / 1}
              />
              <XMarkIcon
                className='h-6 w-6 cursor-pointer text-gray-400 hover:text-white'
                onClick={() => warmupsField.remove(index)}
              />
            </div>
          ))}
          <PlusIcon
            className='h-6 w-full cursor-pointer text-center text-gray-400 hover:text-white'
            onClick={() => warmupsField.append({ warmup: '' })}
          />
        </div>
        <Button
          className='w-28'
          type='submit'
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default Warmups
