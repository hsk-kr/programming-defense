import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface GameStatus {
  level: number;
  life: number;
  money: number;
  moneyLevel: number;
  power: number;
  speed: number;
  reload: number;
}

interface GameContext extends GameStatus {
  startIncreaseMoney: VoidFunction;
}

const defaultGameStatusValue: GameStatus = {
  level: 1,
  life: 100,
  money: 1,
  moneyLevel: 1,
  power: 0,
  speed: 0,
  reload: 0,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gameContext = createContext<GameContext>({} as any);

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    defaultGameStatusValue
  );
  const timerIds = useRef<{
    money?: number;
  }>({});

  const startIncreaseMoney = () => {
    if (timerIds.current.money) {
      clearInterval(timerIds.current.money);
    }

    setInterval(() => {
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        money: prevGameStatus.money + prevGameStatus.moneyLevel,
      }));
    }, 1000);
  };

  // Release timers
  useEffect(() => {
    return () => {
      if (timerIds.current.money) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearInterval(timerIds.current.money);
      }
    };
  }, []);

  const value = {
    ...gameStatus,
    startIncreaseMoney,
  };

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => useContext(gameContext);
