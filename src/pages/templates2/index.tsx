import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

import ProgramDisplay from '~/components/programDisplay'

const Templates2 = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, location: 'base' })
  const { data: activeProgram } = api.blocks.getUserActiveProgram.useQuery({
    userId: userId,
  })
  return (
    <div className='w-full'>
      <ProgramDisplay
        userId={userId}
        isAdmin={true}
        programId={activeProgram?.id || ''}
      />
    </div>
  )
}

export default Templates2
