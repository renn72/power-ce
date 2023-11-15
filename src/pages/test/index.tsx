import React, { useState } from 'react'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

const Users = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [userId, setUserId] = useState<string>(user?.id || 'all')

  const ctx = api.useContext()

  const { data: allUsers } = api.users.getAllUsers.useQuery()

  console.log('all users', allUsers)

  return (
    <>
      <main className='flex h-full flex-col items-center justify-center gap-8 py-6 sm:px-2 md:mt-6 '>
        blah
      </main>
    </>
  )
}

export default Users
