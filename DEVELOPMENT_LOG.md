File unchanged since last read. The content from the earlier read_file result in this conversation is still current — refer to that instead of re-reading.
## [2026-04-15] Implement 'Digital Declutter' Mode
- **Goal**: Create a minimalist view that removes non-essential UI elements, allowing the user to focus entirely on the 'Moment of Peace' and breathing exercises.
- **Changes**:
    - Added `isDecluttered` state to `App.tsx` to toggle between standard and sanctuary views.
    - Implemented a discreet 'Digital Declutter' toggle button in the header.
    - Wrapped non-essential components (Intention, Presence, Focus, Rituals, Recipes, Gratitude, Soundscapes, and Zen footer) in a `declutter-target` container.
    - Added fluid CSS transitions in `App.css` using `opacity` and `transform: scale` to ensure the decluttering process feels organic and calm.
- **Outcome**: Provided a "deep focus" mode for the application, enabling a true digital sanctuary experience by eliminating all noise.
