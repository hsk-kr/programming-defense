import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Tooltip, { TooltipProps } from '../components/Tooltip';
import GameMessage from '../components/GameMessage';

type ShowTooltipParams = { x: number; y: number; text: string };

interface TooltipContext {
  showTooltip: (props: ShowTooltipParams) => void;
  hideTooltip: VoidFunction;
  showGameMessage: (message: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalpContext = createContext<TooltipContext>({} as any);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tooltip, setTooltip] = useState<TooltipProps>({
    visible: false,
  });
  const [message, setMessage] = useState<string>('');
  const timerIds = useRef<{
    gameMessage?: number;
  }>({});

  const showTooltip = useCallback((props: ShowTooltipParams) => {
    setTooltip({
      ...props,
      visible: true,
    });
  }, []);

  const hideTooltip = useCallback(() => {
    setTooltip({
      visible: false,
    });
  }, []);

  const showGameMessage = useCallback((message: string) => {
    if (timerIds.current.gameMessage) {
      clearTimeout(timerIds.current.gameMessage);
    }

    setMessage(message);

    timerIds.current.gameMessage = setTimeout(() => {
      setMessage('');
    }, 3000);
  }, []);

  // Hide Tooltip when mouse up is fired
  useEffect(() => {
    const handleMouseUp = () => {
      hideTooltip();
    };

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Release timers
  useEffect(() => {
    return () => {
      if (timerIds.current.gameMessage) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(timerIds.current.gameMessage);
      }
    };
  }, []);

  const value = {
    showTooltip,
    hideTooltip,
    showGameMessage,
  };

  return (
    <globalpContext.Provider value={value}>
      <GameMessage message={message} />
      <Tooltip {...tooltip} />
      {children}
    </globalpContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(globalpContext);
