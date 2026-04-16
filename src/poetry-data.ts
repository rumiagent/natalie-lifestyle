export interface Poem {
  title: string;
  lines: string[];
  author?: string;
}

export const MINDFUL_POEMS: Poem[] = [
  {
    title: "The Old Pond",
    lines: [
      "The old pond,",
      "A frog jumps in:",
      "Sound of water."
    ],
    author: "Matsuo Bashō"
  },
  {
    title: "Autumn Stillness",
    lines: [
      "Leaves fall,",
      "The wind whispers,",
      "Stillness remains."
    ]
  },
  {
    title: "The Bridge",
    lines: [
      "Be here now.",
      "The breath is a bridge,",
      "Connecting soul and earth."
    ]
  },
  {
    title: "Morning Dew",
    lines: [
      "A single drop",
      "Holding the entire sky",
      "Before it vanishes."
    ]
  },
  {
    title: "Open Hand",
    lines: [
      "Hold your thoughts",
      "Like water in an open hand,",
      "Letting them flow."
    ]
  }
];
