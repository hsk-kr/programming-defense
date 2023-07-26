import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import Tooltip, { TooltipProps } from '../components/Tooltip';

type ShowTooltipParams = { x: number; y: number; text: string };

interface TooltipContext {
  showTooltip: (props: ShowTooltipParams) => void;
  hideTooltip: VoidFunction;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tooltipContext = createContext<TooltipContext>({} as any);

export const TooltipContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tooltip, setTooltip] = useState<TooltipProps>({
    visible: false,
  });

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

  const value = {
    showTooltip,
    hideTooltip,
  };

  return (
    <tooltipContext.Provider value={value}>
      <Tooltip {...tooltip} />
      {children}
    </tooltipContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTooltipContext = () => useContext(tooltipContext);
