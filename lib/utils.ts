import { clsx, type ClassValue } from 'clsx'
import { format, parseISO, differenceInSeconds } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Strip time before parsing so timezone offsets never shift the date
function parseDateOnly(isoString: string) {
  return parseISO(isoString.split('T')[0])
}

export function formatEventDate(isoString: string): string {
  return format(parseDateOnly(isoString), 'MMMM d, yyyy')
}

export function formatEventDateShort(isoString: string): string {
  return format(parseDateOnly(isoString), 'MMM d')
}

export function formatEventYear(isoString: string): string {
  return format(parseDateOnly(isoString), 'yyyy')
}

export function getCountdownParts(targetISO: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
} {
  const totalSeconds = differenceInSeconds(parseISO(targetISO), new Date())

  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, expired: false }
}

export function formatCountdownUnit(value: number): string {
  return value.toString().padStart(2, '0')
}

export function getAvailabilityLabel(available: number, total: number): {
  label: string
  urgent: boolean
} {
  const pct = available / total
  if (available === 0) return { label: 'Sold Out', urgent: false }
  if (pct <= 0.1 || available <= 10) return { label: `${available} left`, urgent: true }
  if (pct <= 0.25) return { label: 'Selling fast', urgent: true }
  return { label: 'Available', urgent: false }
}
