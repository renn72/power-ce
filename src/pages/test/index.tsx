import { api, } from '~/utils/api'

import { toast, } from 'react-hot-toast'
import { testBlock, } from '~/store/defaultValues'
import { Button, } from '@/components/ui/button'
const Test = () => {
  const ctx = api.useContext()
  const {
    data: allTemplates, isLoading: tempLoading,
  } = api.blocks.getAll.useQuery()
  const {
    data: allPrograms, isLoading: proLoading,
  } = api.blocks.getAllPrograms.useQuery()
  const { mutate: deleteTemplate, } = api.blocks.hardDelete.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.blocks.getAll.invalidate()
      void ctx.blocks.getAllPrograms.invalidate()
    },
  })
  const { mutate: blockCreateMutate, } = api.blocks.create.useMutation({
    onSuccess: () => {
      console.log('success')
      toast.success('Saved')
      void ctx.blocks.getAll.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const {
    data: primaryLifts, isLoading: primaryLiftsLoading,
  } = api.primaryLifts.getAll.useQuery()

  const {
    data: allUsers, isLoading: usersLoading,
  } = api.users.getAll.useQuery()

  const { mutate: createUserCoreOneRM, } = api.oneRepMax.create.useMutation({
    onSettled: async () => {
      await ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })
  const { mutate: deleteAllRM, } = api.oneRepMax.deleteAll.useMutation({
    onSuccess: () => {
      console.log('deleted')
      void ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
  })
  const onUpdateOneRM = (userId: string, lift: string, weight: number) => {
    createUserCoreOneRM({
      userId: userId, lift: lift.toLowerCase(), weight: +weight,
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

  if (tempLoading && proLoading && primaryLiftsLoading && usersLoading) return <div>Loading</div>

  const all = allTemplates?.concat(allPrograms)

  const onDelete = (id: string) => {
    console.log('delete', id)
    deleteTemplate({ id: id, })
  }

  const onCreate = () => {

    console.log('create')
    blockCreateMutate(testBlock)
  }

  const onDeleteAll = () => {
    console.log('delete')
    deleteAllRM()
  }

  return (
    <div>
      <div>
        <h1>Templates</h1>
        {all?.map((template) => (
          <div
            key={template.id}
            className='flex divide-x-2 divide-gray-200 items-center'
          >
            <h2
              className='m-1 p-1'
            >{template.name}</h2>
            <h3
              className='m-2 p-2'
            >{template.isProgram ? 'program' : 'template'}</h3>
            <h3
              className='m-2 p-2'
            >{template.isProgramActive && 'active'}</h3>
            <h3
              className='m-2 px-8 text-2xl cursor-pointer'
              onClick={() => onDelete(template.id)}
            >X</h3>
          </div>
        ))}
        <div className='flex flex-col gap-6'>

          <Button
            className='w-44'
            onClick={onCreate}
          >
            create tempate
          </Button>
          <Button
            className='w-44'
            onClick={onGenerate}>
            Generate 1rm
          </Button>
          <Button
            className='w-44'
            onClick={onDeleteAll}>
            Delete 1rm
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Test
