import { api } from '~/utils/api'

import { toast } from 'react-hot-toast'
import { testBlock, testBlock2 } from '~/store/defaultValues'
import { Button } from '@/components/ui/button'
const Test = () => {
  const ctx = api.useContext()
  const { data: all, isLoading: tempLoading } =
    api.blocks.getAllAdmin.useQuery()

  const { mutate: deleteTemplate } = api.blocks.hardDelete.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.blocks.getAllAdmin.invalidate()
    },
  })

  const { mutate: deleteSoftTemplate } = api.blocks.softDelete.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.blocks.getAllAdmin.invalidate()
    },
  })

  const { mutate: undeleteSoftTemplate } = api.blocks.softUnDelete.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.blocks.getAllAdmin.invalidate()
    },
  })

  const { mutate: blockCreateMutate } = api.blocks.create.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllAdmin.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const { mutate: cleanSets } = api.programs.cleanSets.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.blocks.getAllAdmin.invalidate()
    },
  })

  const onCleanSets = () => {
    console.log('clean')
    cleanSets()
  }

  const { data: allUserPrograms } = api.userPrograms.getAll.useQuery()

  const { data: primaryLifts, isLoading: primaryLiftsLoading } =
    api.primaryLifts.getAll.useQuery()

  const { data: allUsers, isLoading: usersLoading } =
    api.users.getAll.useQuery()

  const { mutate: createUserCoreOneRM } = api.oneRepMax.create.useMutation({
    onSettled: async () => {
      await ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const { mutate: deleteAllRM } = api.oneRepMax.deleteAll.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
  })

  const { mutate: deleteUserProgram } = api.userPrograms.deleteHard.useMutation(
    {
      onSuccess: () => {
        console.log('deleted')
        void ctx.userPrograms.getAll.invalidate()
        void ctx.blocks.getAllAdmin.invalidate()
      },
    },
  )

  const onUpdateOneRM = (userId: string, lift: string, weight: number) => {
    createUserCoreOneRM({
      userId: userId,
      lift: lift.toLowerCase(),
      weight: +weight,
    })
  }
  const onGenerate = () => {
    console.log('gen')
    allUsers?.admins?.forEach((user) => {
      primaryLifts?.forEach((lift) => {
        const weight = (Math.floor(Math.random() * 15) + 5) * 10
        onUpdateOneRM(user.id, lift.name, weight)
      })
    })
    allUsers?.users?.forEach((user) => {
      primaryLifts?.forEach((lift) => {
        const weight = (Math.floor(Math.random() * 15) + 5) * 10
        onUpdateOneRM(user.id, lift.name, weight)
      })
    })
  }

  if (tempLoading && primaryLiftsLoading && usersLoading)
    return <div>Loading</div>

  const onDeleteUserProgram = (id: string) => {
    console.log('delete', id)
    deleteUserProgram({ id: id })
  }

  const onDelete = (id: string) => {
    console.log('delete', id)
    deleteTemplate({ id: id })

    // all
    //   ?.filter((t) => t.isProgram &&  t.isDeleted)
    //   ?.map((template) => deleteTemplate({ id: template.id }))
  }

  const onDeleteSoft = (id: string) => {
    console.log('delete', id)
    deleteSoftTemplate({ id: id })
  }

  const onUnDeleteSoft = (id: string) => {
    console.log('delete', id)
    undeleteSoftTemplate({ id: id })
  }

  const onCreate = () => {
    console.log('create')
    blockCreateMutate(testBlock)
  }
  const onCreate2 = () => {
    console.log('create')
    blockCreateMutate(testBlock2)
  }

  const onDeleteAll = () => {
    console.log('delete')
    deleteAllRM()
  }

  const me = 'user_2Pg92dlfZkKBNFSB50z9GJJBJ2a'

  return <div className='flex gap-12'>
    <div className='w-[280px] h-[900px] border border-gray-600 shrink-0'>
      sidebar
    </div>
    <div className='w-[680px] h-[900px] border border-gray-600 shrink-0'>
      content
    </div>
  </div>
}

export default Test
