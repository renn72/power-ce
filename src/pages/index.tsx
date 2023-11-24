import { type NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { api } from '~/utils/api'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoadingPage, LoadingSpinner } from '~/components/loading'

import { getDate } from '~/utils/utils'
import { Cog8ToothIcon } from '@heroicons/react/20/solid'

const Lift = ({ lift, userId }: { lift: string; userId: string }) => {
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  api.users.getAllUsers.useQuery()
  const { data: programs } = api.blocks.getAllUserProgramsTitles.useQuery({
    userId: userId,
  })
  api.blocks.get.useQuery({
    id: programs?.find((p) => p.isProgramActive === true)?.id || '',
  })
  const { data: allSets, isLoading: allSetsLoading } =
    api.sets.getAllUser.useQuery({ userId: userId })

  const estOnerm = allSets
    ?.filter((s) => s.lift === lift)
    .map((s) => ({
      estiamtedOnerm: Number(s.estiamtedOnerm),
      flield1: s.flield1 || '',
    }))
    .reduce(
      (a, s) => {
        if (a.estimatedOnerm < s.estiamtedOnerm) {
          a.estimatedOnerm = s.estiamtedOnerm
          a.flield1 = s.flield1
        }
        return { ...a }
      },
      { estimatedOnerm: 0.0, flield1: '' },
    )

  if (allSetsLoading) return <LoadingSpinner />

  return (
    <>
      <div className='flex flex-col gap-0'>
        <div className='text-xl capitalize text-yellow-500'>{lift}</div>
        <div className='flex gap-2'>
          <div> Estiamted 1rm:</div>
          <div className={`${estOnerm?.estimatedOnerm == 0 ? 'hidden' : ''}`}>
            {estOnerm?.estimatedOnerm}kg
          </div>
        </div>
        <div className='text-sm text-gray-400'>
          {getDate(estOnerm?.flield1 || '')}
        </div>
      </div>
    </>
  )
}

const Home: NextPage = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id || ''

  const { data: user } = api.users.get.useQuery({ userId: userId })

  // const userId = user?.id || ''
  // const userId = 'user_2UhBMdOLkQUazMBwmEWw0g6DQ1v' //sam
  // const userId = 'user_2Uj759BY4rnQ8r4KGafyBcT1fuD' //alex
  // const userId = 'user_2UjZi8dZQQcmxhViIek8PUVjKp7' //ben
  // const userId = 'user_2UmhNpWstVwbKlK0D3U9Zud4N43' //jayne
  // const userId = 'user_2VPVPXid6tM9U1s5f6iodw5CoJv' //mary
  // const userId = 'user_2VVN8mlFa7kbApqE1EYRYja62xS' //rachel
  // const userId = 'user_2VxyYAeq0glZAPQM2OpTQRbXKxZ' //byung
  // const userId = 'user_2WeOskMzYGguohYuGjW2LCuaYOh' //leroy
  // const userId = 'user_2RB3u3X0pKDxnvmHraPW3RfwrAv' //mitch
  // const userId = 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a' //me

  const ctx = api.useContext()

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  const { data: addressData, isLoading: addressDataLoading } =
    api.compLift.getAddress.useQuery({
      userId: userId,
    })
  const { isLoading: allSetsLoading } = api.sets.getAllUser.useQuery({
    userId: userId,
  })
  const { data: compLifts, isLoading: compLiftsLoading } =
    api.compLift.getCompLifts.useQuery({
      userId: userId,
    })
  const { data: currentProgram, isLoading: programLoading } =
    api.blocks.getUserActiveProgramFull.useQuery({ userId: userId })

  const { mutate: setOpenPowerliftingData } =
    api.compLift.setOpenPower.useMutation({
      onSuccess: (data) => {
        console.log(data)
        void ctx.compLift.getCompLifts.invalidate({ userId: userId })
      },
    })

  const { mutate: saveAddress } = api.compLift.createAddress.useMutation({
    onSuccess: () => {
      toast.success('saved')
      console.log('success')
    },
  })

  const defaultOpen = currentProgram?.week.reduce((acc, week) => {
    week.day.forEach((day) => {
      if (!day.isComplete && acc === '' && !day.isRestDay) {
        acc = day.id
      }
    })
    return acc
  }, '')

  const lastFinished = currentProgram?.week.reduce((acc, week) => {
    week.day.forEach((day) => {
      if (day.isComplete) acc = day.id
    })
    return acc
  }, '')

  const [address, setAddress] = useState(addressData?.address || '')
  useEffect(() => {
    setAddress(addressData?.address || '')
  }, [addressData])

  if (
    addressDataLoading ||
    allSetsLoading ||
    compLiftsLoading ||
    programLoading
  ) {
    return <LoadingPage />
  }

  // const bmr =
  //   66 +
  //   13.7 * (Number(userSettings?.weight) || 0) +
  //   (5 * Number(userSettings?.height) || 0) -
  //   (6.8 *
  //     (new Date().getFullYear() -
  //       new Date(userSettings?.DOB || '').getFullYear()) || 0)
  //
  // const caloriesTraining =
  //   bmr *
  //   (!userSettings?.activityLevelTraining
  //     ? 1.2
  //     : userSettings?.activityLevelTraining === 'sedentary'
  //     ? 1.2
  //     : userSettings?.activityLevelTraining === 'mild'
  //     ? 1.375
  //     : userSettings?.activityLevelTraining === 'moderate'
  //     ? 1.55
  //     : userSettings?.activityLevelTraining === 'heavy'
  //     ? 1.7
  //     : userSettings?.activityLevelTraining === 'extreme'
  //     ? 1.9
  //     : 1.2)
  //
  // const protein = (Number(userSettings?.weight) || 0) * 2
  // const fat =
  //   (Number(userSettings?.weight) || 0) *
  //   (userSettings?.gender === 'female'
  //     ? 0.4
  //     : userSettings?.weightGoal === 'weight loss'
  //     ? 0.7
  //     : userSettings?.weightGoal === 'weight gain'
  //     ? 1
  //     : 0.8)
  // const carbsTraining = (caloriesTraining - protein * 4 - fat * 9) / 4
  //
  // const caloriesRest =
  //   bmr *
  //   (!userSettings?.activityLevelRest
  //     ? 1.2
  //     : userSettings?.activityLevelRest === 'sedentary'
  //     ? 1.2
  //     : userSettings?.activityLevelRest === 'mild'
  //     ? 1.375
  //     : userSettings?.activityLevelRest === 'moderate'
  //     ? 1.55
  //     : userSettings?.activityLevelRest === 'heavy'
  //     ? 1.7
  //     : userSettings?.activityLevelRest === 'extreme'
  //     ? 1.9
  //     : 1.2)
  //
  // const carbsRest = (caloriesRest - protein * 4 - fat * 9) / 4

  return (
    <>
      <main className='flex h-full flex-col gap-6 px-2  font-semibold'>
        <div className='flex  flex-col gap-4 lg:items-start '>
          <div className='flex  w-full flex-col gap-1 lg:items-start '>
            <div className='flex w-full items-center justify-between'>
              <h1 className='text-2xl'>Profile</h1>
              <Link href='/settings'>
                <Cog8ToothIcon className='h-6 w-6 text-yellow-400' />
              </Link>
            </div>
            <div className='flex flex-col gap-0 text-sm text-gray-400'></div>
            <div className='flex gap-1 text-xl'>
              <div>{user?.firstName}</div>
              <div>{user?.lastName}</div>
            </div>
          </div>
          {currentProgram && defaultOpen && (
            <Link href={`/day/${currentProgram.id}/${defaultOpen}`}>
              <Button className='h-8 w-36 rounded bg-yellow-400 p-0 font-bold text-gray-900 hover:bg-yellow-500'>
                Current Program
              </Button>
            </Link>
          )}
        </div>
        <div className='flex flex-col gap-4'>
          <Lift
            lift='squat'
            userId={userId}
          />
          <Lift
            lift='deadlift'
            userId={userId}
          />
          <Lift
            lift='bench'
            userId={userId}
          />
        </div>
        <div className='text-xl capitalize text-yellow-500'>Competitions</div>
        <div className='flex max-w-[800px] flex-col gap-0 space-y-2 divide-y divide-dashed divide-gray-400'>
          {compLifts?.map((comp) => (
            <div
              key={comp.id}
              className='flex flex-col gap-1 pt-2'
            >
              <div className='flex flex-col gap-0'>
                <div className='flex flex-col  gap-0 text-lg'>
                  <div className='capitalize  text-yellow-500'>
                    {comp.MeetName}
                  </div>
                  <div className='capitalize'>{comp.Federation}</div>
                </div>
                <div className='text-sm text-gray-400'>{comp.Date}</div>
              </div>
              <div className=''>
                Squat: {` `}
                {Math.max(
                  Number(comp.Squat1),
                  Number(comp.Squat2),
                  Number(comp.Squat3),
                  Number(comp.Squat4),
                )}
                kg
              </div>
              <div className=''>
                Bench: {` `}
                {Math.max(
                  Number(comp.Bench1),
                  Number(comp.Bench2),
                  Number(comp.Bench3),
                  Number(comp.Bench4),
                )}
                kg
              </div>
              <div className=''>
                Deadlift: {` `}
                {Math.max(
                  Number(comp.Deadlift1),
                  Number(comp.Deadlift2),
                  Number(comp.Deadlift3),
                  Number(comp.Deadlift4),
                )}
                kg
              </div>
              <div className=''>Total: {comp.Total}kg</div>
            </div>
          ))}
        </div>

        <div className='w-fit'>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='mb-4 min-w-[320px] max-w-[90vw]'
            size={address.length / 1.7}
            placeholder='Open Powerlifting Address'
          />
          <div className='flex items-center gap-4'>
            <Button
              className='rounded bg-yellow-400 px-4 py-2 font-bold text-gray-900 hover:bg-yellow-500'
              onClick={() => saveAddress({ userId: userId, address: address })}
            >
              Save
            </Button>
          </div>
        </div>
        <div className='hidden'>
          <Button onClick={() => setOpenPowerliftingData({ userId: userId })}>
            Set Open Powerlifting Data
          </Button>
        </div>
      </main>
    </>
  )
}

export default Home
