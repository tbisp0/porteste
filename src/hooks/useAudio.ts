import { useContext } from 'react';
import { AudioContext } from '../app/providers/AudioContext';

interface PlaySoundOptions {
  src: string;
  volume?: number;
}

type PlaySoundParam = string | PlaySoundOptions;

interface AudioContextValues {
  isPlaying: boolean;
  currentSound: string | null;
  volume: number;
  muted: boolean;
  playSound: (sound: PlaySoundParam) => void;
  playSoundWithHaptic: (sound: PlaySoundParam) => void;
  stopSound: () => void;
  togglePlayback: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const useAudio = (): AudioContextValues => {
  const context = useContext(AudioContext);
  
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  
  const { 
    isPlaying,
    currentSound,
    volume,
    muted,
    stopSound,
    setVolume,
    toggleMute,
    playSound: contextPlaySound
  } = context;
  
  // Helper function to play a sound with haptic feedback
  const playSoundWithHaptic = (sound: PlaySoundParam) => {
    // Attempt to trigger haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(10); // Short vibration
    }
    
    playSound(sound);
  };
  
  // Handle both string and object parameters for playSound
  const playSound = (sound: PlaySoundParam) => {
    if (typeof sound === 'string') {
      contextPlaySound(sound);
    } else {
      const currentVolume = volume;
      if (sound.volume !== undefined) {
        setVolume(sound.volume);
      }
      contextPlaySound(sound.src);
      if (sound.volume !== undefined) {
        // Restore previous volume after a small delay
        setTimeout(() => {
          setVolume(currentVolume);
        }, 100);
      }
    }
  };
  
  // Toggle play/pause for current sound
  const togglePlayback = () => {
    if (isPlaying) {
      stopSound();
    } else if (currentSound) {
      // currentSound is always a string in the AudioContext
      playSound(currentSound);
    }
  };
  
  const contextValue: AudioContextValues = {
    isPlaying,
    currentSound,
    volume,
    muted,
    playSound,
    playSoundWithHaptic,
    stopSound,
    togglePlayback,
    setVolume,
    toggleMute,
  };

  return contextValue;
};