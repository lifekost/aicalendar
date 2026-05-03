import type { ReactNode } from 'react'

interface Props {
  year: number
  onPrev: () => void
  onNext: () => void
}

function ArrowBtn({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button className="year-arrow" onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default function YearSelector({ year, onPrev, onNext }: Props) {
  return (
    <div className="year-selector">
      <ArrowBtn onClick={onPrev}>&#8249;</ArrowBtn>
      <span className="year-label">{year}</span>
      <ArrowBtn onClick={onNext}>&#8250;</ArrowBtn>
    </div>
  )
}
