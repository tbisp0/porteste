# Sound Design System - Portfolio

A comprehensive sound design system that provides subtle audio feedback for user interactions throughout the portfolio website.

## 🎵 Overview

The sound system enhances user experience by providing audio feedback for key interactions while maintaining accessibility and user control. All sounds are generated programmatically using the Web Audio API, ensuring no external dependencies and optimal performance.

## 🔧 Architecture

### Core Components

1. **SoundManager** (`src/utils/soundManager.ts`)
   - Singleton class managing all sound operations
   - Programmatic sound generation using Web Audio API
   - Automatic initialization on first user interaction
   - LocalStorage persistence for user preferences

2. **Sound Hooks** (`src/hooks/useSound.ts`)
   - `useSound()` - Basic sound hook with throttling
   - `useSoundEffects()` - General purpose sound effects
   - `useFormSounds()` - Form-specific interactions
   - `useNavigationSounds()` - Navigation and menu sounds
   - `useProjectSounds()` - Project card interactions

3. **SoundToggle Component** (`src/components/ui/SoundToggle.tsx`)
   - User control for enabling/disabling sounds
   - Volume adjustment slider
   - Contextual feedback with toasts

## 🎼 Sound Types

### Available Sound Effects

| Sound Type | Usage | Frequency | Duration |
|------------|-------|-----------|----------|
| `success` | Form submissions, successful actions | C major chord | 300ms |
| `error` | Error states, failed operations | Minor chord | 200ms |
| `hover` | Button/card hover effects | Single tone (440Hz) | 100ms |
| `click` | Button clicks, selections | High tone (800Hz) | 50ms |
| `toggle` | Theme switching, toggles | Two-tone sequence | 150ms |

### Sound Characteristics

- **Volume**: Default 30% (0.3), user-adjustable
- **Generation**: Real-time synthesis using Web Audio API
- **Format**: WAV data URLs with exponential decay envelope
- **Throttling**: Minimum 50-200ms between plays (configurable)

## 🎯 Integration Points

### Contact Form (`src/components/Contact.tsx`)
```typescript
const { playSubmitSuccess, playSubmitError, playFieldFocus } = useFormSounds();

// Success feedback
playSubmitSuccess();

// Error feedback  
playSubmitError();

// Field focus
onFocus={() => playFieldFocus()}
```

### Project Cards (`src/components/ProjectShowcase.tsx`)
```typescript
const { playCardHover, playExpand, playCollapse } = useProjectSounds();

// Card hover
onMouseEnter={() => playCardHover()}

// Expansion/collapse
if (isExpanding) playExpand(); else playCollapse();
```

### Theme Toggle (`src/components/ui/ThemeToggle.tsx`)
```typescript
const { playButtonHover, playButtonClick } = useNavigationSounds();

// Button interactions
onMouseEnter={() => playButtonHover()}
onClick={() => playButtonClick()}
```

### Feedback Modal (`src/components/FeedbackModal.tsx`)
```typescript
const { playSubmitSuccess, playSubmitError, playFieldFocus } = useFormSounds();
const { playButtonClick } = useNavigationSounds();

// Form submission feedback
playSubmitSuccess() / playSubmitError()

// Button interactions
playButtonClick()
```

## 🎛️ Configuration

### User Preferences
```typescript
interface SoundConfig {
  volume: number;    // 0-1 range
  enabled: boolean;  // Master enable/disable
  preload: boolean;  // Preload sounds on init
}
```

### Storage
- Preferences saved to `localStorage` as `portfolio-sound-config`
- Automatic loading on page refresh
- Cross-tab synchronization

### Browser Support
- Requires Web Audio API support
- Graceful degradation for unsupported browsers
- Automatic detection with `isSoundSupported()`

## 🎨 Usage Examples

### Basic Sound Playback
```typescript
import { playSound } from '@/utils/soundManager';

// Play a sound
playSound('success');

// Play with custom volume
playSound('hover', { volume: 0.1 });
```

### Using Hooks
```typescript
import { useSoundEffects } from '@/hooks/useSound';

const MyComponent = () => {
  const { playSuccess, playError, isEnabled } = useSoundEffects();
  
  const handleSubmit = () => {
    if (success) {
      playSuccess();
    } else {
      playError();
    }
  };
};
```

### Custom Sound Integration
```typescript
import { useSound } from '@/hooks/useSound';

const MyComponent = () => {
  const { play, setEnabled, setVolume } = useSound({
    throttle: 100, // Minimum time between plays
    volume: 0.2    // Custom volume
  });
  
  return (
    <button 
      onClick={() => play('click')}
      onMouseEnter={() => play('hover')}
    >
      Interactive Button
    </button>
  );
};
```

## 🌐 Internationalization

Sound-related UI text is fully translated:

```json
{
  "sound": {
    "enabled": "Sound enabled",
    "disabled": "Sound disabled", 
    "enabledDesc": "Audio feedback is now active",
    "disabledDesc": "Audio feedback is now muted",
    "enable": "Enable sound",
    "disable": "Disable sound",
    "volume": "Volume",
    "volumeControl": "Adjust sound volume"
  }
}
```

## ♿ Accessibility

### WCAG Compliance
- Sounds are optional and user-controllable
- Visual feedback accompanies all audio cues
- No essential information conveyed through sound alone
- Keyboard accessible controls

### User Control
- Master enable/disable toggle
- Volume adjustment (0-100%)
- Persistent preferences
- Contextual feedback for setting changes

## 🚀 Performance

### Optimization Features
- Lazy initialization on first user interaction
- Programmatic sound generation (no file downloads)
- Audio cloning for overlapping sounds
- Throttling to prevent audio spam
- Graceful error handling

### Memory Management
- Automatic cleanup of temporary audio objects
- Efficient sound caching
- Minimal memory footprint

## 🔧 Development

### Adding New Sounds
1. Add sound type to `SoundManager.createSoundDataUrl()`
2. Define frequency and duration parameters
3. Update TypeScript types if needed
4. Add to relevant hooks

### Testing
- Use `SoundDemo` component for testing all sounds
- Browser developer tools for audio debugging
- Cross-browser compatibility testing

### Debugging
```typescript
// Enable debug logging
localStorage.setItem('debug-sound', 'true');

// Check sound support
console.log('Sound supported:', isSoundSupported());

// Get current config
console.log('Sound config:', getSoundConfig());
```

## 📱 Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 66+ | ✅ Full | Best performance |
| Firefox 60+ | ✅ Full | Good performance |
| Safari 11.1+ | ✅ Full | Requires user interaction |
| Edge 79+ | ✅ Full | Chromium-based |
| Mobile Safari | ✅ Partial | Limited by iOS policies |
| Mobile Chrome | ✅ Full | Good performance |

## 🎯 Best Practices

1. **Subtlety**: Keep sounds short and pleasant
2. **Context**: Match sound to interaction type
3. **Control**: Always provide user control
4. **Fallback**: Ensure functionality without sound
5. **Performance**: Throttle rapid interactions
6. **Accessibility**: Complement with visual feedback

## 🔮 Future Enhancements

- [ ] Custom sound themes
- [ ] Advanced audio effects (reverb, filters)
- [ ] Sound visualization
- [ ] Haptic feedback integration
- [ ] Advanced user preferences
- [ ] Sound analytics and usage tracking
