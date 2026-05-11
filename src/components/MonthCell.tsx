import { getDaysInMonth, getFirstDayOfMonth, getMonthName, WEEKDAYS } from '../utils/calendar'

interface Release {
  provider: string
  model: string
}

interface Props {
  year: number
  month: number
  releases: Record<string, Release>
  onHoverRelease: (info: Release | null) => void
}

function isToday(year: number, month: number, day: number): boolean {
  const t = new Date()
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day
}

function pad(n: number): string {
  return n < 10 ? '0' + n : '' + n
}

export default function MonthCell({ year, month, releases, onHoverRelease }: Props) {
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
          const release = releases[dateKey]
          const classes = `day${isToday(year, month, d) ? ' today' : ''}${release ? ' release' : ''}`
          return (
            <span
              key={d}
              className={classes}
              onMouseEnter={release ? () => onHoverRelease(release) : undefined}
              onMouseLeave={release ? () => onHoverRelease(null) : undefined}
            >
              {d}
            </span>
          )
        })}
      </div>
    </div>
  )
}