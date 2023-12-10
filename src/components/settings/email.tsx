import { api } from '~/utils/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

const Email = ({ name, userId }: { name: string; userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(name)
  const utils = api.useContext()
  const { mutate } = api.settings.updateEmail.useMutation({
    onSuccess: () => {
      void utils.users.get.invalidate({ userId: userId })
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Email</h4>
        <p className='h-8 text-base text-gray-400'>
          {name == '' ? '...' : name}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, email: value })
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

export default Email
