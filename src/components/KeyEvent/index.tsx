import { useEffect } from 'react';

const keys = ['q', 'w', 'e', 'm', 'p', 's'] as const;
type Keys = (typeof keys)[number];

interface KeyEventProps {
  onKeyUp?: (key: Keys) => void;
}

const KeyEvent = ({ onKeyUp }: KeyEventProps) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      if (keys.includes(k as Keys)) {
        onKeyUp(k as Keys);
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyUp]);

  return <></>;
};

export default KeyEvent;
