import React, { createContext, useState, useRef, useEffect } from 'react';

interface PlaySoundOptions {
  src: string;
  volume?: number;
}

type PlaySoundParam = string | PlaySoundOptions;

interface AudioContextType {
  isPlaying: boolean;
  currentSound: string | null;
  volume: number;
  muted: boolean;
  playSound: (sound: PlaySoundParam) => void;
  stopSound: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

export const AudioContext = createContext<AudioContextType>({
  isPlaying: false,
  currentSound: null,
  volume: 0.5,
  muted: false,
  playSound: () => {},
  stopSound: () => {},
  setVolume: () => {},
  toggleMute: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() => {
    const savedVolume = localStorage.getItem('audioVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [muted, setMuted] = useState(() => {
    const savedMuted = localStorage.getItem('audioMuted');
    return savedMuted ? savedMuted === 'true' : false;
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Pre-create audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = 'metadata';
    
    // Apply saved settings
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
    
    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Play sound function
  const playSound = (sound: PlaySoundParam) => {
    if (!audioRef.current) return;
    
    // Handle both string and object parameters
    const soundSrc = typeof sound === 'string' ? sound : sound.src;
    const soundVolume = typeof sound === 'object' ? sound.volume : undefined;
    
    // Stop any currently playing sound
    stopSound();
    
    // Set the new sound source
    audioRef.current.src = soundSrc;
    setCurrentSound(soundSrc);
    
    // Set volume before playing (use provided volume or current volume)
    const targetVolume = soundVolume !== undefined ? soundVolume : volume;
    audioRef.current.volume = targetVolume;
    
    // Play the sound
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(error => {
        console.error('Error playing sound:', error);
        setIsPlaying(false);
        setCurrentSound(null);
      });
  };
  
  // Stop sound function
  const stopSound = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentSound(null);
    }
  };
  
  // Set volume function
  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    setVolumeState(newVolume);
    localStorage.setItem('audioVolume', newVolume.toString());
  };
  
  // Toggle mute function
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
    
    setMuted(!muted);
    localStorage.setItem('audioMuted', (!muted).toString());
  };
  
  return (
    <AudioContext.Provider value={{
      isPlaying,
      currentSound,
      volume,
      muted,
      playSound,
      stopSound,
      setVolume,
      toggleMute,
    }}>
      {children}
    </AudioContext.Provider>
  );
};