export interface MindfulnessMoment {
  text: string;
  type: 'quote' | 'prompt';
  author?: string;
}

export interface MindfulRitual {
  title: string;
  description: string;
  icon: string;
}

export interface MindfulRecipe {
  title: string;
  description: string;
  ingredients: string[];
  mindfulSteps: { step: string; focus: string }[];
  icon: string;
}

export interface PresencePrompt {
  text: string;
  focusArea: 'sight' | 'sound' | 'touch' | 'smell' | 'overall';
}

export const PRESENCE_PROMPTS: PresencePrompt[] = [
  { text: \"Notice the weight of your feet on the floor. Feel the connection to the earth.\", focusArea: 'touch' },
  { text: \"Find three things in your room that are a shade of green or blue.\", focusArea: 'sight' },
  { text: \"Listen for the furthest sound you can possibly hear. Just listen.\", focusArea: 'sound' },
  { text: \"Notice the temperature of the air on your skin. Is it cool, warm, or neutral?\", focusArea: 'touch' },
  { text: \"Find something nearby that has a texture you enjoy. Touch it gently.\", focusArea: 'touch' },
  { text: \"Observe the way the light is falling in the room right now.\", focusArea: 'sight' },
  { text: \"Notice the feeling of your breath moving in and out of your nostrils.\", focusArea: 'overall' },
  { text: \"Look at a nearby object. Notice its shape and color without naming it.\", focusArea: 'sight' },
];

export const MINDFULNESS_MOMENTS: MindfulnessMoment[] = [
  { text: \"Quiet the mind, and the soul will speak.\", type: 'quote', author: 'Unknown' },
  { text: "Peace is a journey of a thousand miles and it must be taken one step at a time.", type: 'quote', author: 'Unknown' },
  { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", type: 'quote', author: 'Unknown' },
  { text: "The more tranquil a man becomes, the greater is his success.", type: 'quote', author: 'Unknown' },
  { text: "Breath is the bridge which connects life to consciousness.", type: 'quote', author: 'Unknown' },
  { text: "Notice five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste.", type: 'prompt' },
  { text: "Take a moment to feel the weight of your body against the chair or floor. Just notice it.", type: 'prompt' },
  { text: "Slowly scan your body from toes to head. Where are you holding tension? Gently let it go.", type: 'prompt' },
  { text: "Close your eyes for three breaths. Focus only on the cool air entering and warm air leaving.", type: 'prompt' },
  { text: "Smile gently. Notice how this small shift in your face affects your internal state.", type: 'prompt' },
  { text: "The present moment is the only time over which we have any paradoxically total control.", type: 'quote', author: 'Unknown' },
  { text: "Nature does not hurry, yet everything is accomplished.", type: 'quote', author: 'Lao Tzu' },
  { text: "Wherever you are, be there fully.", type: 'quote', author: 'Jim Williams' },
  { text: "Mindfulness isn't about stopping your thoughts, it's about observing them without judgment.", type: 'prompt' },
  { text: "Imagine your thoughts are clouds drifting across a clear blue sky. Let them pass.", type: 'prompt' },
];

export const MINDFUL_RITUALS: MindfulRitual[] = [
  { title: "The Mindful Sip", description: "Hold your beverage. Feel its warmth. Smell the aroma deeply. Take a slow sip and notice the taste and the feeling as you swallow.", icon: "☕" },
  { title: "The Three-Breath Reset", description: "Inhale deeply for 4 seconds, hold for 4, and exhale slowly for 8. Repeat three times to reset your nervous system.", icon: "🌬️" },
  { title: "The Sensory Scan", description: "Stop. Name one thing you can smell, one thing you can hear, and one thing you can feel (like your clothes on your skin).", icon: "👂" },
  { title: "The Gentle Stretch", description: "Reach your arms slowly toward the sky. Inhale as you grow taller, and exhale as you let your arms float back down like feathers.", icon: "🌿" },
  { title: "The Heart-Center Pause", description: "Place a hand over your heart. Feel it beating. Silently say to yourself, 'I am here, and I am at peace.'", icon: "🤍" },
];

export const MINDFUL_RECIPES: MindfulRecipe[] = [
  {
    title: "Slow-Steeped Herbal Tea",
    description: "A ritual of warmth and patience.",
    icon: "🍵",
    ingredients: ["Fresh water", "Your favorite herbal tea bag or loose leaves", "A favorite mug"],
    mindfulSteps: [
      { step: "Boil the water", focus: "Listen to the rising sound of the bubbles. Notice the steam as it begins to curl." },
      { step: "Prepare the tea", focus: "Feel the texture of the tea leaves or the bag. Notice the scent as you place it in the mug." },
      { step: "The Steep", focus: "Watch the water change color. Notice the swirls of tea dancing in the water. Wait without rushing." },
      { step: "The First Sip", focus: "Feel the warmth of the mug in your palms. Inhale the aroma before the first sip." },
    ],
  },
  {
    title: "Mindful Fruit Bowl",
    description: "Celebrating the colors and textures of nature.",
    icon: "🍎",
    ingredients: ["Seasonal fruits (e.g., apple, banana, berries)", "A drizzle of honey or a squeeze of lime"],
    mindfulSteps: [
      { step: "Wash the fruit", focus: "Feel the cool water on your hands and the smooth surface of the fruit." },
      { step: "The Slicing", focus: "Notice the resistance of the knife and the sound of the cut. Observe the vibrant colors inside." },
      { step: "Arranging", focus: "Place each piece intentionally. Notice the contrast of colors in your bowl." },
      { step: "Tasting", focus: "Eat one piece slowly. Notice the burst of flavor and the texture on your tongue." },
    ],
  },
  {
    title: "Comforting Oats",
    description: "A warm, grounding start to the day.",
    icon: "🥣",
    ingredients: ["Rolled oats", "Milk or water", "A pinch of cinnamon", "Fresh berries or nuts"],
    mindfulSteps: [
      { step: "Stirring the oats", focus: "Feel the slow, rhythmic motion of the spoon. Notice the oats absorbing the liquid." },
      { step: "The Aroma", focus: "Inhale the scent of cinnamon as it blends into the warmth. Let it ground you." },
      { step: "Adding Toppings", focus: "Place each berry or nut one by one. Appreciate the variety of shapes and sizes." },
      { step: "First Spoonful", focus: "Feel the warmth and creaminess. Chew slowly and intentionally." },
    ],
  },
];

export const ZEN_MESSAGES: string[] = [
  "Be here now.",
  "Let go of what no longer serves you.",
  "Everything is unfolding exactly as it should.",
  "Pause. Breathe. Observe.",
  "Peace begins with a single breath.",
  "You are enough.",
  "Softly, gently, let it be.",
  "Mindfulness is the path to inner peace.",
  "Trust the process of your life.",
  "Find the stillness within the storm."
];
