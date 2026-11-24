export interface ModelRelease {
  date: string
  provider: string
  model: string
}

const PROVIDER_COLORS = new Map([
  ['OpenAI', '#176b4d'],
  ['Anthropic', '#9f4125'],
  ['Google', '#4636a4'],
  ['Meta', '#2359af'],
  ['DeepSeek', '#087080'],
  ['Mistral AI', '#8c5300'],
  ['xAI', '#404650'],
  ['Alibaba Cloud', '#a32369'],
])

export function getProviderColor(provider: string): string {
  return PROVIDER_COLORS.get(provider) ?? '#606975'
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function getMonthName(month: number): string {
  return MONTH_NAMES[month]
}

export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
