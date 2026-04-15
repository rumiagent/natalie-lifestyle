import { useState } from 'react'
import { MINDFUL_RITUALS, type MindfulRitual } from '../mindfulness-data'

const MindfulRituals = () => {
  const [ritualIdx, setRitualIdx] = useState(0)

  const currentRitual = MINDFUL_RITUALS[ritualIdx]

  const nextRitual = () => {
    setRitualIdx((prev) => (prev + 1) % MINDFUL_RITUALS.length)
  }

  return (
    <section className="ritual-section">
      <h2 className="ritual-title">Mindful Ritual</h2>
      <div className="ritual-card">
        <div className="ritual-icon">{currentRitual.icon}</div>
        <h3 className="ritual-name">{currentRitual.title}</h3>
        <p className="ritual-description">{currentRitual.description}</p>
        <button className="ritual-btn" onClick={nextRitual}>
          Another ritual
        </button>
      </div>
    </section>
  )
}

export default MindfulRituals
