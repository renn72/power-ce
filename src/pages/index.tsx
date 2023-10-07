import { type NextPage } from 'next'

import { api } from '~/utils/api'

import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoadingPage } from '~/components/loading'

import { getDate } from '~/utils/utils'

const Lift = ({ lift, userId }: { lift: string; userId: string }) => {
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  api.users.getAllUsers.useQuery()
  const { data: programs } = api.blocks.getAllUserProgramsTitles.useQuery({
    userId: userId,
  })
  api.blocks.get.useQuery({
    id: programs?.find((p) => p.isProgramActive === true)?.id || '',
  })
  const { data: addressData, isLoading: addressDataLoading } =
    api.compLift.getAddress.useQuery({
      userId: userId,
    })
  const { data: allSets, isLoading: allSetsLoading } =
    api.sets.getAllUser.useQuery({ userId: userId })

  const estiamtedOnerm = Number(
    allSets
      ?.filter((s) => s.lift === lift)
      .reduce(
        (a, s) => (Number(a.estiamtedOnerm) < Number(s.estiamtedOnerm) ? s : a),
        { estiamtedOnerm: 0 },
      ).estiamtedOnerm,
  )

  const estiamtedOnermDate = allSets
    ?.filter((s) => s.lift === lift)
    .reduce(
      (a, s) => (Number(a.estiamtedOnerm) < Number(s.estiamtedOnerm) ? s : a),
      { estiamtedOnerm: 0 },
    ).flield1

  return (
    <>
      <div className='flex items-center gap-4'>
        <div className='capitalize'>{lift}</div>
        <div> Estiamted 1rm:</div>
        <div>{estiamtedOnerm}kg</div>
        <div>{getDate(estiamtedOnermDate || '')}</div>
      </div>
    </>
  )
}

const Home: NextPage = () => {
  const { user } = useUser()

  // const userId = user?.id || ''
  const userId = 'user_2UhBMdOLkQUazMBwmEWw0g6DQ1v'

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  api.users.getAllUsers.useQuery()
  const { data: programs } = api.blocks.getAllUserProgramsTitles.useQuery({
    userId: userId,
  })
  api.blocks.get.useQuery({
    id: programs?.find((p) => p.isProgramActive === true)?.id || '',
  })
  const { data: addressData, isLoading: addressDataLoading } =
    api.compLift.getAddress.useQuery({
      userId: userId,
    })
  const { data: allSets, isLoading: allSetsLoading } =
    api.sets.getAllUser.useQuery({ userId: userId })
  const { data: compLifts, isLoading: compLiftsLoading } =
    api.compLift.getCompLifts.useQuery({
      userId: userId,
    })
  console.log({ compLifts })

  const { mutate: getOpenPowerliftingData } =
    api.compLift.setOpenPower.useMutation({
      onSuccess: (data) => {
        console.log(data)
      },
    })

  const { mutate: saveAddress } = api.compLift.createAddress.useMutation({
    onSuccess: () => {
      toast.success('saved')
      console.log('success')
    },
  })

  const [address, setAddress] = useState(addressData?.address || '')
  useEffect(() => {
    setAddress(addressData?.address || '')
  }, [addressData])

  if (addressDataLoading || allSetsLoading || compLiftsLoading)
    return <LoadingPage />

  return (
    <>
      <main className='flex h-full flex-col gap-6 px-2  font-semibold'>
        <div className='flex items-center justify-between '>
          <h1 className='text-xl'>Profile</h1>
          <Link href='/program'>
            <Button className='rounded bg-yellow-400 px-4 py-2 font-bold text-gray-900 hover:bg-yellow-500'>
              Program
            </Button>
          </Link>
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
        <div className='flex flex-col gap-4'>
          {compLifts?.map((comp) => (
            <div
              key={comp.id}
              className='flex flex-col gap-2'
            >
              <div className='flex gap-2'>
                <div className='capitalize'>{comp.Federation}</div>
                <div className='capitalize'>{comp.MeetName}</div>
                <div className=''>{comp.Date}</div>
              </div>
              <div className=''>
                Squat: {` `}
                {
                  Math.max(Number(comp.Squat1), Number(comp.Squat2), Number(comp.Squat3), Number(comp.Squat4))
                }kg
              </div>
              <div className=''>
                Bench: {` `}
                {
                  Math.max(Number(comp.Bench1), Number(comp.Bench2), Number(comp.Bench3), Number(comp.Bench4))
                }kg
              </div>
              <div className=''>
                Deadlift: {` `}
                {
                  Math.max(Number(comp.Deadlift1), Number(comp.Deadlift2), Number(comp.Deadlift3), Number(comp.Deadlift4))
                }kg
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
            <Button className='rounded bg-yellow-400 px-4 py-2 font-bold text-gray-900 hover:bg-yellow-500'>
              Refresh
            </Button>
          </div>
        </div>
        <div>
          <Button onClick={() => getOpenPowerliftingData({ userId: userId })}>
            Get Open Powerlifting Data
          </Button>
        </div>
      </main>
    </>
  )
}

export default Home
