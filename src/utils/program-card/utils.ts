import getWeight from '~/utils/getWeight'
import { api } from '~/utils/api'

import { Prisma } from '@prisma/client'

const dayWithExercise = Prisma.validator<Prisma.DayArgs>()({
  include: {
    exercise: {
      include: {
        set: true,
      },
    },
  },
})

type Day = Prisma.DayGetPayload<typeof dayWithExercise>

export const checkWeight = (
  lift: string | null,
  onerm: number | null,
  index: number | null,
  selectedEnergy: string | null,
  day: Day | null,
  userCoreOneRM: any,
) => {
  if (!lift || !onerm) return ''
  let energyAdjust = 1
  if (+onerm < 100) {
    if (selectedEnergy === 'B') energyAdjust = 0.95
    if (selectedEnergy === 'C') energyAdjust = 0.9
    if (selectedEnergy === 'D') energyAdjust = 0.85
  }
  if (+onerm >= 100 && +onerm < 200) {
    if (selectedEnergy === 'B') energyAdjust = 0.97
    if (selectedEnergy === 'C') energyAdjust = 0.94
    if (selectedEnergy === 'D') energyAdjust = 0.91
  }
  if (+onerm >= 200) {
    if (selectedEnergy === 'B') energyAdjust = 0.985
    if (selectedEnergy === 'C') energyAdjust = 0.97
    if (selectedEnergy === 'D') energyAdjust = 0.955
  }

  if (lift == 'weight') {
    return getWeight(+onerm, 100 * energyAdjust)
  }

  if (index) {
    const rm = day?.exercise[index - 1]?.set.filter((s) => s.isComplete)
    const rmWeight = rm?.map((s) => s.estiamtedOnerm) || []
    const w = rmWeight[rmWeight.length - 1]

    if (w) return getWeight(+w, onerm * energyAdjust)
  }

  const w = userCoreOneRM?.find(
    (coreLift) => coreLift?.lift === lift.toLowerCase(),
  )?.weight

  if (!w) return ''

  return getWeight(+w, onerm * energyAdjust)
}

export const checkPercentWeight = (
  estimatedOnermIndex: number | null,
  percent: number | null,
  day: Day | null,
  selectedEnergy: string | null,
) => {
  if (!estimatedOnermIndex || !percent) return ''

  if (!day?.exercise[estimatedOnermIndex - 1]?.set[0]?.weight) return ''

  let energyAdjust = 1
  if (selectedEnergy === 'B') energyAdjust = 0.98
  if (selectedEnergy === 'C') energyAdjust = 0.96
  if (selectedEnergy === 'D') energyAdjust = 0.94

  const weight = day?.exercise[estimatedOnermIndex - 1]?.set[0]?.weight
  if (!weight) return ''
  return `${
    Math.round((((+weight * percent) / 100) * energyAdjust) / 2.5) * 2.5
  }`
}
