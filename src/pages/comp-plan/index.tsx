import { useSession } from 'next-auth/react'
import CompPlan from '~/components/compPlan'

const Comp = () => {
  const { data: session } = useSession()
  const user = session?.user

  if (!user) return null

  return (
  <>
      <CompPlan userId={user.id || ''} />
  </>
  )
}

export default Comp
