import { api } from '~/utils/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Decimal } from 'decimal.js'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

const TargetWeight = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateTargetWeight.useMutation({
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
          targetWeight: new Decimal(newData.targetWeight),
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
        <h4 className='text-xl'>Target Weight</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue || null)}kg
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
              mutate({ userId: userId, targetWeight: value })
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

export default TargetWeight
