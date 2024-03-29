export function getRandomInt(max: number) {
  return Math.ceil(Math.random() * max)
}

export function capitaliseString(str: string | null) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function classNames(...classes : string[]) {
  return classes.filter(Boolean).join(' ')
}

export function getDate(date: string | null | Date) {
  if (!date) return ''
  const d = new Date(+date)
  return d.toLocaleDateString('en-AU', {
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  })
}

export function getTime(date: string | null) {
  if (!date) return ''
  const d = new Date(+date)
  return d.toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function getTime24(date: string | null | Date) {
  if (!date) return ''
  const d = new Date(+date)
  return d.toLocaleTimeString('en-AU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  })
}

export function getDateShort(date: string | null | Date) {
  if (!date) return ''
  const d = new Date(+date)
  return d.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'numeric',
  })
}

