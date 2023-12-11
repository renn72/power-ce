
import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Decimal } from 'decimal.js'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

const SquatOneRM = ({
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
  const { mutate } = api.settings.updateSquatOneRepMax.useMutation({
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
          squatOneRepMax: new Decimal(newData.squatOneRepMax),
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
        <h4 className='text-2xl'>Squat</h4>
        <p className='h-8 text-xl text-gray-400'>
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
          className='bg-gray-900 text-2xl'
          value={value}
          onChange={(e) => {
            setValue(+e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            className='bg-yellow-400 text-gray-900 text-lg h-fit w-28 font-bold'
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', squatOneRepMax: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            className='bg-yellow-400 text-gray-900 text-lg h-fit w-28 font-bold'
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

export default SquatOneRM
