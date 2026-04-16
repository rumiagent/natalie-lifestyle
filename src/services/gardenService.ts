export interface GardenState {
  stillnessMoss: number;
  breathLilies: number;
  resilienceVines: number;
  gratitudeFerns: number;
  ritualStreak: number;
  lastRitualDate: string | null;
}

export const INITIAL_GARDEN_STATE: GardenState = {
  stillnessMoss: 0,
  breathLilies: 0,
  resilienceVines: 0,
  gratitudeFerns: 0,
  ritualStreak: 0,
  lastRitualDate: null,
};

export const getGardenState = (): GardenState => {
  const saved = localStorage.getItem('natalie_garden_state');
  return saved ? JSON.parse(saved) : INITIAL_GARDEN_STATE;
};

export const saveGardenState = (state: GardenState) => {
  localStorage.setItem('natalie_garden_state', JSON.stringify(state));
};

export const updateGardenMetric = (metric: keyof GardenState, amount: number) => {
  const state = getGardenState();
  (state[metric] as number) += amount;
  saveGardenState(state);
  return state;
};

export const updateRitualStreak = () => {
  const state = getGardenState();
  const today = new Date().toDateString();
  const lastDate = state.lastRitualDate ? new Date(state.lastRitualDate).toDateString() : null;

  if (lastDate === today) {
    // Already updated today, no change to streak
  } else {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (lastDate === yesterdayString) {
      state.ritualStreak += 1;
    } else {
      state.ritualStreak = 1;
    }
    state.lastRitualDate = new Date().toISOString();
  }

  saveGardenState(state);
  return state;
};
