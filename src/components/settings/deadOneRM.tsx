import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Decimal } from 'decimal.js'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

const DeadOneRM = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateDeadliftOneRepMax.useMutation({
    onMutate: async (newData) => {
      if (!user) return
      await utils.settings.get.cancel({ userId: user.id })
      const previousData = utils.settings.get.getData({
        userId: user.id,
      })

      if (!previousData) return

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          deadliftOneRepMax: new Decimal(newData.deadliftOneRepMax),
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
        className='w-fit cursor-pointer pr-8 flex flex-col items-center'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Deadlift</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue) == 0 ? '.' : `${Number(defaultValue)}kg`}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          type='number'
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(+e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', deadliftOneRepMax: value })
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

export default DeadOneRM
