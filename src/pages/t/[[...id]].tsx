import { useRouter } from "next/router"

const T = () => {
  const router = useRouter()
  const { id } = router.query
  return <div>Post: {id}</div>
}

export default T
