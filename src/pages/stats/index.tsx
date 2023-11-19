import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

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
  scales: {
    y: {
      min: 100,
      max: 400,
    },
  },
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
    labels: squats?.map((set) => set?.createdAt.toString().slice(0, 8)),
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
        data: squats
          ?.filter((set) => set.rep == 6)
          .map((set) => +set?.estiamtedOnerm),
        backgroundColor: 'rgb(50, 205, 50, 0.8)',
        borderColor: 'rgba(50, 205, 50, 0.2)',
      },
    ],
  }

  return (
    <div className='h-full w-full'>
      <Line
        data={data}
        options={options}
      />
    </div>
  )
}

const me = 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a'

const Stats = () => {
  const { data: session } = useSession()
  const currentUser = session?.user

  const [user, setUser] = useState<string>(() => currentUser?.id || '')

  console.log('user', user)

  const { data: sets, isLoading: setsLoading } =
    api.blocks.getUserActiveSets.useQuery({
      userId: user,
    })

  const { data: allLifts, isLoading: allLiftsLoading } =
    api.primaryLifts.getAll.useQuery()

  const { data: userOneRepMax, isLoading: userOneRepMaxLoading } =
    api.oneRepMax.getUserCoreLifts.useQuery({
      userId: user,
    })

  // const tryFetch = async () => {
  //   const res = await fetch(
  //     'https://www.openpowerlifting.org/api/liftercsv/mitchlee1.csv',
  //   )
  //   const data = await res.text()
  //   console.log('data', data)
  // }

  const onSelectUser = (userId: string) => {
    setUser(userId)
  }

  console.log('sets', sets)
  console.log('allLifts', allLifts)

  const userLifts = userOneRepMax?.map((lift) => lift.lift)
  console.log('userOneRepMax', userOneRepMax)

  if (setsLoading || allLiftsLoading || userOneRepMaxLoading) return <LoadingPage />

  if (!sets || !allLifts || !userOneRepMax) return null

  return (
    <div>
      <div>
        <h1>Stats</h1>
        {currentUser?.id === me && <UserSelect onSelectUser={onSelectUser} />}
      </div>
      <div>
        {allLifts.filter((l) => userLifts?.includes(l.name)).map((lift) => (
          <div key={lift.id}>
            <h1>{lift.name}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats
