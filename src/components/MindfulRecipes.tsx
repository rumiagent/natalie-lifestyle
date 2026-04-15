import { useState, useEffect } from 'react'
import { MINDFUL_RECIPES, type MindfulRecipe } from '../mindfulness-data'

const MindfulRecipes = () => {
  const [recipe, setRecipe] = useState<MindfulRecipe | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isCooking, setIsCooking] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

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
  }

  const nextStep = () => {
    if (currentStep < (recipe?.mindfulSteps.length || 0) - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsCooking(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (!recipe) return null

  if (isCooking) {
    const step = recipe.mindfulSteps[currentStep]
    return (
      <section className="mindful-recipe-card cooking-mode">
        <div className="recipe-header">
          <span className="recipe-icon">{recipe.icon}</span>
          <h2>Mindful Preparation</h2>
          <p className="recipe-subtitle">{recipe.title}</p>
        </div>

        <div className="recipe-body fade-in-text">
          <div className="cooking-progress">
            Step {currentStep + 1} of {recipe.mindfulSteps.length}
          </div>
          
          <div className="cooking-step-container">
            <div className="step-action-large">{step.step}</div>
            <div className="step-focus-large">
              <span className="focus-label">Focus:</span> {step.focus}
            </div>
          </div>

          <div className="cooking-controls">
            <button 
              className="recipe-btn secondary" 
              onClick={prevStep} 
              disabled={currentStep === 0}
            >
              Back
            </button>
            <button 
              className="recipe-btn primary" 
              onClick={nextStep}
            >
              {currentStep === recipe.mindfulSteps.length - 1 ? 'Finish' : 'Next Step'}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mindful-recipe-card">
      <div className="recipe-header">
        <span className="recipe-icon">{recipe.icon}</span>
        <h2>Mindful Kitchen</h2>
        <p className="recipe-subtitle">{recipe.title}</p>
      </div>
      
      <div className={`recipe-body ${isTransitioning ? 'fade-out' : 'fade-in-text'}`}>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-section">
          <h3>Ingredients</h3>
          <ul className="recipe-ingredients">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="recipe-section">
          <h3>Mindful Process</h3>
          <div className="recipe-steps">
            {recipe.mindfulSteps.map((s, i) => (
              <div key={i} className="recipe-step">
                <span className="step-num">{i + 1}</span>
                <div className="step-content">
                  <p className="step-action">{s.step}</p>
                  <p className="step-focus">Focus: {s.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recipe-footer-actions">
        <button className="recipe-btn primary" onClick={startCooking}>
          Start Mindful Preparation
        </button>
        <button className="recipe-btn secondary" onClick={refreshRecipe}>
          {isTransitioning ? '...' : 'Discover another recipe'}
        </button>
      </div>
    </section>
  )
}

export default MindfulRecipes
