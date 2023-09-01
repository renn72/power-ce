import { Button, } from '@/components/ui/button'
import { Input, } from '@/components/ui/input'
import { type NextPage, } from 'next'
import { useState, } from 'react'
import { toast, } from 'react-hot-toast'
import { LoadingPage, } from '~/components/loading'
import { api, } from '~/utils/api'
import { defaultLifts, } from '~/store/defaultValues'

const PrimaryLifts: NextPage = () => {
  const [
    value,
    setValue,
  ] = useState('')

  const {
    data: primaryLifts, isLoading: primaryLiftsLoading,
  } = api.primaryLifts.getAll.useQuery()

  const ctx = api.useContext()

  const { mutate: addPrimaryLift, } = api.primaryLifts.create.useMutation({
    onSuccess: () => {
      toast.success('Primary Lift Added')
      void ctx.primaryLifts.getAll.invalidate()

    },
    onError: () => {
      toast.error('Error, Must be unique')
    },
  })

  const { mutate: deletePrimaryLift, } = api.primaryLifts.delete.useMutation({
    onSuccess: () => {
      toast.success('Primary Lift Deleted')
      void ctx.primaryLifts.getAll.invalidate()
    },
    onError: () => {
      toast.error('Error')
    },
  })

  if (primaryLiftsLoading) return <LoadingPage />

  console.log('primaryLifts', primaryLifts)

  const onAdd = () => {
    console.log('onAdd')
    if (!value || value == '') return
    addPrimaryLift({ name: value.trim().toLowerCase(), })
    setValue('')
  }

  const onDelete = (id: string) => {
    console.log('onDelete', id)
    deletePrimaryLift({ id, })
  }

  const onGenerate = () => {
    console.log('onGenerate')
    defaultLifts.forEach((lift) => {
      addPrimaryLift({ name: lift, })
    })

  }

  return (
    <>
      <div
        className='h-full flex flex-col gap-8 max-w-lg my-10 mx-auto font-medium px-2 tracking-wider'
      >
        <div className='flex gap-4'>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <Button onClick={onAdd}>
            Add
          </Button>
        </div>

        <div
          className='flex flex-col gap-4'
        >
          {
            primaryLifts
            && primaryLifts.map((primaryLift) => (
              <div key={primaryLift.id}
                className='flex justify-between items-center gap-8'
              >
                <div
                  className='capitalize text-2xl'
                >{primaryLift.name}</div>
                  {
                    !defaultLifts.includes(primaryLift.name) &&
                    (

                <div
                  className='text-xl font-bold cursor-pointer'
                  onClick={() => onDelete(primaryLift.id)}
                >
                  X
                </div>
                    )
                  }
              </div>
            ))
          }
        </div>
        <Button
          className='w-24 hidden'
          onClick={onGenerate}
        >
          Generate
        </Button>
      </div>
    </>
  )
}

export default PrimaryLifts
