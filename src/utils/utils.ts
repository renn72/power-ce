export function getRandomInt(max: number) {
  return Math.ceil(Math.random() * max);
}

export function capitaliseString(str: string | null) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
