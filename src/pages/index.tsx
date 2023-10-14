import { type NextPage } from 'next'

import { api } from '~/utils/api'

import { Dialog, Transition } from '@headlessui/react'

import { useUser, clerkClient } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoadingPage, LoadingSpinner } from '~/components/loading'
import CompletedDay from '~/components/completedDay'

import { getDate } from '~/utils/utils'
import { Cog6ToothIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Settings = () => {
  const { user } = useUser()

  console.log(user)
  const [goal1, setGoal1] = useState(
    () => (user?.unsafeMetadata.goal1 as string) || '',
  )
  const [goal2, setGoal2] = useState(
    () => (user?.unsafeMetadata.goal2 as string) || '',
  )
  const [goal3, setGoal3] = useState(
    () => (user?.unsafeMetadata.goal3 as string) || '',
  )

  const onSetGoals = async () => {
    if (!user) return null
    await user.update({
      unsafeMetadata: {
        goal1: goal1,
        goal2: goal2,
        goal3: goal3,
      },
    })
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h3>Goals</h3>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-1'>
              <Input
                value={goal1}
                onChange={(e) => setGoal1(e.target.value)}
                placeholder='Goal 1'
              />
            </div>
            <div className='flex items-center gap-1'>
              <Input
                value={goal2}
                onChange={(e) => setGoal2(e.target.value)}
                placeholder='Goal 2'
              />
            </div>
            <div className='flex items-center gap-1'>
              <Input
                value={goal3}
                onChange={(e) => setGoal3(e.target.value)}
                placeholder='Goal 1'
              />
            </div>
            <Button onClick={onSetGoals}>Save</Button>
          </div>
        </div>
      </div>
    </>
  )
}

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
  const { user } = useUser()

  const userId = user?.id || ''
  // const userId = 'user_2UhBMdOLkQUazMBwmEWw0g6DQ1v' //sam
  // const userId = 'user_2Uj759BY4rnQ8r4KGafyBcT1fuD' //alex
  // const userId = 'user_2UjZi8dZQQcmxhViIek8PUVjKp7' //ben
  // const userId = 'user_2UmhNpWstVwbKlK0D3U9Zud4N43' //jayne
  // const userId = 'user_2VPVPXid6tM9U1s5f6iodw5CoJv' //mary
  // const userId = 'user_2VVN8mlFa7kbApqE1EYRYja62xS' //rachel
  // const userId = 'user_2VxyYAeq0glZAPQM2OpTQRbXKxZ' //byung
  // const userId = 'user_2WeOskMzYGguohYuGjW2LCuaYOh' //leroy
  // const userId = 'user_2RB3u3X0pKDxnvmHraPW3RfwrAv' //mitch

  // const { data: user } = api.users.get.useQuery({ userId: userId })

  const [isOpen, setIsOpen] = useState(false)

  const ctx = api.useContext()

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  api.users.getAllUsers.useQuery()
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

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

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
  if (!user) return null

  return (
    <>
      <main className='flex h-full flex-col gap-6 px-2  font-semibold'>
        <div className='flex  flex-col gap-4 lg:items-start '>
          <div className='flex w-full items-center justify-between'>
            <h1 className='text-xl'>Profile</h1>
            <Cog6ToothIcon
              onClick={openModal}
              className='hidden h-6 w-6 text-yellow-500'
            />
          </div>
          <div className='flex flex-col gap-0 text-sm text-gray-400'>
            <h3 className='text-base text-yellow-500 underline'>Changelog</h3>
            <ul className='list-inside list-disc p-1'>
              <li>
                Current Program, will take you to your next uncompleted day
              </li>
              <li>
                the old dashboard screen can be found under program in the menu
              </li>
              <li>
                you can delete exercises from each day(an X in the top right
                hand corner)
              </li>
              <li>you can add/remove sets from an exercise</li>
              <li>
                you can complete a day by pressing the complete button at the
                top of the day
              </li>
              <li>
                your current estimated One rep Maxes from your training block
              </li>
              <li>Your open powerlifting data </li>
            </ul>
          </div>
          <div className='flex gap-1'>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
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
        <div className=''>
          <Button onClick={() => setOpenPowerliftingData({ userId: userId })}>
            Set Open Powerlifting Data
          </Button>
        </div>
        <Transition
          appear
          show={isOpen}
          as={Fragment}
        >
          <Dialog
            as='div'
            className='relative z-10 text-gray-200'
            onClose={closeModal}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-7xl transform overflow-visible rounded-2xl border border-gray-800 bg-black p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title className='flex items-center justify-between text-lg font-medium leading-6 text-gray-200'>
                      <div>Settings</div>
                      <XMarkIcon
                        onClick={closeModal}
                        className='h-6 w-6'
                      />
                    </Dialog.Title>
                    <Settings />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    </>
  )
}

export default Home
