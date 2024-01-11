import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { type Log } from '@prisma/client'

import { getDateShort, getTime24 as getTime } from '~/utils/utils'

const Log = ({ log }: { log: Log }) => {
  const request = JSON.parse(log?.request)
  console.log(request)
  return (
    <div className='flex gap-1'>
      <div>{getTime(log.createdAt)},</div>
      <div>{getDateShort(log.createdAt)}</div>
      <div>{log.url}</div>
      <div>{log.userId}</div>
      <div>{log.location}</div>
      <div>{log.action}</div>
      <div>{request?.['x-real-ip']}</div>
    </div>
  )
}

const AdminLog = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''
  const ctx = api.useUtils()
  const user = ctx.users.get.getData({ userId: userId, location: 'base' })

  const { data: log, isLoading: logLoading } = api.adminLog.getAll.useQuery()

  if (!user?.isRoot) {
    return (
      <>
        <h1>Access Denied</h1>
      </>
    )
  }

  if (logLoading) return <h1>Loading...</h1>

  return (
    <>
      <h1>AdminLog</h1>
      <div className='flex flex-col divide-y divide-gray-400'>
        {log?.map((l) => (
          <>
            {l.userId === 'david' ? null : (
              <Log
                key={l.id}
                log={l}
              />
            )}
          </>
        ))}
      </div>
    </>
  )
}

export default AdminLog
