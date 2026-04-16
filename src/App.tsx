import { useState, useEffect } from 'react'
import './App.css'
import { MINDFULNESS_MOMENTS, ZEN_MESSAGES, type MindfulnessMoment } from './mindfulness-data'
import MindfulEntry from './components/MindfulEntry'
import DailyIntention from './components/DailyIntention'
import PresencePrompt from './components/PresencePrompt'
import BreathingGuide from './components/BreathingGuide'
import TodayFocus from './components/TodayFocus'
import MindfulRituals from './components/MindfulRituals'
import MindfulRecipes from './components/MindfulRecipes'
import GratitudeLog from './components/GratitudeLog'
import AmbientSoundscapes from './components/AmbientSoundscapes'
import EphemeralNotes from './components/EphemeralNotes'
import DigitalCandle from './components/DigitalCandle'
import ZenGarden from './components/ZenGarden'
import MindfulBodyScan from './components/MindfulBodyScan'
import MindfulListening from './components/MindfulListening'
import MindfulObservation from './components/MindfulObservation'
import TeaCeremony from './components/TeaCeremony'
import SerenityTimer from './components/SerenityTimer'
import MindfulClock from './components/MindfulClock'
import MindfulWindDown from './components/MindfulWindDown'
import RippleEffect from './components/RippleEffect'
import WaterReminder from './components/WaterReminder'
import { WeatherService, type WeatherData } from './services/weatherService'

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [time, setTime] = useState(new Date())
  const [moment, setMoment] = useState<MindfulnessMoment | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isDecluttered, setIsDecluttered] = useState(false)
  const [showBreathing, setShowBreathing] = useState(false)
  const [isWindDownActive, setIsWindDownActive] = useState(false)
  const [zenMessage, setZenMessage] = useState(ZEN_MESSAGES[0])
  const [zenTransitioning, setZenTransitioning] = useState(false)
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setMoment(MINDFULNESS_MOMENTS[dayOfYear % MINDFULNESS_MOMENTS.length])
    
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await WeatherService.getCurrentWeather();
      setWeather(data);
    };
    fetchWeather();
  }, [])

  useEffect(() => {
    const rotateZen = setInterval(() => {
      setZenTransitioning(true)
      setTimeout(() => {
        setZenMessage(ZEN_MESSAGES[Math.floor(Math.random() * ZEN_MESSAGES.length)])
        setZenTransitioning(false)
      }, 500)
    }, 30000)
    return () => clearInterval(rotateZen)
  }, [])

  useEffect(() => {
    const hour = time.getHours()
    let theme = 'theme-noon'
    
    if (hour >= 5 && hour < 10) {
      theme = 'theme-dawn'
    } else if (hour >= 10 && hour < 16) {
      theme = 'theme-noon'
    } else if (hour >= 16 && hour < 20) {
      theme = 'theme-dusk'
    } else {
      theme = 'theme-midnight'
    }

    if (weather) {
      const weatherTheme = WeatherService.getThemeClass(weather.condition);
      if (weatherTheme) {
        theme = weatherTheme;
      }
    }
    
    document.body.className = theme
  }, [time, weather])

  const refreshMoment = () => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      const currentIdx = MINDFULNESS_MOMENTS.indexOf(moment!)
      let nextIdx = Math.floor(Math.random() * MINDFULNESS_MOMENTS.length)
      while (nextIdx === currentIdx) {
        nextIdx = Math.floor(Math.random() * MINDFULNESS_MOMENTS.length)
      }
      setMoment(MINDFULNESS_MOMENTS[nextIdx])
      setIsTransitioning(false)
    }, 500)
  }

  const getGreeting = () => {
    const hour = time.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <>
      {!hasEntered && <MindfulEntry onComplete={() => setHasEntered(true)} />}
      <RippleEffect />
      <WaterReminder />
      <MindfulWindDown 
        isActive={isWindDownActive} 
        onClose={() => setIsWindDownActive(false)} 
      />
      <div className={`fade-in ${hasEntered ? '' : 'hidden-entry'}`}>
        <div className="presence-ripple"></div>
        <div className="presence-ripple-secondary"></div>
        {showBreathing && <BreathingGuide onClose={() => setShowBreathing(false)} />}
        
        <header style={{ marginBottom: '4rem', position: 'relative' }}>
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            <button 
              className="moment-btn declutter-btn" 
              onClick={() => setIsDecluttered(!isDecluttered)}
              style={{ fontSize: '0.7rem', opacity: 0.5 }}
            >
              {isDecluttered ? 'Return to Sanctuary' : 'Digital Declutter'}
            </button>
          </div>
          <MindfulClock time={time} />
          <h1>{getGreeting()}, Natalie.</h1>
        </header>
        <main style={{ maxWidth: '500px', textAlign: 'center' }} className={isDecluttered ? 'decluttered-main' : ''}>
          {moment && (
            <section className="moment-of-peace">
              <h2 className="moment-title">
                {moment.type === 'quote' ? 'Moment of Peace' : 'Mindful Prompt'}
              </h2>
              <div className={`moment-content ${isTransitioning ? 'fade-out' : 'fade-in-text'}`}>
                <p>"{moment.text}"</p>
                {moment.author && <span className="moment-author">— {moment.author}</span>}
              </div>
              <button className="moment-btn" onClick={refreshMoment}>
                {isTransitioning ? '...' : 'Seek another moment'}
              </button>
            </section>
          )}

          <div className="declutter-target">
            <DailyIntention />
            <PresencePrompt />
            <TodayFocus />
            <MindfulRituals />
            <MindfulRecipes />
            <GratitudeLog />
            <EphemeralNotes />
            <ZenGarden />
            <MindfulBodyScan />
            <MindfulListening />
            <MindfulObservation />
            <TeaCeremony />
            <SerenityTimer />
            <DigitalCandle />
            <AmbientSoundscapes />
          </div>

          <footer style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '2rem' }}>
            <div className="declutter-target">
              <p className={`zen-message ${zenTransitioning ? 'fade-out' : 'fade-in-text'}`} style={{ marginBottom: '1rem' }}>
                {zenMessage}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                className="moment-btn breathing-btn-pulse" 
                onClick={() => setShowBreathing(true)}
                style={{ opacity: 0.7 }}
              >
                Begin Mindful Breathing
              </button>
              <button 
                className="moment-btn" 
                onClick={() => setIsWindDownActive(true)}
                style={{ opacity: 0.7 }}
              >
                Begin Wind-Down
              </button>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}

export default App
