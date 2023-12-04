import { api } from "~/utils/api"
import { LoadingPage } from "./loading"

const CompPlan = ({ userId }: { userId: string }) => {
  const { data: plan, isLoading: planLoading} = api.plans.get.useQuery({ userId: userId })

  console.log('plan', plan)

  if (planLoading) return <LoadingPage />
  if (!plan) return null
  return <div>plan</div>
}

export default CompPlan
