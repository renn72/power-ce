import { useState, useEffect, Fragment } from 'react'

import { api } from '~/utils/api'

import { Listbox, Transition } from '@headlessui/react'
import {
  ChevronUpDownIcon,
  CheckIcon,
  CheckCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

const trainers = [
  {
    name: 'Mitch',
    id: 'user_2RB3u3X0pKDxnvmHraPW3RfwrAv',
  },
]

const TrainerSelect = ({ userId }: { userId: string }) => {
  const [isSet, setIsSet] = useState(false)

  const { data: clientTrainer } = api.users.getTrainer.useQuery({
    userId: userId,
  })
  const [trainer, setTrainer] = useState<string>('')

  const ctx = api.useContext()

  const { mutate: setClientTrainer } = api.users.setTrainer.useMutation({
    onSuccess: () => {
      setIsSet(true)
      toast.success('Saved')
      void ctx.users.getTrainer.invalidate({ userId: userId })
    },
  })

  const { mutate: clearClientTrainer } = api.users.deleteTrainer.useMutation({
    onSuccess: () => {
      setIsSet(false)
      setTrainer('')
      toast.success('Removed')
      void ctx.users.getTrainer.invalidate({ userId: userId })
    },
  })

  const onSetTraienrWrapper = () => {
    if (trainer) {
      setClientTrainer({ userId: userId, trainerId: trainer })
    }
  }

  const onClearTrainer = () => {
    clearClientTrainer({ userId: userId })
  }

  useEffect(() => {
    if (clientTrainer?.trainerId) {
      setIsSet(true)
    }
    setTrainer(clientTrainer?.trainerId || '')
  }, [clientTrainer])

  return (
    <div className='m-2 flex gap-6'>
      <div className='flex w-64 items-center justify-between gap-2 text-lg font-semibold'>
        <div className='text-xl font-bold'>Trainer</div>
        {isSet && <CheckCircleIcon className='h-8 w-8 text-green-600' />}
      </div>
      <div className='flex justify-start sm:gap-2 md:items-center'>
        <div className='flex flex-col justify-center text-sm font-bold md:text-base'>
          <Listbox
            value={trainer}
            onChange={(e) => setTrainer(e)}
          >
            <div className='z-1 relative'>
              <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none '>
                <span className='block truncate'>
                  {trainers.find((t) => t.id === trainer)?.name}
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5'
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
                <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 shadow-lg '>
                  {trainers?.map((t, Idx) => (
                    <Listbox.Option
                      key={Idx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-8 pr-4 ${
                          active ? 'bg-yellow-400 text-black' : 'text-gray-200'
                        }`
                      }
                      value={t.id}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate`}>{t.name}</span>
                          {selected ? (
                            <span className='absolute inset-y-0 left-0 flex items-center pl-1'>
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className='ml-4 flex items-end justify-start gap-2'>
          <PencilSquareIcon
            className='h-8 w-8 text-gray-400 hover:text-green-600'
            onClick={() => onSetTraienrWrapper()}
          />
          <XCircleIcon
            className='col-span-1 h-8 w-8 text-gray-400 hover:text-red-600'
            onClick={() => onClearTrainer()}
          />
        </div>
      </div>
    </div>
  )
}

export default TrainerSelect
