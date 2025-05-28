/**
 * Sound Design System for Portfolio
 * Provides subtle audio feedback for user interactions
 */

export interface SoundConfig {
  volume: number;
  enabled: boolean;
  preload: boolean;
}

export interface SoundEvent {
  id: string;
  url: string;
  volume?: number;
  loop?: boolean;
  preload?: boolean;
}

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private config: SoundConfig = {
    volume: 0.3,
    enabled: true,
    preload: true
  };
  private initialized = false;

  constructor() {
    this.loadConfig();
    this.initializeAudioContext();
  }

  /**
   * Load configuration from localStorage
   */
  private loadConfig(): void {
    try {
      const saved = localStorage.getItem('portfolio-sound-config');
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.warn('Failed to load sound config:', error);
    }
  }

  /**
   * Save configuration to localStorage
   */
  private saveConfig(): void {
    try {
      localStorage.setItem('portfolio-sound-config', JSON.stringify(this.config));
    } catch (error) {
      console.warn('Failed to save sound config:', error);
    }
  }

  /**
   * Initialize audio context on first user interaction
   */
  private initializeAudioContext(): void {
    if (this.initialized) return;

    const initAudio = () => {
      this.initialized = true;
      this.preloadSounds();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };

    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });
  }

  /**
   * Create audio data URLs for different sound types
   */
  private createSoundDataUrl(type: string): string {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    
    switch (type) {
      case 'success':
        // Pleasant success chime (C major chord)
        return this.generateTone([523.25, 659.25, 783.99], 0.3, sampleRate);
      
      case 'error':
        // Subtle error tone (minor chord)
        return this.generateTone([220, 261.63], 0.2, sampleRate);
      
      case 'hover':
        // Soft hover sound (single note)
        return this.generateTone([440], 0.1, sampleRate);
      
      case 'click':
        // Quick click sound
        return this.generateTone([800], 0.05, sampleRate);
      
      case 'toggle':
        // Theme toggle sound (two notes)
        return this.generateTone([523.25, 659.25], 0.15, sampleRate);
      
      default:
        return this.generateTone([440], 0.1, sampleRate);
    }
  }

  /**
   * Generate tone data URL
   */
  private generateTone(frequencies: number[], duration: number, sampleRate: number): string {
    const length = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(buffer);
    
    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);
    
    // Generate audio data
    for (let i = 0; i < length; i++) {
      let sample = 0;
      const time = i / sampleRate;
      
      // Mix frequencies
      frequencies.forEach(freq => {
        sample += Math.sin(2 * Math.PI * freq * time);
      });
      
      // Normalize and apply envelope
      sample = sample / frequencies.length;
      const envelope = Math.exp(-time * 3); // Exponential decay
      sample *= envelope;
      
      // Convert to 16-bit PCM
      const pcm = Math.max(-32768, Math.min(32767, sample * 32767));
      view.setInt16(44 + i * 2, pcm, true);
    }
    
    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  /**
   * Preload all sounds
   */
  private preloadSounds(): void {
    if (!this.config.preload || !this.config.enabled) return;

    const soundTypes = ['success', 'error', 'hover', 'click', 'toggle'];
    
    soundTypes.forEach(type => {
      try {
        const audio = new Audio();
        audio.src = this.createSoundDataUrl(type);
        audio.volume = this.config.volume;
        audio.preload = 'auto';
        
        // Handle loading errors gracefully
        audio.addEventListener('error', () => {
          console.warn(`Failed to load sound: ${type}`);
        });
        
        this.sounds.set(type, audio);
      } catch (error) {
        console.warn(`Failed to create sound: ${type}`, error);
      }
    });
  }

  /**
   * Play a sound by type
   */
  public play(type: string, options: { volume?: number } = {}): void {
    if (!this.config.enabled || !this.initialized) return;

    try {
      let audio = this.sounds.get(type);
      
      if (!audio) {
        // Create sound on demand
        audio = new Audio();
        audio.src = this.createSoundDataUrl(type);
        this.sounds.set(type, audio);
      }

      // Clone audio for overlapping sounds
      const audioClone = audio.cloneNode() as HTMLAudioElement;
      audioClone.volume = (options.volume ?? this.config.volume) * this.config.volume;
      
      // Play with error handling
      const playPromise = audioClone.play();
      if (playPromise) {
        playPromise.catch(error => {
          // Ignore autoplay policy errors
          if (error.name !== 'NotAllowedError') {
            console.warn('Sound play failed:', error);
          }
        });
      }
    } catch (error) {
      console.warn('Sound play error:', error);
    }
  }

  /**
   * Update configuration
   */
  public updateConfig(newConfig: Partial<SoundConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();
    
    // Update volume for existing sounds
    if (newConfig.volume !== undefined) {
      this.sounds.forEach(audio => {
        audio.volume = this.config.volume;
      });
    }
  }

  /**
   * Get current configuration
   */
  public getConfig(): SoundConfig {
    return { ...this.config };
  }

  /**
   * Enable/disable sounds
   */
  public setEnabled(enabled: boolean): void {
    this.updateConfig({ enabled });
  }

  /**
   * Set volume (0-1)
   */
  public setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.updateConfig({ volume: clampedVolume });
  }

  /**
   * Check if sounds are supported
   */
  public isSupported(): boolean {
    return typeof Audio !== 'undefined' && 
           typeof AudioContext !== 'undefined' || 
           typeof (window as any).webkitAudioContext !== 'undefined';
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Convenience functions
export const playSound = (type: string, options?: { volume?: number }) => {
  soundManager.play(type, options);
};

export const setSoundEnabled = (enabled: boolean) => {
  soundManager.setEnabled(enabled);
};

export const setSoundVolume = (volume: number) => {
  soundManager.setVolume(volume);
};

export const getSoundConfig = () => {
  return soundManager.getConfig();
};

export const isSoundSupported = () => {
  return soundManager.isSupported();
};
