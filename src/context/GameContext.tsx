import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGlobalContext } from './GlobalContext';
import { upgradeCost } from '../const/calc';
import { UPGRADEABLE_STATUS } from '../types/game';

const INCRASE_MONEY_INTERVAL = 1000;

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
  upgradeStatus: (type: UPGRADEABLE_STATUS) => () => void;
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
  const { showGameMessage } = useGlobalContext();
  const timerIds = useRef<{
    money?: number;
  }>({});

  const startIncreaseMoney = useCallback(() => {
    if (timerIds.current.money) {
      clearInterval(timerIds.current.money);
    }

    timerIds.current.money = setInterval(() => {
      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        money: prevGameStatus.money + prevGameStatus.moneyLevel,
      }));
    }, INCRASE_MONEY_INTERVAL);
  }, []);

  const upgradeStatus = useCallback(
    (type: UPGRADEABLE_STATUS) => () => {
      const cost = upgradeCost(type, gameStatus[type]);

      if (gameStatus.money < cost) {
        showGameMessage('Not enough money');
        return;
      }

      setGameStatus((prevGameStatus) => ({
        ...prevGameStatus,
        money: prevGameStatus.money - cost,
        [type]: prevGameStatus[type] + 1,
      }));
    },
    [gameStatus, showGameMessage]
  );

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
    upgradeStatus,
  };

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => useContext(gameContext);
