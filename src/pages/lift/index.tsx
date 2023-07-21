import {
  Fragment, useState,
} from 'react'
import { Button, } from '@/components/ui/button'
import { type NextPage, } from 'next'
import { LoadingPage, } from '~/components/loading'
import { api, } from '~/utils/api'

import { Slider, } from '@/components/ui/slider'
import {
  Listbox, Transition,
} from '@headlessui/react'
import {
  ChevronUpDownIcon, CheckIcon,
} from '@heroicons/react/24/outline'

const LiftPicker = ({
  onChange, value, lifts,
}: { onChange: (arg0: string) => void, value: string, lifts: string[] }) => {
  const [
    selectedLift,
    setSelectedLift,
  ] = useState(value)

  return (
    <Listbox
      value={selectedLift}
      onChange={(e) => {
        onChange(e)
        setSelectedLift(e)
      }}
    >
      <div className='relative  h-full text-xs sm:text-sm'>
        <Listbox.Button className='relative min-h-[2rem] h-full w-full border border-gray-600 cursor-default rounded-lg py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300'>
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
          <Listbox.Options className='absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 border border-gray-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
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

const Lift: NextPage = () => {
  const [
    lift,
    setLift,
  ] = useState('')
  const {
    data: userLifts, isLoading: userLiftsLoading,
  } = api.lifts.getAllUser.useQuery()
  const ctx = api.useContext()
  const { mutate: mutateLifts, } = api.lifts.create.useMutation({
    onSuccess: () => {
      console.log('success')
      void ctx.lifts.getAllUser.invalidate()
    },
  })

  const { mutate: mutateLift, } = api.lift.create.useMutation({
    onSuccess: () => {
      console.log('success')
    },
  })

  if (userLiftsLoading) return <div><LoadingPage /> </div>

  const onAddLift = () => {
    mutateLift({
      weight: 100,
      reps: 5,
      liftId: 'clkbzigq60007iv6ndi506x5t',
    })
  }
  const onAddLifts = () => {
    mutateLifts({ name: 'test3', })
  }

  console.log(userLifts)
  return (
    <>
      <main className='h-full flex flex-col gap-6 max-w-2xl mx-auto text-gray-300 font-semibold px-2'>
        <Button
          onClick={() => onAddLifts()}
        >
          click me lifts
        </Button>
        <Button
          onClick={() => onAddLift()}
        >
          click me lift
        </Button>
        <div className='flex flex-col gap-4'>
          {userLifts?.map((lift) => (
            <div key={lift.id}>{lift.name}</div>
          ))}
        </div>
        <div className='flex flex-col gap-2 border border-gray-600 rounded-lg'>
          hello
          <LiftPicker
            onChange={(e) => setLift(e)}
            value={lift}
            lifts={[
              'Squat',
              'Bench',
              'Deadlift',
            ]}
          />
          <div>
            Weight
            <Slider defaultValue={[33,]} max={100} step={1} />
          </div>

          <div>
          </div>
          <div>
          </div>
          <div>
          </div>

        </div>
      </main>
    </>
  )
}

export default Lift
