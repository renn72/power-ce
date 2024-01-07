import { api } from '~/utils/api'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ModalWrapper from '~/components/settings/modalWrapper'

const Delete = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const utils = api.useContext()
  const { mutate } = api.users.delete.useMutation({
    onSuccess: () => {
      void utils.users.getAllUsers.invalidate()
      void utils.users.getAllUsersProfiles.invalidate()
    },
  })

  return (
    <div className='mt-10'>
      <Button
        size='lg'
        variant='secondary'
        className='w-full hover:bg-red-600 hover:text-gray-900 '
        onClick={() => setIsOpen(true)}
      >
        Delete User
      </Button>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='my-10 flex justify-center gap-2'>
          <Button
            className='h-fit w-28 bg-yellow-400 text-lg font-bold text-gray-900'
            onClick={() => {
              setIsOpen(false)
              mutate({
                userId: userId,
              })
            }}
          >
            Confirm
          </Button>
          <Button
            className='h-fit w-28 bg-yellow-400 text-lg font-bold text-gray-900'
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

export default Delete
