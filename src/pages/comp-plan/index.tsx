import { useSession } from 'next-auth/react'
import { useState } from 'react'
import CompPlan from '~/components/compPlan'
import UserSelect from './userSelect'

import { api } from '~/utils/api'

const Comp = () => {
  const { data: session } = useSession()
  const currentUserId = session?.user?.id || ''
  const { data: user } = api.users.get.useQuery({ userId: currentUserId })
  const isAdmin = user?.isAdmin
  const [userId, setUserId] = useState(currentUserId)

  if (!user) return null

  return (
    <>
      {isAdmin && (
        <div className='flex justify-around p-1 max-w-lg'>
          <div className='py-3 text-lg font-semibold'>User:</div>
          <div className='pt-1'>
            <UserSelect
              userId={userId}
              onSelectUser={setUserId}
            />
          </div>
        </div>
      )}
      <CompPlan
        userId={userId}
        isAdmin={false}
      />
    </>
  )
}

export default Comp
