import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'
import { useSession } from 'next-auth/react'

import { Disclosure, Transition, Tab } from '@headlessui/react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'
import TemplateSelect from './templateSelect'
import { LoadingPage } from '~/components/loading'
import OneRMCard from '~/components/oneRMCard'

import ProgramView from '~/components/programView'
import CompDate from '~/components/compDate'
import UserSelect from './userSelect'

import CountDown from '~/components/countDown'
import TrainerSelect from './trainerSelect'
import Settings from '~/components/settings'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const UserDisclosure = ({
  userId,
  isOneRM,
  programId,
}: {
  userId: string
  isOneRM: boolean
  programId: string
}) => (
  <Disclosure defaultOpen={false}>
    {({ open }) => (
      <div className='flex flex-col md:gap-8'>
        <div className='flex flex-col sm:flex-row md:gap-6'>
          <Disclosure.Button
            className={`${
              open
                ? 'border-b border-yellow-500'
                : 'border-b border-black hover:border-white'
            } flex items-center gap-2 px-2 py-0 text-lg font-medium `}
          >
            <span>{isOneRM ? 'One Rep Maxes' : 'Program'}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-8 w-8 text-gray-400`}
            />
          </Disclosure.Button>
          <div className='flex gap-2'></div>
        </div>

        <Transition
          className='transition-all duration-300 ease-out'
          enterFrom='transform scale-70 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-70 opacity-0'
        >
          <Disclosure.Panel className=''>
            {isOneRM ? (
              <OneRMCard userId={userId} />
            ) : (
              <ProgramView
                userId={userId}
                isAdmin={true}
                programId={programId}
              />
            )}
          </Disclosure.Panel>
        </Transition>
      </div>
    )}
  </Disclosure>
)
const UserPage = ({
  onSelectTemplate,
  onSetTemplate,
  onClearTemplate,
  userId,
  userFirstName,
  userLastName,
}: {
  onSelectTemplate: (arg0: string, arg1: string) => void
  onSetTemplate: (arg0: string, arg1: string) => void
  onClearTemplate: (arg0: string) => void
  userId: string
  userFirstName: string | null
  userLastName: string | null
}) => {
  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  const { data: activeProgram } = api.blocks.getUserActiveProgram.useQuery({
    userId: userId,
  })

  return (
    <div className='flex w-full flex-col justify-start gap-0'>
      <div className='flex w-full justify-end'>
        <CountDown userId={userId} />
      </div>
      <TemplateSelect
        onSelectTemplate={onSelectTemplate}
        onSetTemplate={onSetTemplate}
        onClearTemplate={onClearTemplate}
        userId={userId}
        userFirstName={userFirstName}
        userLastName={userLastName}
      />
      <TrainerSelect userId={userId} />
      <CompDate userId={userId} />
      <UserDisclosure
        userId={userId}
        isOneRM={true}
        programId={''}
      />
      {activeProgram ? (
        <UserDisclosure
          userId={userId}
          isOneRM={false}
          programId={activeProgram.id}
        />
      ) : null}
    </div>
  )
}

const TabWrapper = ({ title }: { title: string }) => (
  <Tab
    className={({ selected }) =>
      classNames(
        'py-4 hover:bg-gray-900',
        selected ? 'font-semibold text-white' : 'font-medium text-gray-500',
      )
    }
  >
    {title}
  </Tab>
)

const Users = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [userId, setUserId] = useState<string>(user?.id || '')
  if (!user) return <div>Login</div>

  const ctx = api.useContext()

  const { data: allUsers, isLoading: usersLoading } =
    api.users.getAllUsers.useQuery()

  const { data: blocksData, isLoading: blocksLoading } =
    api.blocks.getAllBlockTitles.useQuery()

  const { mutate: userProgramCreateMutate } =
    api.userPrograms.create.useMutation({
      onSuccess: () => {
        toast.success('Saved')
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        void ctx.blocks.getAllUserProgramsTitles.invalidate()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
      },
    })
  const { mutate: userProgramRemoveMutate } =
    api.userPrograms.remove.useMutation({
      onSuccess: () => {
        console.log('success')
        toast.success('Removed')
        void ctx.blocks.getUserActiveProgram.invalidate()
        void ctx.blocks.getUserActiveProgramFull.invalidate()
        void ctx.blocks.getAllUserProgramsTitles.invalidate()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
      },
    })

  api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId })
  const { data: activeProgram, isLoading: loadingProgram } =
    api.blocks.getUserActiveProgram.useQuery({
      userId: userId,
    })

  const onSelectTemplate = (template: string, userId: string) => {
    console.log('template', template)
    console.log('userId', userId)
  }

  const onClearTemplate = (userId: string) => {
    console.log('userId', userId)
    userProgramRemoveMutate({ userId: userId })
  }

  const onSetTemplate = (template: string, userId: string) => {
    const templateId = blocksData?.find((block) => block.name === template)?.id
    if (!templateId) return

    userProgramCreateMutate({
      userId: userId,
      templateId: templateId,
      programId: '',
      isProgramActive: true,
    })
  }

  if (usersLoading || blocksLoading || loadingProgram) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }

  return (
    <>
      <main className='flex h-full min-w-[1200px] flex-col items-center justify-center gap-8 py-3 sm:px-6 md:mt-6 '>
        <UserSelect onSelectUser={setUserId} />
        <Tab.Group
          vertical
          defaultIndex={0}
        >
          <div className='flex w-full gap-2'>
            <Tab.List className='flex w-36 flex-col divide-y divide-gray-600'>
              <TabWrapper title='Overview' />
              <TabWrapper title='Program' />
              <TabWrapper title='One RM' />
              <TabWrapper title='Settings' />
            </Tab.List>
            <Tab.Panels className='w-full '>
              <Tab.Panel>
                <h2 className='text-2xl font-medium'>Overview</h2>
                <div className='w-64'>
                  <CountDown userId={userId} />
                </div>
                <TemplateSelect
                  onSelectTemplate={onSelectTemplate}
                  onSetTemplate={onSetTemplate}
                  onClearTemplate={onClearTemplate}
                  userId={userId}
                  userFirstName={user.firstName}
                  userLastName={user.lastName}
                />
                <TrainerSelect userId={userId} />
                <CompDate userId={userId} />
              </Tab.Panel>
              <Tab.Panel>
                <ProgramView
                  userId={userId}
                  isAdmin={true}
                  programId={activeProgram?.id || ''}
                />
              </Tab.Panel>
              <Tab.Panel>
                <OneRMCard userId={userId} />
              </Tab.Panel>
              <Tab.Panel>
                <Settings userId={userId} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </main>
    </>
  )
}

export default Users
