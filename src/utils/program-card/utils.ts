import getWeight from '~/utils/getWeight'

import { Prisma, OneRepMax, RPEIndex } from '@prisma/client'

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
  userCoreOneRM: OneRepMax[],
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

export const rpeChart = [
  [100.0, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0],
  [97.8, 93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7],
  [95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3],
  [93.9, 90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0],
  [92.9, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6],
  [90.7, 87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3],
  [89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9],
  [87.8, 85.0, 82.4, 79.9, 77.4, 75.1, 72.3, 69.4, 66.7, 64.0, 61.3, 58.6],
  [86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68.0, 65.3, 62.6, 59.9, 57.4],
]

export const calcRPEWeight = (
  rpe: number,
  reps: number,
  userCoreOneRM: OneRepMax[],
  lift: string,
  selectedEnergy: string | null,
  rpeData: RPEIndex[] | undefined,
) => {
  let energyAdjust = 1
  if (selectedEnergy === 'B') energyAdjust = 0.98
  if (selectedEnergy === 'C') energyAdjust = 0.96
  if (selectedEnergy === 'D') energyAdjust = 0.94

  const oneRM = userCoreOneRM?.find(
    (coreLift) => coreLift?.lift === lift.toLowerCase(),
  )?.weight

  if (!oneRM) return null

  let rpeIndex = 8
  if (rpe === 10) rpeIndex = 0
  if (rpe === 9.5) rpeIndex = 1
  if (rpe === 9) rpeIndex = 2
  if (rpe === 8.5) rpeIndex = 3
  if (rpe === 8) rpeIndex = 4
  if (rpe === 7.5) rpeIndex = 5
  if (rpe === 7) rpeIndex = 6
  if (rpe === 6.5) rpeIndex = 7

  let percent = 100

  const rpeChartNum = Number(rpeData?.find((r) => r.name === `${rpeIndex}-${reps}`)?.value) || 0

  if (rpeChartNum !== 0) {
    percent =
      Number(rpeData?.find((r) => r.name === `${rpeIndex}-${reps}`)?.value) || 0
  } else {
    percent = rpeChart?.[rpeIndex]?.[reps - 1] || 0
  }

  const res =
    Math.round((((+oneRM * percent) / 100) * energyAdjust) / 2.5) * 2.5
  return res
}
