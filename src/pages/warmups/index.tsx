import { useForm, useFieldArray } from 'react-hook-form'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { toast } from 'react-hot-toast'

import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DotIcon } from 'lucide-react'

import { type WarmupTemplate } from '~/store/types'

export const defaultValues = {
  name: '',
  warmups: [
    {
      notes: '',
      name: '',
      link: '',
    },
  ],
}

const Warmups = () => {
  const formMethods = useForm({ defaultValues })
  const {
    watch,
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const warmupsField = useFieldArray({
    control,
    name: `warmups`,
  })

  const { mutate: createWarmup } = api.warmups.create.useMutation({
    onSuccess: () => {
      toast.success('Warmup created')
      reset(defaultValues)
    },
  })

  const { data: allWarmups } = api.warmups.getAll.useQuery()

  const onSubmit = (data: WarmupTemplate) => {
    console.log(data)
    createWarmup(data)
  }
  const [parent] = useAutoAnimate(/* optional config */)
  return (
    <div className='mx-1 lg:mx-6 flex flex-col gap-4 mb-20'>
      <h1>Warmups</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col '
      >
        <div
          ref={parent}
          className='flex lg:w-fit flex-col gap-1 sm:gap-8 mb-4'
        >
          <Input
            className='w-60'
            placeholder='Title'
            defaultValue={''}
            {...register('name', { required: 'Name is required' })}
          />
          <div className='flex flex-col gap-8  mb-6'>
          {warmupsField.fields.map((item, index) => (
            <div
              key={item.id}
              className='flex items-center justify-between w-full lg:gap-6'
            >
              <DotIcon className='h-6 w-6 text-gray-400' />
              <div className='flex flex-col gap-1'>
                <Input
                  placeholder='Name'
                  defaultValue={''}
                  {...register(`warmups.${index}.name`)}
                  className='w-68'
                />
                <Input
                  placeholder='Warmup'
                  defaultValue={''}
                  {...register(`warmups.${index}.notes`)}
                  className='w-auto min-w-[200px] max-w-[90vw]'
                  size={
                    watch(`warmups.${index}.notes`).length > 30
                      ? watch(`warmups.${index}.notes`).length / 1.7
                      : 17
                  }
                />
                <Input
                  placeholder='Link'
                  defaultValue={''}
                  {...register(`warmups.${index}.link`)}
                  className='w-68'
                />
              </div>
              <XMarkIcon
                className='h-6 w-6 shrink-0 cursor-pointer text-gray-400 hover:text-white'
                onClick={() => warmupsField.remove(index)}
              />
            </div>
          ))}

          </div>
          <PlusIcon
            className='h-6 w-full cursor-pointer text-center text-gray-400 hover:text-white'
            onClick={() =>
              warmupsField.append({ name: '', notes: '', link: '' })
            }
          />
        </div>
        <Button
          className='w-28'
          type='submit'
        >
          Save
        </Button>
      </form>
      <div className='flex flex-col gap-8 mt-8 '>
        {allWarmups?.map((warmup) => (
          <div
            key={warmup.id}
            className='flex flex-col gap-1'
          >
            <h1 className='capitalize text-lg font-semibold'>{warmup.name}</h1>
            <div className='ml-2 flex flex-col gap-2 '>
              {warmup.warmups.map((warmup) => (
                <div
                  key={warmup.id}
                  className='flex flex-col gap-0'
                >
                  <h2 className='capitalize font-semibold'>{warmup.name}</h2>
                  <p className='text-sm font-light text-gray-400'>{warmup.notes}</p>
                  <a
                    href={warmup.link}
                    target='_blank'
                    rel='noreferrer'
                    className='text-sm text-gray-400'
                  >
                    {warmup.link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Warmups
