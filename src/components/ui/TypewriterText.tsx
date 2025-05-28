import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypewriterTextProps {
  sequence: (string | number)[];
  wrapper?: keyof JSX.IntrinsicElements;
  speed?: number;
  className?: string;
  repeat?: number;
  cursor?: boolean;
  preRenderFirstString?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  sequence,
  wrapper = 'span',
  speed = 50,
  className = '',
  repeat = Infinity,
  cursor = true,
  preRenderFirstString = true
}) => {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper={wrapper}
      speed={speed}
      className={className}
      repeat={repeat}
      cursor={cursor}
      preRenderFirstString={preRenderFirstString}
      style={{ display: 'inline-block' }}
      aria-live="polite"
    />
  );
};

export default TypewriterText;
