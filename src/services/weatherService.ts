export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'clear';

export interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  description: string;
}

export const WeatherService = {
  async getCurrentWeather(city: string = 'London'): Promise<WeatherData> {
    // In a real production app, we would use an API key from process.env.REACT_APP_WEATHER_API_KEY
    // For this mindful prototype, we implement a simulated service that provides 
    // realistic but varying weather patterns to demonstrate the theme shifts.
    
    try {
      // We simulate a network request delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // For demonstration purposes, we'll pick a condition based on the current hour
      // to make it feel dynamic but predictable for testing.
      const hour = new Date().getHours();
      const conditions: WeatherCondition[] = ['sunny', 'cloudy', 'rainy', 'snowy', 'clear'];
      
      // This is a mock implementation. In a real scenario, we'd fetch from OpenWeatherMap.
      // We use the hour to rotate conditions so it changes during the day.
      const condition = conditions[Math.floor(hour / 5) % conditions.length];
      
      const weatherMap: Record<WeatherCondition, { desc: string, temp: number }> = {
        sunny: { desc: 'Clear skies and sunshine', temp: 22 },
        cloudy: { desc: 'Overcast and calm', temp: 18 },
        rainy: { desc: 'Gentle rain falling', temp: 15 },
        snowy: { desc: 'Quiet snowfall', temp: 2 },
        clear: { desc: 'Crisp and clear', temp: 12 },
      };

      const { desc, temp } = weatherMap[condition];

      return {
        condition,
        temperature: temp,
        description: desc,
      };
    } catch (error) {
      console.error('WeatherService Error:', error);
      return {
        condition: 'clear',
        temperature: 20,
        description: 'Peaceful skies',
      };
    }
  },

  // Helper to map weather condition to the CSS theme class
  getThemeClass(condition: WeatherCondition): string | null {
    const mapping: Record<WeatherCondition, string | null> = {
      sunny: 'theme-sunny',
      cloudy: 'theme-cloudy',
      rainy: 'theme-rainy',
      snowy: 'theme-snowy',
      clear: null, // Clear just uses the time-based theme
    };
    return mapping[condition];
  }
};
