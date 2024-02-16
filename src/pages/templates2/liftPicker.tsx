import { useState } from 'react'

import { api } from '~/utils/api'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LiftPicker = ({
  onChange,
  value,
}: {
  onChange: (arg0: string) => void
  value: string
}) => {
  const [selectedLift, setSelectedLift] = useState(value)

  const { data: lifts, isLoading: primaryLiftsLoading } =
    api.primaryLifts.getAll.useQuery()

  if (primaryLiftsLoading) return null
  if (!lifts) return null

  if (lifts.find((lift) => lift.name === 'unlinked') === undefined) {
    lifts.unshift({ id: 'unlinked', name: 'unlinked' })
  }

  return (
    <>
      <Select
        onValueChange={(e) => {
          onChange(e)
          setSelectedLift(e)
        }}
        defaultValue={selectedLift}
      >
        <SelectTrigger className='capitalize'>
          <SelectValue placeholder='Link a lift' />
        </SelectTrigger>
        <SelectContent>
          {lifts.map((lift, idx) => (
            <SelectItem
              className='capitalize'
              key={idx}
              value={lift.name}
            >
              {lift.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default LiftPicker
