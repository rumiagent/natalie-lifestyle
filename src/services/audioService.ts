/**
 * MindfulAudioService
 * Provides subtle, organic auditory feedback to enhance the mindful experience.
 * Uses the Web Audio API to synthesize sounds, avoiding external dependencies
 * and ensuring immediate, low-latency playback.
 */

export const MindfulAudioService = {
  /**
   * Plays a gentle, resonant zen chime.
   * This sound is designed to be unobtrusive, acting as a soft anchor 
   * for transitions between mindful states.
   */
  playZenChime: () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported in this browser.');
        return;
      }

      const audioCtx = new AudioContextClass();
      const now = audioCtx.currentTime;

      // Create a primary oscillator for the fundamental tone (Solfeggio 528Hz - Love/Healing)
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(528, now);

      // Create a second oscillator for a subtle harmonic to give it a bell-like quality
      const harmonic = audioCtx.createOscillator();
      harmonic.type = 'sine';
      harmonic.frequency.setValueAtTime(528 * 2, now);

      // Gain node to control the volume envelope (Attack and Decay)
      const gainNode = audioCtx.createGain();
      
      // Soft attack to prevent clicking
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
      
      // Long, natural exponential decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      // Connect oscillators to gain, and gain to destination
      oscillator.connect(gainNode);
      harmonic.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      // Start and stop
      oscillator.start(now);
      harmonic.start(now);
      oscillator.stop(now + 2.5);
      harmonic.stop(now + 2.5);

      // Close context after sound finishes to free resources
      setTimeout(() => {
        audioCtx.close();
      }, 3000);
    } catch (error) {
      console.error('Error playing zen chime:', error);
    }
  }
};
