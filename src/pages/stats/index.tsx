import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '~/utils/api'

import { useUser } from '@clerk/nextjs'

import { LoadingPage } from '~/components/loading'
import UserSelect from './userSelect'

import ResizableBox from './ResizableBox'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

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

  const squats = sets?.filter((set) => set.lift === 'squat')

  console.log('squats', squats)

  if (!squats || squats.length < 1) return null

  const data = {
    labels: squats?.map((set) => set?.createdAt.toString().slice(0, 10)),
    datasets: [
      {
        label: 'Squat 6reps',
        data: squats?.filter((set) => set.rep == 6).map((set) => +set?.weight),
        backgroundColor: 'rgb(205, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      // {
      //   label: 'Squat 8reps',
      //   data: squats?.filter((set) => set.rep == 8).map((set) => +set?.weight),
      //   backgroundColor: 'rgb(205, 99, 132)',
      //   borderColor: 'rgba(255, 99, 132, 0.2)',
      // },
      {
        label: 'Squat 1rm',
        data: squats?.filter((set) => set.rep == 6).map((set) => +set?.estiamtedOnerm),
        backgroundColor: 'rgb(50, 205, 50, 0.8)',
        borderColor: 'rgba(50, 205, 50, 0.2)',
      },
    ],
  }

  return (
    <div>
      <ResizableBox>
        <Line
          data={data}
          options={options}
        />
      </ResizableBox>
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
      <ChartComponent user={'user_2UhBMdOLkQUazMBwmEWw0g6DQ1v'} />
    </div>
  )
}

export default Stats
