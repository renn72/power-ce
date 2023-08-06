import { type Exercise as StoreExercise, } from '~/store/types'

import  getWeight from '~/utils/getWeight'

const checkWeight = (exercise: StoreExercise, range: boolean, energyRating: string | null, coreLifts: number[]) => {
  const lift = exercise.lift
  let energyAdjust = 1
  if (energyRating === 'B') energyAdjust = 0.98
  if (energyRating === 'C') energyAdjust = 0.96
  if (energyRating === 'D') energyAdjust = 0.94

  let onerm = exercise.onerm
  let onermTop = exercise.onermTop

  const squat = coreLifts[0]
  const deadlift = coreLifts[1]
  const bench = coreLifts[2]

  if (!lift) return null
  if (!onerm) return null
  if (lift === 'unlinked') return null

  onerm = +onerm * energyAdjust
  if (onermTop) onermTop = +onermTop * energyAdjust

  if (lift === 'Squat') {
    if (!squat || squat === 0) return null
    if (range) {
      if (onermTop) {
        return `${getWeight(+squat, +onerm)}kg-${getWeight(+squat, +onermTop)}kg`
      } else {
        return `${getWeight(+squat, +onerm)}kg-${getWeight(+squat, +onerm * 1.05)}kg`
      }
    }
    return getWeight(+squat, +onerm)
  }
  if (lift === 'Deadlift') {
    if (!deadlift || deadlift === 0) return null
    if (range) {
      if (onermTop) {
        return `${getWeight(+deadlift, +onerm)}kg-${getWeight(+deadlift, +onermTop)}kg`
      } else {
        return `${getWeight(+deadlift, +onerm)}kg-${getWeight(+deadlift, +onerm * 1.05)}kg`
      }
    }
    return getWeight(+deadlift, +onerm)
  }
  if (lift === 'Bench') {
    if (!bench || bench === 0) return null
    if (range) {
      if (onermTop) {
        return `${getWeight(+bench, +onerm)}kg-${getWeight(+bench, +onermTop)}kg`
      } else {
        return `${getWeight(+bench, +onerm)}kg-${getWeight(+bench, +onerm * 1.05)}kg`
      }
    }
    return getWeight(+bench, +onerm)
  }
  return null
}

export default checkWeight
