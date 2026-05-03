import { useState } from 'react'
import YearSelector from './components/YearSelector'
import RoundCalendar from './components/RoundCalendar'
import './App.css'

function App() {
  const [year, setYear] = useState(new Date().getFullYear())

  return (
    <div className="app">
      <YearSelector
        year={year}
        onPrev={() => setYear((y) => y - 1)}
        onNext={() => setYear((y) => y + 1)}
      />
      <RoundCalendar year={year} />
    </div>
  )
}

export default App
