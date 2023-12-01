import { Calendar } from '~/components/calendar'
import {
  Popover as PopoverCN,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarIcon, HomeIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, add } from 'date-fns'

import { useSession } from 'next-auth/react'

import { api } from '~/utils/api'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { Fragment, useState } from 'react'

import { Listbox, Transition, Popover, Dialog, Switch } from '@headlessui/react'
import {
  CheckIcon,
  ChevronUpDownIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import { LoadingPage } from '~/components/loading'
import Decimal from 'decimal.js'
import Link from 'next/link'
import { Toggle } from '@/components/ui/toggle'

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

const FirstName = ({ name, userId }: { name: string; userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(name)
  const utils = api.useContext()
  const { mutate } = api.settings.updateFirstName.useMutation({
    onSuccess: () => {
      void utils.users.get.invalidate({ userId: userId })
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>First Name</h4>
        <p className='h-8 text-base text-gray-400'>
          {name == '' ? '...' : name}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, firstName: value })
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

const LastName = ({ name, userId }: { name: string; userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(name)
  const utils = api.useContext()
  const { mutate } = api.settings.updateLastName.useMutation({
    onSuccess: () => {
      void utils.users.get.invalidate({ userId: userId })
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Last Name</h4>
        <p className='h-8 text-base text-gray-400'>
          {name == '' ? '...' : name}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, lastName: value })
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

const Email = ({ name, userId }: { name: string; userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(name)
  const utils = api.useContext()
  const { mutate } = api.settings.updateEmail.useMutation({
    onSuccess: () => {
      void utils.users.get.invalidate({ userId: userId })
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Email</h4>
        <p className='h-8 text-base text-gray-400'>
          {name == '' ? '...' : name}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Input
          placeholder='Height'
          className='bg-gray-900'
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: userId, email: value })
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

const Height = ({
  height,
  userId,
}: {
  height: Decimal | number
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(height) == 0 ? undefined : Number(height),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateHeight.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          height: new Decimal(newData.height),
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
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
              mutate({ userId: userId, height: value })
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

const Weight = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateWeight.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          weight: new Decimal(newData.weight),
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
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
              mutate({ userId: userId, weight: value })
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

const TargetWeight = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateTargetWeight.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          targetWeight: new Decimal(newData.targetWeight),
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
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
              mutate({ userId: userid, targetWeight: value })
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

const Gender = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const utils = api.useContext()
  const { mutate } = api.settings.updateGender.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          gender: newData.gender,
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Gender</h4>
        <p className='h-8 text-base capitalize text-gray-400'>
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
            <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left capitalize shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
              <span
                className={`block truncate ${
                  value === '' ? 'text-sm text-gray-500' : ''
                }`}
              >
                {value === '' ? 'Gender' : value}
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
              <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 capitalize shadow-lg '>
                {['male', 'female'].map((t, Idx) => (
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
              mutate({ userId: userId, gender: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              mutate({ userId: userId, gender: '' })
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

const WeightGoal = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const utils = api.useContext()
  const { mutate } = api.settings.updateWeightGoal.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
      })

      utils.settings.get.setData(
        { userId: userId },
        {
          ...previousData,
          weightGoal: newData.weightGoal,
        },
      )

      return { previousData }
    },
    onError: (err, newData, context) => {
      console.log(err)
      utils.settings.get.setData({ userId: userId }, context?.previousData)
    },
  })
  return (
    <div>
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Weight Goal</h4>
        <p className='h-8 text-base capitalize text-gray-400'>
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
            <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left capitalize shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
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
              <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 capitalize shadow-lg '>
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
              mutate({ userId: userId, weightGoal: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              mutate({ userId: userId, weightGoal: '' })
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

const DOB = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [value, setValue] = useState(
    defaultValue ? new Date(defaultValue) : null,
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateDOB.useMutation({
    onMutate: async (newData) => {
      await utils.settings.get.cancel({ userId: userId })
      const previousData = utils.settings.get.getData({
        userId: userId,
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
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
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
            setOpen={setPopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button
                onClick={() => setPopoverOpen(true)}
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
            <PopoverContent className='z-10 mt-[-10rem] border-gray-600 bg-black py-3 text-gray-200 md:px-3'>
              <div>
                <XIcon
                  onClick={() => setPopoverOpen(false)}
                  className='float-right h-5 w-5 cursor-pointer'
                />
              </div>
              <Calendar
                mode='single'
                selected={value ? value : undefined}
                onSelect={(e) => {
                  setValue(e)
                }}
                defaultMonth={value ? value : undefined}
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

const ActivityLevelTraining = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const utils = api.useContext()
  const { mutate } = api.settings.updateActivityLevelTraining.useMutation({
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
          activityLevelTraining: newData.activityLevelTraining,
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
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Training</h4>
        <p className='h-8 text-base capitalize text-gray-400'>
          {defaultValue == '' ? '.' : defaultValue}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='flex w-full items-end gap-4'>
          <Listbox
            value={value}
            onChange={(e) => setValue(e)}
          >
            <div className='z-1 relative w-full'>
              <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left capitalize shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
                <span
                  className={`block truncate ${
                    value === '' ? 'text-sm text-gray-500' : ''
                  }`}
                >
                  {value === '' ? 'Training' : value}
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
                <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 capitalize shadow-lg '>
                  {['sedentary', 'mild', 'moderate', 'heavy', 'extreme'].map(
                    (t, Idx) => (
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
                    ),
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <ActivityPopover />
        </div>
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', activityLevelTraining: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              mutate({ userId: user?.id || '', activityLevelTraining: '' })
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

const ActivityLevelRest = ({
  defaultValue,
  userId,
}: {
  defaultValue: string
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const utils = api.useContext()
  const { mutate } = api.settings.updateActivityLevelRest.useMutation({
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
          activityLevelRest: newData.activityLevelRest,
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
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Rest</h4>
        <p className='h-8 text-base capitalize text-gray-400'>
          {defaultValue == '' ? '.' : defaultValue}
        </p>
      </div>
      <ModalWrapper
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className='flex w-full items-end gap-4'>
          <Listbox
            value={value}
            onChange={(e) => setValue(e)}
          >
            <div className='z-1 relative w-full'>
              <Listbox.Button className='relative h-10 w-full cursor-default border-b border-gray-600 pl-3 pr-10 text-left capitalize shadow-md hover:border-white focus:outline-none md:w-[230px] md:px-2 '>
                <span
                  className={`block truncate ${
                    value === '' ? 'text-sm text-gray-500' : ''
                  }`}
                >
                  {value === '' ? 'Rest' : value}
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
                <Listbox.Options className='max-h-120 absolute z-10 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 capitalize shadow-lg '>
                  {['sedentary', 'mild', 'moderate', 'heavy', 'extreme'].map(
                    (t, Idx) => (
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
                    ),
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <ActivityPopover />
        </div>
        <div className='mt-4 flex justify-center gap-2'>
          <Button
            onClick={() => {
              if (!value) return
              mutate({ userId: user?.id || '', activityLevelRest: value })
              setIsOpen(false)
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              mutate({ userId: user?.id || '', activityLevelRest: '' })
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

const ActivityPopover = () => {
  return (
    <Popover className=''>
      {({ open }) => (
        <>
          <Popover.Button>
            <QuestionMarkCircleIcon className='h-6 w-6 text-gray-400' />
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
            <Popover.Panel className='absolute bottom-0 left-[-1rem] z-10 w-[100vw] max-w-md px-4 sm:px-0'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='bg-gray-900 p-4 text-lg'>
                  <ul>
                    <li>
                      <span className='font-semibold'>Sedentary </span>- no
                      exercise
                    </li>
                    <li>
                      <span className='font-semibold'>Mild </span>- 20min
                    </li>
                    <li>
                      <span className='font-semibold'>Moderate </span>- 30-60min
                    </li>
                    <li>
                      <span className='font-semibold'>Heavy </span>- greater
                      than 60min
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
  )
}

const SquatOneRM = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateSquatOneRepMax.useMutation({
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
          squatOneRepMax: new Decimal(newData.squatOneRepMax),
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
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Squat 1 Rep Max</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue) == 0 ? '.' : `${Number(defaultValue)}kg`}
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
              mutate({ userId: user?.id || '', squatOneRepMax: value })
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

const BenchOneRM = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateBenchOneRepMax.useMutation({
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
          benchOneRepMax: new Decimal(newData.benchOneRepMax),
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
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Bench 1 Rep Max</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue) == 0 ? '.' : `${Number(defaultValue)}kg`}
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
              mutate({ userId: user?.id || '', benchOneRepMax: value })
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

const DeadOneRM = ({
  defaultValue,
  userId,
}: {
  defaultValue: Decimal | number
  userId: string
}) => {
  const user = { id: userId }
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState(
    Number(defaultValue) == 0 ? undefined : Number(defaultValue),
  )
  const utils = api.useContext()
  const { mutate } = api.settings.updateDeadliftOneRepMax.useMutation({
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
          deadliftOneRepMax: new Decimal(newData.deadliftOneRepMax),
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
      <div
        className='w-fit cursor-pointer pr-8'
        onClick={() => setIsOpen(true)}
      >
        <h4 className='text-xl'>Deadlift 1 Rep Max</h4>
        <p className='h-8 text-base text-gray-400'>
          {Number(defaultValue) == 0 ? '.' : `${Number(defaultValue)}kg`}
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
              mutate({ userId: user?.id || '', deadliftOneRepMax: value })
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

const RoleToggle = ({
  value,
  userId,
  title,
  field,
}: {
  value: boolean
  userId: string
  title: string
  field: string
}) => {
  const utils = api.useContext()
  const { mutate } = api.settings.updateRole.useMutation({
    onMutate: async (newData) => {
      await utils.users.get.cancel({ userId: userId })
      const previousData = utils.users.get.getData({
        userId: userId,
      })

      if (!previousData) return { previousData }

      utils.users.get.setData(
        { userId: userId },
        {
          ...previousData,
          [field]: newData.value,
        },
      )

      return { previousData }
    },
    onError: (err, _newData, context) => {
      console.log(err)
      utils.users.get.setData({ userId: userId || '' }, context?.previousData)
    },
  })
  const onChange = () => {
    mutate({ userId: userId, value: !value, role: field })
  }

  return (
    <>
      <div className='mb-2 flex items-center justify-start gap-4 text-lg text-gray-600 sm:gap-6'>
        <label className={value ? `w-48 scale-110 text-gray-200` : `w-48`}>
          {title}
        </label>
        <Switch
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          checked={value}
          onChange={onChange}
          className={`${value ? 'bg-gray-200' : 'bg-gray-600'}
          relative inline-flex h-[24px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75  sm:h-[28px] sm:w-[74px]`}
        >
          <span
            aria-hidden='true'
            className={`${value ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[24px] transform rounded-full bg-gray-900 shadow-lg ring-0 transition duration-200 ease-in-out sm:h-[24px] sm:w-[34px]`}
          />
        </Switch>
      </div>
    </>
  )
}

const Settings = ({ userId }: { userId: string }) => {
  const { data: session } = useSession()
  const isAdmin = session?.user?.isAdmin
  const { data: user } = api.users.get.useQuery({
    userId: userId,
  })

  const { data: userSettings, isLoading: settingsLoading } =
    api.settings.get.useQuery({
      userId: userId,
    })

  console.log({ user })

  if (settingsLoading) return <LoadingPage />
  if (!user) return null

  return (
    <>
      <div className='mb-8 flex justify-center '>
        <div className='flex w-full flex-col gap-2 px-4 py-2'>
          <div className='flex items-center justify-between text-yellow-500'>
            <div className='flex gap-1 text-2xl font-semibold text-yellow-500'>
              {user.firstName} {user.lastName}
            </div>
          </div>
          <FirstName
            userId={userId}
            name={user.firstName || ''}
          />
          <LastName
            userId={userId}
            name={user.lastName || ''}
          />
          <Email
            userId={userId}
            name={user.email || ''}
          />
          <Height
            userId={userId}
            height={userSettings?.height || 0}
          />
          <Weight
            userId={userId}
            defaultValue={userSettings?.weight || 0}
          />
          <TargetWeight
            userId={userId}
            defaultValue={userSettings?.targetWeight || 0}
          />
          <WeightGoal
            userId={userId}
            defaultValue={userSettings?.weightGoal || ''}
          />
          <DOB
            userId={userId}
            defaultValue={userSettings?.DOB || null}
          />
          <Gender
            userId={userId}
            defaultValue={userSettings?.gender || ''}
          />
          <div className='flex flex-col gap-0'>
            <div className='item-baseline flex gap-4'>
              <h2 className='text-xl font-medium'>Activity Level</h2>
            </div>
            <div className='ml-4 flex flex-col gap-0'>
              <ActivityLevelTraining
                userId={userId}
                defaultValue={userSettings?.activityLevelTraining || ''}
              />
              <ActivityLevelRest
                userId={userId}
                defaultValue={userSettings?.activityLevelRest || ''}
              />
            </div>
            <SquatOneRM
              userId={userId}
              defaultValue={userSettings?.squatOneRepMax || 0}
            />
            <BenchOneRM
              userId={userId}
              defaultValue={userSettings?.benchOneRepMax || 0}
            />
            <DeadOneRM
              userId={userId}
              defaultValue={userSettings?.deadliftOneRepMax || 0}
            />
          </div>
          {isAdmin && (
            <div className='w-fit rounded-xl border border-gray-600 px-8 py-4'>
              <RoleToggle
                value={user.isClient}
                title='Client'
                field='isClient'
                userId={userId}
              />
              <RoleToggle
                value={user.isRecordEditor}
                title='Edit Records'
                field='isRecordEditor'
                userId={userId}
              />
              <RoleToggle
                value={user.isAdmin}
                title='Admin'
                field='isAdmin'
                userId={userId}
              />
              {session?.user?.isRoot && (
                <div className='mt-16 flex flex-col gap-1'>
                  <RoleToggle
                    value={user.isRoot}
                    title='Root'
                    field='isRoot'
                    userId={userId}
                  />
                  <div className='mt-4' />
                  <RoleToggle
                    value={user.isDiet}
                    title='Nutrition Client'
                    field='isDiet'
                    userId={userId}
                  />
                  <RoleToggle
                    value={user.isDietTrainer}
                    title='Dietitian'
                    field='isDietTrainer'
                    userId={userId}
                  />
                  <RoleToggle
                    value={user.isHiit}
                    title='Hiit Client'
                    field='isHiit'
                    userId={userId}
                  />
                  <RoleToggle
                    value={user.isHiitTrainer}
                    title='Hiit Trainer'
                    field='isHiitTrainer'
                    userId={userId}
                  />
                  <RoleToggle
                    value={user.isPower}
                    title='PowerLifter'
                    field='isPower'
                    userId={userId}
                  />
                  <RoleToggle
                    value={user.isPowerTrainer}
                    title='Power Lifting Trainer'
                    field='isPowerTrainer'
                    userId={userId}
                  />
                  <RoleToggle
                    value={user.isSuper}
                    title='Super'
                    field='isSuper'
                    userId={userId}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Settings
