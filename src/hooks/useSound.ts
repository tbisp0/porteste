import { useCallback, useEffect, useState } from 'react';
import { soundManager, playSound, getSoundConfig, setSoundEnabled, setSoundVolume, isSoundSupported } from '@/utils/soundManager';

export interface UseSoundOptions {
  volume?: number;
  enabled?: boolean;
  throttle?: number; // Minimum time between plays in ms
}

export interface SoundHookReturn {
  play: (type: string, options?: { volume?: number }) => void;
  isEnabled: boolean;
  volume: number;
  isSupported: boolean;
  setEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  config: ReturnType<typeof getSoundConfig>;
}

/**
 * Hook for playing sounds with throttling and configuration
 */
export const useSound = (options: UseSoundOptions = {}): SoundHookReturn => {
  const [config, setConfig] = useState(getSoundConfig());
  const [lastPlayTime, setLastPlayTime] = useState<Record<string, number>>({});

  // Update config when sound manager config changes
  useEffect(() => {
    const updateConfig = () => {
      setConfig(getSoundConfig());
    };

    // Listen for storage changes (config updates from other tabs)
    window.addEventListener('storage', updateConfig);
    
    return () => {
      window.removeEventListener('storage', updateConfig);
    };
  }, []);

  // Throttled play function
  const play = useCallback((type: string, playOptions: { volume?: number } = {}) => {
    const now = Date.now();
    const throttleTime = options.throttle || 100; // Default 100ms throttle
    
    // Check throttle
    if (lastPlayTime[type] && now - lastPlayTime[type] < throttleTime) {
      return;
    }

    // Update last play time
    setLastPlayTime(prev => ({ ...prev, [type]: now }));

    // Play sound with merged options
    const finalVolume = playOptions.volume ?? options.volume;
    playSound(type, finalVolume ? { volume: finalVolume } : undefined);
  }, [options.volume, options.throttle, lastPlayTime]);

  // Enable/disable sounds
  const setEnabled = useCallback((enabled: boolean) => {
    setSoundEnabled(enabled);
    setConfig(getSoundConfig());
  }, []);

  // Set volume
  const setVolume = useCallback((volume: number) => {
    setSoundVolume(volume);
    setConfig(getSoundConfig());
  }, []);

  return {
    play,
    isEnabled: config.enabled,
    volume: config.volume,
    isSupported: isSoundSupported(),
    setEnabled,
    setVolume,
    config
  };
};

/**
 * Hook for specific sound types with predefined settings
 */
export const useSoundEffects = () => {
  const sound = useSound({ throttle: 50 });

  return {
    playSuccess: useCallback(() => sound.play('success'), [sound]),
    playError: useCallback(() => sound.play('error'), [sound]),
    playHover: useCallback(() => sound.play('hover', { volume: 0.1 }), [sound]),
    playClick: useCallback(() => sound.play('click', { volume: 0.2 }), [sound]),
    playToggle: useCallback(() => sound.play('toggle'), [sound]),
    ...sound
  };
};

/**
 * Hook for form-specific sounds
 */
export const useFormSounds = () => {
  const sound = useSound({ throttle: 200 });

  return {
    playSubmitSuccess: useCallback(() => sound.play('success'), [sound]),
    playSubmitError: useCallback(() => sound.play('error'), [sound]),
    playFieldFocus: useCallback(() => sound.play('hover', { volume: 0.05 }), [sound]),
    playFieldValid: useCallback(() => sound.play('click', { volume: 0.1 }), [sound]),
    ...sound
  };
};

/**
 * Hook for navigation sounds
 */
export const useNavigationSounds = () => {
  const sound = useSound({ throttle: 150 });

  return {
    playPageTransition: useCallback(() => sound.play('toggle'), [sound]),
    playMenuOpen: useCallback(() => sound.play('click'), [sound]),
    playMenuClose: useCallback(() => sound.play('click', { volume: 0.1 }), [sound]),
    playButtonHover: useCallback(() => sound.play('hover', { volume: 0.08 }), [sound]),
    playButtonClick: useCallback(() => sound.play('click', { volume: 0.15 }), [sound]),
    ...sound
  };
};

/**
 * Hook for project interaction sounds
 */
export const useProjectSounds = () => {
  const sound = useSound({ throttle: 100 });

  return {
    playCardHover: useCallback(() => sound.play('hover', { volume: 0.06 }), [sound]),
    playCardClick: useCallback(() => sound.play('click', { volume: 0.12 }), [sound]),
    playExpand: useCallback(() => sound.play('toggle', { volume: 0.1 }), [sound]),
    playCollapse: useCallback(() => sound.play('toggle', { volume: 0.08 }), [sound]),
    ...sound
  };
};
