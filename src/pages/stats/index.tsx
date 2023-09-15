import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '~/utils/api'

import { useUser } from '@clerk/nextjs'

import { LoadingPage } from '~/components/loading'
import UserSelect from './userSelect'


const ChartComponent = ({ user }: { user: string }) => {
  const { data: programs } = api.blocks.getAllPrograms.useQuery()

  const sets = programs
    ?.filter(
      (program) => program.userIdOfProgram === user && !program.isDeleted,
    )
    .map((program) =>
      program.week.flatMap((week) =>
        week.day.flatMap((day) =>
          day.exercise.flatMap((exercise) => exercise.set),
        ),
      ),
    )
    .flat()
    .filter((set) => set.isComplete)


  return (
    <div>
      try again
    </div>
  )
}

const Stats = () => {
  const { user: currentUser } = useUser()

  const [user, setUser] = useState<string>(() => currentUser?.id || '')

  console.log('user', user)

  const { mutate: getCsv } = api.compLift.getCsv.useMutation({
    onSuccess: (r) => {
      console.log('csv', r)
    },
  })

  const { data: programs, isLoading: programsLoading } =
    api.blocks.getAllPrograms.useQuery()

  const tryFetch = async () => {
    const res = await fetch(
      'https://www.openpowerlifting.org/api/liftercsv/mitchlee1.csv',
    )
    const data = await res.text()
    console.log('data', data)
  }

  const onSelectUser = (userId: string) => {
    setUser(userId)
  }

  console.log(
    'programs',
    programs?.filter((program) => program.userIdOfProgram === user),
  )

  const sets = programs
    ?.filter(
      (program) => program.userIdOfProgram === user && !program.isDeleted,
    )
    .map((program) =>
      program.week.flatMap((week) =>
        week.day.flatMap((day) =>
          day.exercise.flatMap((exercise) => exercise.set),
        ),
      ),
    )
    .flat()
    .filter((set) => set.isComplete)
  console.log('sets', sets)

  if (programsLoading) return <LoadingPage />

  return (
    <div>
      <h1>Stats</h1>
      <UserSelect onSelectUser={onSelectUser} />
      <div className='hidden'>
        <Button onClick={() => getCsv()}>Get CSV</Button>
        <Button onClick={() => tryFetch()}>try fetch</Button>
      </div>
      <ChartComponent user={user} />
    </div>
  )
}

export default Stats
