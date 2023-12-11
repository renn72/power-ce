import { api } from '~/utils/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

import { Decimal } from 'decimal.js'

const Height = ({
  height,
  userId,
}: {
  height: Decimal | number
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(height) == 0 ? undefined : Number(height),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateHeight.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })
      if (!previousData) return

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          height: new Decimal(newData.height),
        },
      )

      return { previousData }
    },
    onError: (err, _newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-2xl'>Height</h4>
        <p className='h-8 text-xl text-gray-400'>
          {Number(height || null)}cm
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
              mutate({ userId: userId, height: value })
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

export default Height
