import React, { useEffect, useState } from 'react'

import { api } from '~/utils/api'

import Countdown from 'react-countdown'

const CountDown = ({ userId }: { userId: string }) => {
  const [compDate, setCompDate] = useState<Date>()
  const [compName, setCompName] = useState<string>('')
  const { data: compDateUser } = api.compDate.getUser.useQuery({userId: userId})

  useEffect(() => {
    if (compDateUser) {
      setCompDate(new Date(compDateUser.date))
      setCompName(compDateUser.name)
    }
  }, [compDateUser])

  return (
    <>
      {compDate && compName && (
        <div className='flex flex-col items-center md:flex-row md:items-baseline md:gap-4'>
          <h2 className='text-lg font-bold text-gray-300'>{compName}</h2>
          <Countdown
            className='text-xl font-bold w-40 text-gray-400'
            date={compDate}
          />
        </div>
      )}
    </>
  )
}

export default CountDown
