import { Prisma } from '@prisma/client'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { api } from '~/utils/api'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import ProgramInterval from '~/components/settings/programInterval'
import { Button } from '@/components/ui/button'

const userWithProfile = Prisma.validator<Prisma.UserArgs>()({
  include: {
    userProfiles: true,
  },
})

type User = Prisma.UserGetPayload<typeof userWithProfile>

const UserTemplate = ({ user }: { user: User }) => {
  const utils = api.useContext()
  const { mutate: updateChecked } = api.settings.updateChecked.useMutation({
    onMutate: () => {
      if (!user.userProfiles?.[0]) return
      user.userProfiles[0].isChecked = !isChecked
    },
    onSuccess: async () => {
      await utils.users.getAllUsersProfiles.invalidate()
    },
    onError: (err, _newData) => {
      console.log(err)
    },
  })

  const isChecked = user.userProfiles[0]?.isChecked === true ? true : false

  const onChange = () => {
    updateChecked({
      userId: user.id,
      value: !isChecked,
    })
  }
  return (
    <>
      <div
        key={user.id}
        className='grid grid-cols-6 items-center text-lg'
      >
        <ProgramInterval
          name={user.userProfiles[0]?.programInterval || ''}
          userId={user.id}
        />
        <div
          className={`col-span-3 capitalize tracking-tighter text-foreground overflow-hidden ${
            isChecked ? 'font-semibold text-yellow-500' : ''
          } `}
        >
          {user.firstName}
          {` `}
          {user.lastName}
        </div>
        <Checkbox
          className='h-5 w-5 justify-self-center border-2 data-[state=checked]:border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-gray-900'
          checked={isChecked}
          onCheckedChange={onChange}
        />
      </div>
    </>
  )
}

const UserProgramCheck = () => {
  const { data: users } = api.users.getAllUsersProfiles.useQuery()
  const utils = api.useContext()

  const { mutate: clearChecked } = api.settings.clearChecked.useMutation({
    onSuccess: () => {
      void utils.users.getAllUsersProfiles.invalidate()
    },
  })

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <ChevronsLeft
          size={48}
          strokeWidth={2}
          className='absolute right-0 top-1/2 hidden -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200 md:block'
        />
      </SheetTrigger>
      <SheetContent
        className='max-h-[calc(100vh-4rem)] px-1 py-6'
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <ScrollArea className='h-[calc(100vh-6rem)]'>
          <SheetHeader>
            <SheetClose />
          </SheetHeader>
          <SheetDescription
            asChild
            className='mt-3 pl-12'
          >
            <div className='flex flex-col gap-1'>
              {users &&
                users.map((user) => (
                  <UserTemplate
                    key={user.id}
                    user={user}
                  />
                ))}
            </div>
          </SheetDescription>
          <SheetFooter className='grid grid-cols-5 items-center text-base'>
            <div className='col-span-4'></div>
            <Button onClick={() => clearChecked()}>Clear All</Button>
          </SheetFooter>
          <SheetClose asChild>
            <ChevronsRight
              size={48}
              strokeWidth={2}
              className='absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200'
            />
          </SheetClose>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default UserProgramCheck
