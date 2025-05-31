import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  currentSound: string | null;
  volume: number;
  muted: boolean;
  playSound: (soundUrl: string) => void;
  stopSound: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = muted ? 0 : volume;
    audioRef.current = audio;

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const playSound = (soundUrl: string) => {
    if (!audioRef.current) return;

    // If it's a new sound, update the source
    if (currentSound !== soundUrl) {
      audioRef.current.pause();
      audioRef.current.src = soundUrl;
      setCurrentSound(soundUrl);
    }

    // Play the audio
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(error => {
        console.error('Error playing sound:', error);
        setIsPlaying(false);
      });
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const setVolume = (newVolume: number) => {
    const volumeValue = Math.min(1, Math.max(0, newVolume)); // Clamp between 0 and 1
    setVolumeState(volumeValue);
    
    // If setting volume above 0, unmute
    if (volumeValue > 0 && muted) {
      setMuted(false);
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  // Handle when audio ends naturally
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentSound(null);
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSound,
        volume,
        muted,
        playSound,
        stopSound,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export default AudioContext;
