import { useSession } from 'next-auth/react'

import { api } from '~/utils/api'
import { Switch } from '@headlessui/react'
import { LoadingPage } from '~/components/loading'
import FirstName from './firstName'
import LastName from './lastName'
import Email from './email'
import Height from './height'
import Weight from './weight'
import TargetWeight from './targetWeight'
import DOB from './dob'
import Gender from './gender'
import Delete from './delete'

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
  const currentUserId = session?.user?.id || ''
  const { data: currentUser } = api.users.get.useQuery({
    userId: currentUserId,
    location: 'settings_isAdmin',
  })
  const isAdmin = currentUser?.isAdmin
  const isRoot = currentUser?.isRoot

  const { data: user } = api.users.get.useQuery({ userId: userId, location: 'settings_user' })

  const { data: userSettings, isLoading: settingsLoading } =
    api.settings.get.useQuery({
      userId: userId,
    })

  if (settingsLoading) return <LoadingPage />
  if (!user) return null

  return (
    <>
      <div className='mb-8 flex justify-center '>
        <div className='flex w-full flex-col gap-2 px-4 py-2'>
          <div className='flex items-center justify-between text-yellow-500'>
            <div className='flex hidden gap-1 text-2xl font-semibold text-yellow-500'>
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
          <DOB
            userId={userId}
            defaultValue={userSettings?.DOB || null}
          />
          <Gender
            userId={userId}
            defaultValue={userSettings?.gender || ''}
          />
          {isAdmin && (
            <div className='flex w-fit flex-col rounded-xl border border-gray-600 px-8 py-4'>
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
              <RoleToggle
                value={user.isPower}
                title='PowerLifter'
                field='isPower'
                userId={userId}
              />
              {isRoot && (
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
                  <Delete
                    userId={userId}
                    defaultValue={userSettings?.gender || ''}
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
