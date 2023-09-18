import React, { useState } from 'react'
import { type NextPage } from 'next'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-hot-toast'
import { api } from '~/utils/api'

import { Disclosure, Transition } from '@headlessui/react'

import { ChevronUpIcon } from '@heroicons/react/20/solid'
import TemplateSelect from './templateSelect'
import { LoadingPage } from '~/components/loading'
import OneRMCard from '~/components/oneRMCard'

import ProgramView from './programView'
import CompDate from '~/components/compDate'
import UserSelect from './userSelect'

import CountDown from '~/components/countDown'

const UserDisclosure = ({
  userId,
  isOneRM,
}: {
  userId: string
  isOneRM: boolean
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
            } flex items-center gap-2 px-2 py-2 text-lg font-medium `}
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
              <ProgramView userId={userId} />
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
  const { data: allUserPrograms } = api.blocks.getAllUserProgramsTitles.useQuery({
    userId: userId,
  })
  const activePro = allUserPrograms?.filter((p) => p.isProgramActive)

  return (
    <div className='flex w-full flex-col justify-start gap-2'>
      <div className='p-2'>
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
      <CompDate userId={userId} />
      <UserDisclosure
        userId={userId}
        isOneRM={true}
      />
      {activePro?.length && activePro.length > 0 ? (
        <UserDisclosure
          userId={userId}
          isOneRM={false}
        />
      ) : null}
    </div>
  )
}

const Users: NextPage = () => {
  const { user } = useUser()
  const [userId, setUserId] = useState<string>(() => user?.id || '')
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
        void ctx.blocks.getAll.invalidate()
        void ctx.blocks.getAllPrograms.invalidate()
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
        void ctx.blocks.getAll.invalidate()
        void ctx.blocks.getAllPrograms.invalidate()
      },
      onError: (e) => {
        console.log('error', e)
        toast.error('Error')
      },
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

  const getFirstName = (id: string) => {
    const res = allUsers?.find((u) => u.id == id)?.firstName
    return res ? res : ''
  }
  const getLastName = (id: string) => {
    const res = allUsers?.find((u) => u.id == id)?.lastName
    return res ? res : ''
  }

  if (usersLoading || blocksLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    )
  }

  return (
    <>
      <main className='flex h-full flex-col'>
        <div className=' flex w-full flex-col items-center justify-center gap-8 py-6 sm:px-2 md:mt-6 '>
          <UserSelect onSelectUser={setUserId} />
          {userId === 'all' ? (
            <div className='flex w-full flex-col gap-16'>
              {allUsers?.map((user) => (
                <UserPage
                  key={user.id}
                  userId={user.id}
                  userFirstName={getFirstName(user.id)}
                  userLastName={getLastName(user.id)}
                  onSetTemplate={onSetTemplate}
                  onClearTemplate={onClearTemplate}
                  onSelectTemplate={onSelectTemplate}
                />
              ))}
            </div>
          ) : (
            <UserPage
              key={userId}
              userId={userId}
              userFirstName={getFirstName(userId)}
              userLastName={getLastName(userId)}
              onSetTemplate={onSetTemplate}
              onClearTemplate={onClearTemplate}
              onSelectTemplate={onSelectTemplate}
            />
          )}
        </div>
      </main>
    </>
  )
}

export default Users
