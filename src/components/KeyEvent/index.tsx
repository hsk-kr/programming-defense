import { useEffect } from 'react';

interface KeyEventProps {
  onKeyUp?: (key: string) => void;
}

const KeyEvent = ({ onKeyUp }: KeyEventProps) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();

      onKeyUp(k);
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onKeyUp]);

  return <></>;
};

export default KeyEvent;
