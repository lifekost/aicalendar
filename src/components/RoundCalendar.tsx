import { useEffect, useState } from 'react'
import MonthCell from './MonthCell'

interface Release {
  provider: string
  model: string
}

interface Props {
  year: number
}

const MONTH_GRID: { month: number; row: number; col: number }[] = [
  { month: 10, row: 0, col: 0 }, // Nov
  { month: 11, row: 0, col: 1 }, // Dec
  { month: 0,  row: 0, col: 2 }, // Jan
  { month: 1,  row: 0, col: 3 }, // Feb
  { month: 2,  row: 0, col: 4 }, // Mar
  { month: 3,  row: 1, col: 4 }, // Apr
  { month: 4,  row: 2, col: 4 }, // May
  { month: 5,  row: 2, col: 3 }, // Jun
  { month: 6,  row: 2, col: 2 }, // Jul
  { month: 7,  row: 2, col: 1 }, // Aug
  { month: 8,  row: 2, col: 0 }, // Sep
  { month: 9,  row: 1, col: 0 }, // Oct
]

export default function RoundCalendar({ year }: Props) {
  const [releases, setReleases] = useState<Record<string, Release>>({})
  const [hoveredRelease, setHoveredRelease] = useState<Release | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}releases.json`)
      .then((r) => r.json())
      .then((data: { date: string; provider: string; model: string }[]) => {
        const map: Record<string, Release> = {}
        for (const item of data) {
          map[item.date] = { provider: item.provider, model: item.model }
        }
        setReleases(map)
      })
  }, [])

  return (
    <div className="round-calendar">
      {MONTH_GRID.map(({ month, row, col }) => (
        <div
          key={month}
          className="calendar-cell"
          style={{ gridRow: row + 1, gridColumn: col + 1 }}
        >
          <MonthCell
            year={year}
            month={month}
            releases={releases}
            onHoverRelease={setHoveredRelease}
          />
        </div>
      ))}
      <div className="center-info" style={{ gridRow: 2, gridColumn: '2 / 5' }}>
        {hoveredRelease && (
          <span>{hoveredRelease.provider} — {hoveredRelease.model}</span>
        )}
      </div>
    </div>
  )
}