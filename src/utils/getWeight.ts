export default function getWeight(weight: number, onerm: number): number {
  const res = Math.round((weight * (onerm / 100)) / 2.5) * 2.5
  return res;
}
