## [2026-04-15] Implement 'Digital Declutter' Mode
- **Goal**: Create a minimalist view that removes non-essential UI elements, allowing the user to focus entirely on the 'Moment of Peace' and breathing exercises.
- **Changes**:
    - Added `isDecluttered` state to `App.tsx` to toggle between standard and sanctuary views.
    - Implemented a discreet 'Digital Declutter' toggle button in the header.
    - Wrapped non-essential components (Intention, Presence, Focus, Rituals, Recipes, Gratitude, Soundscapes, and Zen footer) in a `declutter-target` container.
    - Added fluid CSS transitions in `App.css` using `opacity` and `transform: scale` to ensure the decluttering process feels organic and calm.
- **Outcome**: Provided a "deep focus" mode for the application, enabling a true digital sanctuary experience by eliminating all noise.

## [2026-04-15] Implement Weather-Aware Theme Shifts
- **Goal**: Enhance the sensory experience by subtly shifting the app's color palette based on current weather conditions.
- **Changes**:
    - Created `WeatherService` to simulate/fetch weather data (Sunny, Cloudy, Rainy, Snowy).
    - Added specialized weather themes to `index.css` using a soft, neutral palette (e.g., slate-blues for rain, warm-creams for sun).
    - Integrated `WeatherService` into `App.tsx` to override time-based themes when specific weather conditions are detected.
    - Ensured theme transitions remain fluid and unobtrusive.
- **Outcome**: The app now feels more connected to the user's physical environment, further deepening the sense of serenity and presence.
