import { api } from '~/utils/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { useState } from 'react'

import ModalWrapper from '~/components/settings/modalWrapper'

const FirstName = ({ name, userId }: { name: string; userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(name)
  const utils = api.useContext()
  const { mutate } = api.settings.updateFirstName.useMutation({
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
        {name == '' ? (
          <h4 className='text-2xl font-semibold text-yellow-500'>
            First Name <span className='font-sm'>*</span>
          </h4>
        ) : (
          <h4 className='text-2xl'>First Name</h4>
        )}
        <p className='h-8 text-xl text-gray-400'>{name == '' ? '...' : name}</p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          placeholder='Height'
          className='bg-gray-900 text-xl'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, firstName: value })
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

export default FirstName
