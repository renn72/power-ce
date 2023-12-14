import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Transition, Dialog } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { LoadingPage } from '~/components/loading'
import { api } from '~/utils/api'
import { cn } from '@/lib/utils'
import { format, add } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { XMarkIcon } from '@heroicons/react/20/solid'

const women = [
  '48',
  '52',
  '56',
  '60',
  '67.5',
  '75',
  '82.5',
  '90',
  '90+',
  'M-67.5',
  'M+67.5',
]

const men = [
  '52',
  '56',
  '60',
  '67.5',
  '75',
  '82.5',
  '90',
  '100',
  '110',
  '125',
  '140',
  '140+',
]

const ModalWrapper = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  setIsOpen: (args: boolean) => void
  children: React.ReactNode
}) => {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setIsOpen(true)}
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
          <div className='fixed inset-0 bg-black/75' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto text-gray-200'>
          <div className='flex min-h-full items-center justify-center p-2 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-gray-900 px-4 py-6 text-left align-middle transition-all lg:px-6'>
                <Dialog.Title className='mb-[-2rem] flex justify-end'>
                  <XMarkIcon
                    className='z-50 h-8 w-8 cursor-pointer text-gray-300 hover:text-yellow-500'
                    onClick={() => {
                      setIsOpen(false)
                    }}
                  />
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
const Cell = ({
  wc,
  gender,
  lift,
  recordName,
  recordWeight,
  userId,
  isAuth,
}: {
  wc: string
  gender: string
  recordName: string
  recordWeight: string
  lift: string
  userId: string
  isAuth: boolean
}) => {
  const ctx = api.useContext()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [date, setDate] = useState(new Date())
  const { data: records } = api.records.getAll.useQuery()
  const { mutate: saveRecord } = api.records.create.useMutation({
    onSuccess: (data) => {
      console.log(data)
      void ctx.records.getAll.invalidate()
    },
  })

  const { mutate: deleteRecord } = api.records.delete.useMutation({
    onSuccess: () => {
      void ctx.records.getAll.invalidate()
    },
  })

  const onSave = () => {
    setDate(new Date())
    setValue('')
    setName('')
    saveRecord({
      userId: userId,
      name: name,
      weight: Number(value),
      date: date.toISOString(),
      gender: gender,
      wc: wc,
      lift: lift,
    })
  }

  const recordNames = records?.filter(
    (r) => r.lift === lift && r.wc === wc && r.gender === gender,
  )

  return (
    <div
      onClick={() => {
        setIsOpen(true)
      }}
      className='flex w-72 cursor-pointer justify-center gap-2 border border-gray-400 px-4 py-2 hover:scale-105 hover:bg-gray-900 2xl:w-[32rem] 2xl:py-5'
    >
      <div className='flex gap-1 '>
        <div>
          {recordWeight}
          <span className='text-sm text-gray-400'>kg</span>
        </div>
        <div className='text-yellow-500'>/</div>
        <div>{recordName}</div>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='flex flex-col gap-2 py-2'>
          <h2 className='mb-4 flex gap-2 text-2xl font-semibold'>
            <div>{gender === 'm' ? 'Men' : 'Women'}</div>
            <div>{wc}kg</div>
            <div className='capitalize'>{lift}</div>
          </h2>
          <div className='flex flex-col divide-y divide-dashed divide-gray-600 py-4 text-lg lg:text-xl'>
            {recordNames?.map((r, idx) => (
              <div
                key={idx}
                className='flex items-center py-2 font-semibold gap-1 justify-start lg:gap-2 relative'
              >
                <div className='w-24 font-normal tracking-tighter text-sm text-gray-400 lg:w-36'>
                  {r.date.toLocaleString('en-AU', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div>
                  {+r.weight}
                  <span className='text-sm text-gray-400'>kg</span>
                </div>
                <div className='text-yellow-500'>/</div>
                <div>{r.name}</div>
                {isAuth && (
                    <XMarkIcon
                      className='h-6 w-6 cursor-pointer text-gray-300 hover:text-red-500 hover:scale-125 lg:ml-8 absolute right-0'
                      onClick={() => {
                        deleteRecord({
                          id: r.id,
                        })
                      }}
                    />
                )}
              </div>
            ))}
          </div>
          {isAuth && (
            <div>
              <Input
                placeholder='Name'
                className='bg-gray-900'
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
              <Input
                placeholder='Weight'
                className='bg-gray-900'
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <div className='flex items-center gap-8 text-gray-500'>
                    <div>Date:</div>
                    <Button
                      className={cn(
                        'col-span-2 w-[230px] justify-start rounded-none border-0 border-b border-gray-600 px-2 text-left text-gray-200 hover:border-gray-200 ',
                        !date && 'text-gray-600',
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className='z-10 w-auto bg-black py-3 text-gray-200 md:px-3 '>
                  <PopoverClose className='flex w-full justify-end'>
                    <XMarkIcon className='mb-[-1rem] h-6 w-6 cursor-pointer text-gray-300 hover:text-gray-100' />
                  </PopoverClose>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(e) => {
                      const a = add(e || new Date(), { hours: 8 })
                      setDate(a)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className='mt-4 flex justify-center gap-2'>
                <Button
                  onClick={() => {
                    if (!value) return
                    if (!name) return
                    onSave()
                    setIsOpen(false)
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setName('')
                    setValue('')
                    setIsOpen(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </ModalWrapper>
    </div>
  )
}

const CellWCHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-32 justify-center border border-gray-800 bg-yellow-500 px-4 py-2 text-gray-900 2xl:w-48 2xl:py-5'>
    {children}
  </div>
)

const CellWC = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-32 justify-center border border-gray-400 px-4 py-2 2xl:w-48 2xl:py-5'>
    {children}
  </div>
)

const CellHeading = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-72 justify-center border border-gray-800 bg-yellow-500  px-4 py-2 text-gray-900 2xl:w-[32rem] 2xl:py-5'>
    {children}
  </div>
)

const Records = () => {
  const { data: session } = useSession()
  const user = session?.user
  const userId = session?.user?.id || ''

  const isSuper = user?.isRecordEditor || false

  const { data: _records, isLoading: recordsLoading } =
    api.records.getAll.useQuery()

  const records = _records?.map((r) => ({
    ...r,
    weight: Number(r.weight),
  }))

  if (!user) return null
  if (recordsLoading) return <LoadingPage />

  return (
    <div className='mb-32 flex flex-col gap-12 text-xl font-semibold 2xl:text-4xl'>
      <div className='flex flex-col gap-1'>
        <h1>Men</h1>
        <div className='flex w-fit items-baseline font-bold tracking-widest'>
          <CellWCHeading>WC</CellWCHeading>
          <CellHeading>SQUAT</CellHeading>
          <CellHeading>BENCH</CellHeading>
          <CellHeading>DEADLIFT</CellHeading>
          <CellHeading>TOTAL</CellHeading>
        </div>
        <div className='w-fit border border-gray-200'>
          {men.map((weight) => (
            <div
              className='flex'
              key={weight}
            >
              <CellWC>{weight}</CellWC>
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'squat' &&
                        r.wc === weight &&
                        r.gender === 'm',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'squat' &&
                              r.wc === weight &&
                              r.gender === 'm',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'m'}
                wc={weight}
                lift={'squat'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'bench' &&
                        r.wc === weight &&
                        r.gender === 'm',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'bench' &&
                              r.wc === weight &&
                              r.gender === 'm',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'m'}
                wc={weight}
                lift={'bench'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'deadlift' &&
                        r.wc === weight &&
                        r.gender === 'm',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'deadlift' &&
                              r.wc === weight &&
                              r.gender === 'm',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'m'}
                wc={weight}
                lift={'deadlift'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'total' &&
                        r.wc === weight &&
                        r.gender === 'm',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'total' &&
                              r.wc === weight &&
                              r.gender === 'm',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'m'}
                wc={weight}
                lift={'total'}
                userId={userId}
                isAuth={isSuper}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <h1>Women</h1>
        <div className='flex w-fit items-baseline font-bold tracking-widest'>
          <CellWCHeading>WC</CellWCHeading>
          <CellHeading>SQUAT</CellHeading>
          <CellHeading>BENCH</CellHeading>
          <CellHeading>DEADLIFT</CellHeading>
          <CellHeading>TOTAL</CellHeading>
        </div>
        <div className='w-fit border border-gray-200'>
          {women.map((weight) => (
            <div
              className='flex'
              key={weight}
            >
              <CellWC>{weight}</CellWC>
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'squat' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'squat' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'w'}
                wc={weight}
                lift={'squat'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'bench' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'bench' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'w'}
                wc={weight}
                lift={'bench'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'deadlift' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'deadlift' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'w'}
                wc={weight}
                lift={'deadlift'}
                userId={userId}
                isAuth={isSuper}
              />
              <Cell
                recordName={
                  records
                    ?.filter(
                      (r) =>
                        r.lift === 'total' &&
                        r.wc === weight &&
                        r.gender === 'w',
                    )
                    .reduce(
                      (acc, cur) => {
                        if (cur.weight > acc.weight) {
                          acc.weight = cur.weight
                          acc.name = cur.name
                        }
                        return acc
                      },
                      { name: '', weight: 0 },
                    )?.name || ''
                }
                recordWeight={`
                      ${
                        records
                          ?.filter(
                            (r) =>
                              r.lift === 'total' &&
                              r.wc === weight &&
                              r.gender === 'w',
                          )
                          .reduce(
                            (acc, cur) => {
                              if (cur.weight > acc.weight) {
                                acc.weight = cur.weight
                                acc.name = cur.name
                              }
                              return acc
                            },
                            { name: '', weight: 0 },
                          )?.weight || ''
                      }
                      `}
                gender={'w'}
                wc={weight}
                lift={'total'}
                userId={userId}
                isAuth={isSuper}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Records
