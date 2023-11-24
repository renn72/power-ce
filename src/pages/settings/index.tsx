import { useSession } from 'next-auth/react'

import Settings from '~/components/settings'

const SettingsPage = () => {
  const { data: session } = useSession()
  const userId = session?.user.id || ''

  return (
    <>
      <Settings userId={userId} />
    </>
  )
}
export default SettingsPage
