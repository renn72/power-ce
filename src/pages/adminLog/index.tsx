import { useSession } from 'next-auth/react'
import { api } from '~/utils/api'
import { type Log } from '@prisma/client'

import { getDateShort, getTime24 as getTime } from '~/utils/utils'

const Log = ({ log }: { log: Log }) => {
  const request = JSON.parse(log?.request)
  const response = JSON.parse(log?.response)
  console.log(request)
  return (
    <div className='flex gap-1 border-b border-gray-700'>
      <div>{getTime(log.createdAt)},</div>
      <div>{getDateShort(log.createdAt)}</div>
      <div>
        {response?.firstName}
        {` `}
        {response?.lastName}
      </div>
      <div>{log?.url.slice(8, 28)}{log?.url.length > 28 ? '...' : ''}</div>
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
      <div className='flex w-full flex-col'>
        {log?.map((l) => (
          <div key={l.id}>
            {l.userId === 'david' ||
            l.location === 'settings' ||
            l.location === 'settings_user' ||
            l.userId === 'mitch' ? null : (
              <Log log={l} />
            )}
          </div>
        ))}
      </div>
    </>
  )
}
export default AdminLog
