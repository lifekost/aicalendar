import { getDaysInMonth, getFirstDayOfMonth, getMonthName, getProviderColor, WEEKDAYS, type ModelRelease } from '../utils/calendar'

interface Props {
  year: number
  month: number
  releases: Record<string, ModelRelease[]>
  onHoverReleases: (info: ModelRelease[]) => void
}

function isToday(year: number, month: number, day: number): boolean {
  const t = new Date()
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day
}

function pad(n: number): string {
  return n < 10 ? '0' + n : '' + n
}

function getReleaseBackground(releases: ModelRelease[]): string {
  const providers = new Set(releases.map(({ provider }) => provider))
  const colors = Array.from(providers, getProviderColor)
  if (colors.length === 1) return colors[0]

  const stops = colors.map((color, index) => {
    const start = (index / colors.length) * 100
    const end = ((index + 1) / colors.length) * 100
    return `${color} ${start}% ${end}%`
  })
  return `conic-gradient(${stops.join(', ')})`
}

export default function MonthCell({ year, month, releases, onHoverReleases }: Props) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const name = getMonthName(month)

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    cells.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d)
  }

  return (
    <div className="month-cell">
      <div className="month-name">{name}</div>
      <div className="day-headers">
        {WEEKDAYS.map((w) => (
          <span key={w} className="day-header">{w}</span>
        ))}
      </div>
      <div className="days-grid">
        {cells.map((d, i) => {
          if (d === null) {
            return <span key={`e-${i}`} className="day empty" />
          }
          const dateKey = `${year}-${pad(month + 1)}-${pad(d)}`
          const dayReleases = releases[dateKey]
          const classes = `day${isToday(year, month, d) ? ' today' : ''}${dayReleases ? ' release' : ''}`
          return (
            <span
              key={d}
              className={classes}
              style={dayReleases ? { background: getReleaseBackground(dayReleases) } : undefined}
              onMouseEnter={dayReleases ? () => onHoverReleases(dayReleases) : undefined}
              onMouseLeave={dayReleases ? () => onHoverReleases([]) : undefined}
            >
              {d}
            </span>
          )
        })}
      </div>
    </div>
  )
}
