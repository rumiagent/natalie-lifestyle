export interface MindfulnessMoment {
  text: string;
  type: 'quote' | 'prompt';
  author?: string;
}

export const MINDFULNESS_MOMENTS: MindfulnessMoment[] = [
  { text: "Quiet the mind, and the soul will speak.", type: 'quote', author: 'Unknown' },
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
