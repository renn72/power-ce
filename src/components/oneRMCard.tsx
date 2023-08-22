import React, {
  useState, Fragment, useEffect,
} from 'react'
import dayjs from 'dayjs'

import Decimal from 'decimal.js'

import {
  Dialog,
  Transition,
} from '@headlessui/react'
import { Input, } from '@/components/ui/input'
import { toast, } from 'react-hot-toast'

import {
  ArrowUpIcon,
  ArrowDownIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from '@heroicons/react/24/outline'

import { api, } from '~/utils/api'

import relativeTime from 'dayjs/plugin/relativeTime'
import { LoadingSpinner, } from './loading'
import { Button, } from '@/components/ui/button'
dayjs.extend(relativeTime)

const LiftInput = ({
  lift, weight, onUpdateOneRM, idx, openIdx, setOpenIdx,
}: {
  lift: string, weight: number, onUpdateOneRM: (lift: string, weight: number) => void, idx: number, openIdx: number, setOpenIdx: (idx: number) => void,
}) => {
  const [
    isEditing,
    setIsEditing,
  ] = useState(false)
  const [
    newWeight,
    setNewWeight,
  ] = useState(weight || '')

  const onEdit = () => {
    setIsEditing(true)
    setOpenIdx(idx)
  }

  const onSave = () => {
    setIsEditing(false)
    setOpenIdx(-1)
    onUpdateOneRM(lift, +newWeight)
  }

  useEffect(() => {
    if (openIdx !== idx) {
      if (isEditing) {
        setIsEditing(false)
        onUpdateOneRM(lift, +newWeight)
      }
    }
  }, [
    openIdx,
    idx,
  ])

  useEffect(() => {
    setNewWeight(weight)
  }, [weight,])

  return (
    <div className='flex gap-2 items-center justify-between'>
      <div className='flex gap-2 items-center'>
        {
          isEditing
            ? (
              <>
                <Input
                  type='number'
                  value={newWeight}
                  onChange={(e) => setNewWeight(Number(e.target.value))}
                  className='w-20 text-gray-400 text-lg font-semibold'
                />
                <Button onClick={onSave} className='hover:bg-green-900' >
                  <PencilSquareIcon className='h-5 w-5' />
                </Button>
              </>
            )
            : (
              <div className='flex gap-2 items-center'>
                <div className='text-gray-300 font-semibold text-lg'>
                  {weight || newWeight}
                  {weight && ' kg'}
                </div>
                <Button onClick={onEdit} className='hover:bg-green-800' >
                  <PencilSquareIcon className='h-5 w-5' />
                </Button>
              </div>
            )
        }
      </div>
    </div>
  )
}

const OneRMCard = ({ userId, }: { userId: string }) => {
  const [
    openIdx,
    setOpenIdx,
  ] = useState(-1)
  const ctx = api.useContext()
  const utils = api.useContext()

  const {
    data: primaryLifts, isLoading: primaryLiftsLoading,
  } = api.primaryLifts.getAll.useQuery()

  const {
    data: userCoreOneRM, isLoading: userCoreOneRMLoading,
  } = api.oneRepMax.getUserCoreLifts.useQuery({ userId: userId, })

  const { mutate: createUserCoreOneRM, } = api.oneRepMax.create.useMutation({
    onMutate: async (newOneRM) => {
      await ctx.oneRepMax.getUserCoreLifts.cancel()

      const previousList = ctx.oneRepMax.getUserCoreLifts.getData()
      utils.oneRepMax.getUserCoreLifts.setData({ userId, }, (prev) => {
        console.log('prev', prev)
        return prev
      })

      utils.oneRepMax.getUserCoreLifts.setData({ userId, }, (prev) => prev?.map((lift) => {
        if (lift.lift === newOneRM.lift.toLowerCase()) {
          return {
            ...lift,
            weight: +newOneRM.weight,
          }
        }
        return lift
      }))
      return previousList
    },

    onSettled: async () => {
      await ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
    onError: (e) => {
      console.log('error', e)
      toast.error('Error')
    },
  })

  const { mutate: deleteUserCoreOneRM, } = api.oneRepMax.delete.useMutation({
    onSuccess: () => {
      void ctx.oneRepMax.getUserCoreLifts.invalidate()
    },
  })

  const onUpdateOneRM = (lift: string, weight: number) => {
    createUserCoreOneRM({
      userId: userId, lift: lift.toLowerCase(), weight: +weight,
    })
  }

  const onClearAll = () => {
    userCoreOneRM?.forEach((x) => {
      deleteUserCoreOneRM({
        userId: x.userId, lift: x.lift,
      })
    })
  }

  if (userCoreOneRMLoading) return <div className='flex justify-center' ><LoadingSpinner size={30} /></div>

  return (
    <>
      <div>
        <div
          className='grid text-gray-300 grid-cols-1 md:grid-cols-3 '
        >
          {primaryLifts?.map((lift, idx) => (
            <div
              key={lift.id}
              className='flex gap-2 items-center justify-between py-2 px-4'
            >
              <div className='capitalize text-lg'>
                {lift.name}
              </div>
              <div>
                {/* <Input */}
                {/*   type='number' */}
                {/*   value={userCoreOneRM?.find((x) => x.lift === lift.name.toLowerCase())?.weight || null} */}
                {/*   onChange={(e) => onUpdateOneRM(lift.name, parseFloat(e.target.value))} */}
                {/*   className='text-lg w-32 font-semibold py-2 text-center focus:ring-gray-500 focus:border-gray-500 border-gray-600 rounded-md' */}
                {/* /> */}
                <LiftInput
                  idx={idx}
                  openIdx={openIdx}
                  setOpenIdx={setOpenIdx}
                  lift={lift.name}
                  weight={userCoreOneRM?.find((x) => x.lift === lift.name.toLowerCase())?.weight}
                  onUpdateOneRM={onUpdateOneRM}
                />
              </div>
            </div>
          ))
          }

        </div>
        <div className='flex justify-center gap-4 mt-6'>
          <Button
            className=''
            onClick={() => {
              void ctx.oneRepMax.getUserCoreLifts.invalidate()
            }}
          >
            Refresh
          </Button>
          <Button
            className=''
            onClick={onClearAll}
          >
            Clear All
          </Button>
        </div>
      </div>
    </>
  )
}

export default OneRMCard
