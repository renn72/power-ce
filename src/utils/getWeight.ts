export default function getWeight(weight: number | undefined, onerm: number): number | null {
  if (!weight) return null
  const res = Math.round((weight * (onerm / 100)) / 2.5) * 2.5
  return res
}

