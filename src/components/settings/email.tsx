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
        <h4 className='text-2xl'>Email</h4>
        <p className='h-8 text-xl text-gray-400'>
          {name == '' ? '...' : name}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          placeholder='email'
          className='bg-gray-900 text-xl tracking-tighter'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            className='bg-yellow-400 text-gray-900 text-lg h-fit w-28 font-bold'
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, email: value })
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

export default Email
