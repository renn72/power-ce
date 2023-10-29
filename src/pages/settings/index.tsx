import { useForm, Controller } from 'react-hook-form'
import { Calendar } from '~/components/calendar'
import {
  Popover as PopoverCN,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, add } from 'date-fns'

import { api } from '~/utils/api'

import { useUser } from '@clerk/nextjs'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Fragment, useState } from 'react'

import { Listbox, Transition, Popover, Dialog } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { Label } from '@/components/ui/label'
import { LoadingPage } from '~/components/loading'
import Decimal from 'decimal.js'

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
          <div className='fixed inset-0 bg-black/50' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto text-gray-200'>
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
              <Dialog.Panel className='w-full max-w-md transform overflow-visible rounded-2xl bg-gray-900 p-6 text-left align-middle transition-all'>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const Height = ({ height }: { height: Decimal | number }) => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(height) == 0 ? undefined : Number(height),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateHeight.useMutation({
    onMutate: async (newData) => {
      if (!user) return
      await utils.settings.get.cancel({ userId: user.id })
      const previousData = utils.settings.get.getData({
        userId: user.id,
      })

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          height: new Decimal(newData.height),
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData(
        { userId: user?.id || '' },
        context?.previousData,
      )
    },
  })
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <h4 className='text-xl'>Height</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(height || null)}cm
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          type='number'
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(+e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', height: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

const Weight = ({ defaultValue }: { defaultValue: Decimal | number }) => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateWeight.useMutation({
    onMutate: async (newData) => {
      if (!user) return
      await utils.settings.get.cancel({ userId: user.id })
      const previousData = utils.settings.get.getData({
        userId: user.id,
      })

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          weight: new Decimal(newData.weight),
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData(
        { userId: user?.id || '' },
        context?.previousData,
      )
    },
  })
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <h4 className='text-xl'>Weight</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue || null)}kg
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          type='number'
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(+e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', weight: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

const TargetWeight = ({ defaultValue }: { defaultValue: Decimal | number }) => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateTargetWeight.useMutation({
    onMutate: async (newData) => {
      if (!user) return
      await utils.settings.get.cancel({ userId: user.id })
      const previousData = utils.settings.get.getData({
        userId: user.id,
      })

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          targetWeight: new Decimal(newData.targetWeight),
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData(
        { userId: user?.id || '' },
        context?.previousData,
      )
    },
  })
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <h4 className='text-xl'>Target Weight</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue || null)}kg
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          type='number'
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(+e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', targetWeight: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

const WeightGoal = ({ defaultValue }: { defaultValue: string }) => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const utils = api.useContext()
  const { mutate } = api.settings.updateWeightGoal.useMutation({
    onMutate: async (newData) => {
      if (!user) return
      await utils.settings.get.cancel({ userId: user.id })
      const previousData = utils.settings.get.getData({
        userId: user.id,
      })

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          weightGoal: newData.weightGoal,
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData(
        { userId: user?.id || '' },
        context?.previousData,
      )
    },
  })
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <h4 className='text-xl'>Weight Goal</h4>
        <p className='h-8 text-base text-gray-400'>
          {defaultValue == '' ? '...' : defaultValue}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Listbox
          value={value}
          onChange={(e) => setValue(e)}
        >
          <div className='z-1 relative'>
            <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
              <span
                className={`block truncate ${
                  value === '' ? 'text-sm text-gray-500' : ''
                }`}
              >
                {value === '' ? 'Weight Goal' : value}
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
                {['weight loss', 'maintenence', 'weight gain'].map((t, Idx) => (
                  <Listbox.Option
                    key={Idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-8 pr-4 ${
                        active ? 'bg-yellow-400 text-black' : 'text-gray-200'
                      }`
                    }
                    value={t}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate`}>{t}</span>
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
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', weightGoal: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              mutate({ userId: user?.id || '', weightGoal: '' })
              setValue('')
              setIsOpen(false)
            }}
          >
            Clear
          </Button>

          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

const DOB = ({ defaultValue }: { defaultValue: string }) => {
  console.log(defaultValue)
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [value, setValue] = useState(
    defaultValue ? new Date(defaultValue) : null,
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateDOB.useMutation({
    onMutate: async (newData) => {
      if (!user) return
      await utils.settings.get.cancel({ userId: user.id })
      const previousData = utils.settings.get.getData({
        userId: user.id,
      })

      utils.settings.get.setData(
        { userId: user.id },
        {
          ...previousData,
          DOB: newData.DOB,
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData(
        { userId: user?.id || '' },
        context?.previousData,
      )
    },
  })
  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        <h4 className='text-xl'>DOB</h4>
        <p className='h-8 text-base text-gray-400'>
          {defaultValue == null
            ? '...'
            : defaultValue.toLocaleDateString('en-AU', {
                year: 'numeric',
                day: 'numeric',
                month: 'short',
              })}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='flex items-end justify-between gap-2 md:justify-normal md:gap-6'>
          <PopoverCN
            open={popoverOpen}
            onOpenChange={setPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                className={cn(
                  'col-span-2 w-full items-center justify-start rounded-none border-0 border-b border-gray-600 px-1 text-left text-gray-200 hover:border-gray-200 md:w-[230px] md:px-2 ',
                  !value && 'text-gray-600',
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {value ? (
                  format(value, 'PPP')
                ) : (
                  <span className='ml-4 text-gray-400'>DOB</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='z-10 mt-[-10rem] bg-black py-3 text-gray-200 md:px-3'>
              <Calendar
                mode='single'
                selected={value}
                onSelect={(e) => {
                  setValue(e)
                }}
                captionLayout='dropdown'
                fromYear={new Date().getFullYear() - 100}
                toYear={new Date().getFullYear()}
              />
              <div className='flex w-full justify-center'>
                <Button
                  onClick={() => {
                    setPopoverOpen(false)
                  }}
                >
                  Set
                </Button>
              </div>
            </PopoverContent>
          </PopoverCN>
        </div>
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', DOB: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Cancel
          </Button>
        </div>
      </ModalWrapper>
    </div>
  )
}

const Settings = () => {
  const { user } = useUser()

  const formMethods = useForm()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = formMethods

  const { data: userSettings, isLoading: settingsLoading } =
    api.settings.get.useQuery({
      userId: user?.id || '',
    })

  if (settingsLoading) return <LoadingPage />
  if (!user) return null

  return (
    <>
      <div className='flex flex-col gap-4 px-4 py-2'>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-1 text-2xl font-semibold text-yellow-500'>
            {user.firstName} {user.lastName}
          </div>
          <Height height={userSettings?.height || 0} />
          <Weight defaultValue={userSettings?.weight || 0} />
          <TargetWeight defaultValue={userSettings?.targetWeight || 0} />
          <WeightGoal defaultValue={userSettings?.weightGoal || ''} />
          <DOB defaultValue={userSettings?.DOB} />
          <h2>Activity Level</h2>
          <div className='relative flex flex-col items-center gap-2'>
            <Label className='w-16'>Training</Label>
            <Controller
              name='activityLevelTraining'
              control={control}
              defaultValue={''}
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={value as string}
                  onChange={onChange}
                >
                  <div className='z-1 relative'>
                    <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none md:w-60 '>
                      <span className='block truncate'>{value}</span>
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
                        {[
                          'sedentary',
                          'mild',
                          'moderate',
                          'heavy',
                          'extreme',
                        ].map((t, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : 'text-gray-200'
                              }`
                            }
                            value={t}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate`}>{t}</span>
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
              )}
            />
            <Popover className=''>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <QuestionMarkCircleIcon className='h-5 w-5 text-gray-400' />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute left-0 z-10 w-[90vw] max-w-sm px-4 sm:px-0'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='bg-gray-900 p-4 text-lg'>
                          <ul>
                            <li>
                              <span className='font-semibold'>Sedentary </span>-
                              no exercise
                            </li>
                            <li>
                              <span className='font-semibold'>Mild </span>-
                              20min
                            </li>
                            <li>
                              <span className='font-semibold'>Moderate </span>-
                              30-60min
                            </li>
                            <li>
                              <span className='font-semibold'>Heavy </span>-
                              greater than 60min
                            </li>
                            <li>
                              <span className='font-semibold'>Extreme</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
          <div className='flex  flex-col items-center gap-2'>
            <Label className='w-16'>Rest</Label>
            <Controller
              name='activityLevelRest'
              control={control}
              defaultValue={''}
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={value as string}
                  onChange={onChange}
                >
                  <div className='z-1 relative'>
                    <Listbox.Button className='relative h-10 w-60 cursor-default border-b border-gray-600 pl-3 pr-10 text-left shadow-md hover:border-white focus:outline-none md:w-60 '>
                      <span className='block truncate'>{value}</span>
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
                        {[
                          'sedentary',
                          'mild',
                          'moderate',
                          'heavy',
                          'extreme',
                        ].map((t, Idx) => (
                          <Listbox.Option
                            key={Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-8 pr-4 ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : 'text-gray-200'
                              }`
                            }
                            value={t}
                          >
                            {({ selected }) => (
                              <>
                                <span className={`block truncate`}>{t}</span>
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
              )}
            />
            <Popover className=''>
              {({ open }) => (
                <>
                  <Popover.Button>
                    <QuestionMarkCircleIcon className='h-5 w-5 text-gray-400' />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute left-0 z-10 w-[90vw] max-w-sm px-4 sm:px-0'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='bg-gray-900 p-4'>
                          <ul>
                            <li>
                              <span className='font-semibold'>Sedentary </span>-
                              no exercise
                            </li>
                            <li>
                              <span className='font-semibold'>Mild </span>-
                              20min
                            </li>
                            <li>
                              <span className='font-semibold'>Moderate </span>-
                              30-60min
                            </li>
                            <li>
                              <span className='font-semibold'>Heavy </span>-
                              greater than 60min
                            </li>
                            <li>
                              <span className='font-semibold'>Extreme</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
        <Button
          onClick={() => {
            handleSubmit(onSubmit, onError)()
          }}
        >
          sub
        </Button>
      </div>
    </>
  )
}
export default Settings
