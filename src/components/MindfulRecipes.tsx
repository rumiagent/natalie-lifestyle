import { useState, useEffect } from 'react'
import { MINDFUL_RECIPES, PRESENCE_PROMPTS, type MindfulRecipe } from '../mindfulness-data'
import './MindfulRecipes.css'

const MindfulRecipes = () => {
  const [recipe, setRecipe] = useState<MindfulRecipe | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isCooking, setIsCooking] = useState(false)
  const [isPausing, setIsPausing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [pausePrompt, setPausePrompt] = useState('')

  useEffect(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setRecipe(MINDFUL_RECIPES[dayOfYear % MINDFUL_RECIPES.length])
  }, [])

  const refreshRecipe = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      const currentIdx = MINDFUL_RECIPES.indexOf(recipe!)
      let nextIdx = Math.floor(Math.random() * MINDFUL_RECIPES.length)
      while (nextIdx === currentIdx) {
        nextIdx = Math.floor(Math.random() * MINDFUL_RECIPES.length)
      }
      setRecipe(MINDFUL_RECIPES[nextIdx])
      setIsTransitioning(false)
    }, 500)
  }

  const startCooking = () => {
    setCurrentStep(0)
    setIsCooking(true)
    setIsPausing(false)
    setIsCompleted(false)
  }

  const nextStep = () => {
    if (isPausing) {
      setIsPausing(false)
      return
    }

    if (currentStep < (recipe?.mindfulSteps.length || 0) - 1) {
      const nextIdx = currentStep + 1
      setCurrentStep(nextIdx)
      
      // Insert a pause every 2 steps
      if (nextIdx % 2 === 0 && nextIdx !== 0) {
        triggerPause()
      }
    } else {
      setIsCompleted(true)
    }
  }

  const triggerPause = () => {
    const randomPrompt = PRESENCE_PROMPTS[Math.floor(Math.random() * PRESENCE_PROMPTS.length)]
    setPausePrompt(randomPrompt.text)
    setIsPausing(true)
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setIsPausing(false)
    }
  }

  if (!recipe) return null

  if (isCompleted) {
    return (
      <section className=\"mindful-recipe-card completion-mode\">
        <div className=\"recipe-header\">
          <span className=\"recipe-icon\">✨</span>
          <h2>Ritual Complete</h2>
          <p className=\"recipe-subtitle\">{recipe.title}</p>
        </div>
        <div className=\"recipe-body fade-in-text\">
          <div className=\"completion-text\">
            Take a final moment to appreciate the effort, the process, and the nourishment you've created.
          </div>
          <div className=\"cooking-controls\">
            <button className=\"recipe-btn primary\" onClick={() => setIsCooking(false)}>
              Return to Sanctuary
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (isCooking) {
    const step = recipe.mindfulSteps[currentStep]
    return (
      <section className={`mindful-recipe-card cooking-mode ${isPausing ? 'pause-mode' : ''}`}>
        {!isPausing && (
          <div className=\"cooking-progress\">
            Step {currentStep + 1} of {recipe.mindfulSteps.length}
          </div>
        )}
        
        <div className=\"recipe-body fade-in-text\">
          {isPausing ? (
            <div className=\"cooking-step-container\">
              <div className=\"pause-content\">
                {pausePrompt}
              </div>
            </div>
          ) : (
            <div className=\"cooking-step-container\">
              <div className=\"step-action-large\">{step.step}</div>
              <div className=\"step-focus-large\">
                <span className=\"focus-label\">Focus:</span> {step.focus}
              </div>
            </div>
          )}

          <div className=\"cooking-controls\">
            {!isPausing && (
              <button 
                className=\"recipe-btn secondary\" 
                onClick={prevStep} 
                disabled={currentStep === 0}
              >
                Back
              </button>
            )}
            <button 
              className=\"recipe-btn primary\" 
              onClick={nextStep}
            >
              {isPausing ? 'Continue Preparation' : (currentStep === recipe.mindfulSteps.length - 1 ? 'Finish' : 'Next Step')}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className=\"mindful-recipe-card\">
      <div className=\"recipe-header\">
        <span className=\"recipe-icon\">{recipe.icon}</span>
        <h2>Mindful Kitchen</h2>
        <p className=\"recipe-subtitle\">{recipe.title}</p>
      </div>
      
      <div className={`recipe-body ${isTransitioning ? 'fade-out' : 'fade-in-text'}`}>
        <p className=\"recipe-description\">{recipe.description}</p>
        
        <div className=\"recipe-section\">
          <h3>Ingredients</h3>
          <ul className=\"recipe-ingredients\">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className=\"recipe-section\">
          <h3>Mindful Process</h3>
          <div className=\"recipe-steps\">
            {recipe.mindfulSteps.map((s, i) => (
              <div key={i} className=\"recipe-step\">
                <span className=\"step-num\">{i + 1}</span>
                <div className=\"step-content\">
                  <p className=\"step-action\">{s.step}</p>
                  <p className=\"step-focus\">Focus: {s.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=\"recipe-footer-actions\">
        <button className=\"recipe-btn primary\" onClick={startCooking}>
          Start Mindful Preparation
        </button>
        <button className=\"recipe-btn secondary\" onClick={refreshRecipe}>
          {isTransitioning ? '...' : 'Discover another recipe'}
        </button>
      </div>
    </section>
  )
}

export default MindfulRecipes
