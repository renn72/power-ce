import {
  Fragment, useEffect, useState,
} from 'react'
import { Button, } from '@/components/ui/button'
import { type NextPage, } from 'next'
import { LoadingPage, } from '~/components/loading'
import { api, } from '~/utils/api'

import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { Slider, } from '@/components/ui/slider'
import {
  Listbox, Transition, Dialog,
} from '@headlessui/react'
import {
  ChevronUpDownIcon, CheckIcon,
} from '@heroicons/react/24/outline'
import { Input, } from '@/components/ui/input'

import { toast, } from 'react-hot-toast'

const LiftPicker = ({
  onChange, value, lifts,
}: { onChange: (arg0: string) => void, value: string, lifts: string[] }) => {
  const [
    selectedLift,
    setSelectedLift,
  ] = useState(value)

  const sortedLifts = lifts.sort(
    (a, b) => {
      if (a === 'Squat') return -1
      if (b === 'Squat') return 1
      if (a === 'Bench') return -1
      if (b === 'Bench') return 1
      if (a === 'Deadlift') return -1
      if (b === 'Deadlift') return 1
    }
  )

  return (
    <Listbox
      value={selectedLift}
      onChange={(e) => {
        onChange(e)
        setSelectedLift(e)
      }}
    >
      <div className='relative text-xl  h-full flex justify-center'>
        <Listbox.Button className='relative min-h-[3rem] h-full w-80 border border-gray-600 cursor-default rounded-lg py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300'>
          <span className='flex items-center'>{selectedLift}</span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronUpDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute z-20 mt-1 max-h-60 w-80 overflow-auto rounded-md bg-gray-900 border border-gray-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            {lifts.map((lift, Idx) => (
              <Listbox.Option
                key={Idx}
                className={({ active, }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-200'
                  }`
                }
                value={lift}
              >
                {({ selected, }) => (
                  <>
                    <span
                      className={`block truncate ${selected ? 'font-bold' : 'font-semibold'
                        }`}
                    >
                      {lift}
                    </span>
                    {selected
                      ? (
                        <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      )
                      : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

const ChangeButton = ({
  onChange, value,
}: { onChange: (arg0 : number) => void, value: number }) => {
  return (
    <div
      className='font-bold border border-gray-600 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer'
      onClick={() => onChange(value)}
    >
      {Math.abs(value) === 0.25 ? '1/4' : Math.abs(value)}
    </div>
  )
}

const Lift: NextPage = () => {
  const [
    lift,
    setLift,
  ] = useState('')
  const [
    weight,
    setWeight,
  ] = useState(10.00)
  const [
    isDialogOpen,
    setIsDialogOpen,
  ] = useState(false)
  const [
    newLift,
    setNewLift,
  ] = useState('')
  const [
    reps,
    setReps,
  ] = useState(5)

  const {
    data: userLifts, isLoading: userLiftsLoading,
  } = api.lifts.getAllUser.useQuery()

  const userEachLift = userLifts?.map((lifts) => lifts.lift).flat()

  const ctx = api.useContext()
  const { mutate: mutateLifts, } = api.lifts.create.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.lifts.getAllUser.invalidate()
    },
  })

  const { mutate: mutateDeleteLifts, } = api.lifts.delete.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.lifts.getAllUser.invalidate()
    },
  })

  const { mutate: mutateLift, } = api.lift.create.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.lifts.getAllUser.invalidate()
    },
  })

  if (userLiftsLoading) return <div><LoadingPage /> </div>

  const liftNames = userLifts?.map((lift) => lift.name)
  console.log(liftNames)

  const onAddLift = () => {
    console.log('add lift', lift, weight)
    const liftId = userLifts?.find((l) => l.name === lift)?.id
    if (!liftId) return
    mutateLift({
      liftId: liftId,
      liftName: lift,
      weight: weight,
      reps: reps,

    })

  }
  const onAddLifts = () => {
    const lifts = userLifts?.map((lift) => lift.name)

    if (lifts?.includes(newLift)) {
      toast.error('Lift already exists')
      return
    }
    if (newLift === '') {
      toast.error('Lift name cannot be empty')
      return
    }
    mutateLifts({ name: newLift, })
  }

  const onWeightChange = (e: number) => {
    if (weight + e < 0) {
      setWeight(0)
      return
    }
    setWeight(weight + e)
  }

  const onRepChange = (e: number) => {
    if (reps + e < 0) {
      setReps(0)
      return
    }
    setReps(reps + e)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
  }

  console.log('userLifts', userLifts)
  console.log(userEachLift)

  return (
    <>
      <main className='h-full flex flex-col gap-6 max-w-2xl my-10 mx-auto text-gray-300 font-semibold px-2'>
        <div className='flex flex-col gap-6 border border-gray-600 rounded-lg p-2'>
          <LiftPicker
            onChange={(e) => setLift(e)}
            value={lift}
            lifts={liftNames}
          />
          <div className='flex flex-col'>
            <div className='flex justify-center text-3xl'>
              Weight
            </div>
            <div className='flex justify-center items-center gap-4 text-base'>
              <ChangeButton onChange={onWeightChange} value={-10} />
              <ChangeButton onChange={onWeightChange} value={-1} />
              <div className='text-base font-bold'>
                -
              </div>
              <div className='text-2xl font-bold flex justify-center w-20 tracking-tighter'>
                {weight}kg
              </div>
              <div className='text-base font-bold'>
                +
              </div>
              <ChangeButton onChange={onWeightChange} value={1} />
              <ChangeButton onChange={onWeightChange} value={10} />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-center text-3xl'>
              Reps
            </div>
            <div className='flex justify-center items-center gap-8 '>
              <ChangeButton onChange={onRepChange} value={-1} />
              <div className='text-xl font-bold'>
                -
              </div>
              <div className='text-2xl font-bold flex justify-center w-20 tracking-tight'>
                {reps}
              </div>
              <div className='text-xl font-bold'>
                +
              </div>
              <ChangeButton onChange={onRepChange} value={-1} />
            </div>
          </div>
          <div
            className='flex justify-center items-center gap-4 '
          >
            <Button
              onClick={onAddLift}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setWeight(10)
                setReps(5)
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => setIsDialogOpen(true)}
            >
              Lifts
            </Button>

          </div>
          <div className='flex flex-col gap-4'>
            {
              userEachLift?.map((l) => (
                <div
                  key={l.id}
                  className='flex justify-around items-center'
                >
                  <div className='text-lg font-bold'>
                    {l.liftName}
                  </div>
                  <div className='text-lg font-bold'>
                    {l.weight.toString()}kg
                  </div>
                  <div className='text-lg font-bold'>
                    {l.reps}
                  </div>
                  <div>
                    {dayjs(l.createdAt).fromNow()}
                  </div>
                </div>
              ))
            }

          </div>

        </div>
        <Transition appear show={isDialogOpen} as={Fragment}>
          <Dialog className='relative z-10' onClose={closeDialog}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
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
                  <Dialog.Panel className='w-full max-w-2xl transform text-gray-200 overflow-hidden rounded-2xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 flex justify-between'
                    >
                      Lifts
                      <button onClick={closeDialog}>X</button>
                    </Dialog.Title>
                    <div className='mt-2 flex justify-center'>
                      <div className='flex flex-col gap-4'>
                        {userLifts?.map((lift) => (
                          <div
                            key={lift.id}
                          >
                            {
                              lift.name !== 'Squat' && lift.name !== 'Bench' && lift.name !== 'Deadlift' && (
                                <div
                                  className='flex justify-between'
                                >
                                  <div>
                                    {lift.name}
                                  </div>
                                  <div
                                    className='font-bold cursor-pointer'
                                    onClick={() => mutateDeleteLifts({ id: lift.id, })}
                                  >
                                    X
                                  </div>
                                </div>
                              )
                            }</div>
                        ))}
                        <div className='flex gap-4'>
                          <Input value={newLift} onChange={(e) => setNewLift(e.target.value)} />
                          <Button onClick={onAddLifts}>Add</Button>
                          <Button onClick={() => setNewLift('')}>Clear</Button>
                        </div>
                      </div>
                    </div>

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

export default Lift
