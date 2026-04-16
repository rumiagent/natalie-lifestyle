export interface GardenState {
  stillnessMoss: number;
  breathLilies: number;
  resilienceVines: number;
  gratitudeFerns: number;
}

export const INITIAL_GARDEN_STATE: GardenState = {
  stillnessMoss: 0,
  breathLilies: 0,
  resilienceVines: 0,
  gratitudeFerns: 0,
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
  state[metric] += amount;
  saveGardenState(state);
  return state;
};
