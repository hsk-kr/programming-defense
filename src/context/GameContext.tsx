import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGlobalContext } from './GlobalContext';
import { upgradeCost } from '../lib/calc';
import { UPGRADEABLE_STATUS } from '../types/game';
import { Bullet, NextUnit, Unit } from '../types/unit';
import units, {
  BULLET_INTERVAL,
  BULLET_SIZE,
  BULLET_SPEED_FASTEST,
  UNIT_CNT_LIMIT,
  UNIT_GENERATION_COST,
} from '../const/unit';
import {
  createNewBullet,
  createNewUnit,
  getRandomFirstGradeUnit,
} from '../lib/unit';
import { SHOOTABLE_POSITION, map } from '../const/map';

// resources
import MobSpriteImg from '../assets/mob/mob.png';
import { Mob } from '../types/mob';
import stages, { EACH_STATE_TIME } from '../const/stage';
import { createMob } from '../lib/mobs';
import {
  MOB_MOVEMENT_INTERVAL,
  MOB_ONE_STEP_DISTANCE,
  MOB_SIZE,
  MOB_SPEED_FASTEST,
} from '../const/mob';
import {
  GAME_SCREEN_HEIGHT,
  GAME_SCREEN_WIDTH,
  INCRASE_MONEY_INTERVAL,
  MONEY_WHNE_KILL_MOB,
  SCREEN_WIDTH,
} from '../const/game';

interface GameStatus {
  level: number;
  life: number;
  money: number;
  moneyLevel: number;
  power: number;
  speed: number;
  reload: number;
}

interface IStatus {
  time: number;
  startIncreaseMoney: VoidFunction;
  upgradeStatus: (type: UPGRADEABLE_STATUS) => () => void;
  generateUnit: VoidFunction;
}

interface IUnit {
  unitList: Unit[];
  bulletList: Bullet[];
  selectedUnitId: string;
  setSelectedUnitId: Dispatch<SetStateAction<string>>;
  relocateSelectedUnit: (x: number, y: number) => void;
  sellSelectedUnit: VoidFunction;
  upgradeUnit: (nextUnit: NextUnit) => void;
}

interface IMob {
  mobList: Mob[];
  mobSpriteImage?: HTMLImageElement;
}

type GameContext = GameStatus & IStatus & IUnit & IMob;

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
  const [gameEnd, setGameEnd] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string>();
  const [time, setTime] = useState<number>(EACH_STATE_TIME);
  const [unitList, setUnitList] = useState<Unit[]>([]);
  const [bulletList, setBulletList] = useState<Bullet[]>([]);
  const [mobList, setMobList] = useState<Mob[]>([]);
  const [mobSpriteImage, setMobSpriteImage] = useState<HTMLImageElement>();
  const { showGameMessage } = useGlobalContext();
  const mobListRef = useRef<Mob[]>(); // To use in useEffect without dependencies, it's updated when mobs move
  const timerIds = useRef<{
    money?: number;
    timer?: number;
    mob?: number;
    mobMove?: number;
    bullet?: number;
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

  const relocateSelectedUnit = useCallback(
    (x: number, y: number) => {
      if (!selectedUnitId) return;

      const selectedUnit = unitList.find((unit) => unit.id === selectedUnitId);
      if (!selectedUnit) {
        return;
      }

      selectedUnit.x = x;
      selectedUnit.y = y;
      setSelectedUnitId(undefined);
    },
    [selectedUnitId, unitList]
  );

  const sellSelectedUnit = useCallback(() => {
    if (!selectedUnitId) return;

    const selectedUnit = unitList.find((unit) => unit.id === selectedUnitId);
    if (!selectedUnit) {
      return;
    }

    setUnitList((prevUnitList) =>
      prevUnitList.filter((unit) => unit.id !== selectedUnitId)
    );
    setGameStatus((prevGameStatus) => ({
      ...prevGameStatus,
      money: prevGameStatus.money + selectedUnit.returnCost,
    }));
    setSelectedUnitId(undefined);
  }, [selectedUnitId, unitList]);

  const upgradeUnit = useCallback(
    (nextUnit: NextUnit) => {
      const newUnit = createNewUnit({
        unit: units[nextUnit.unitName],
        map,
        unitList,
      });
      if (!newUnit) {
        console.error('next unit not found');
        return;
      }

      const neededUnits = [...nextUnit.neededUnits];
      const unitsWillUse = [];

      for (const unit of unitList) {
        const index = neededUnits.indexOf(unit.name);
        if (index !== -1) {
          unitsWillUse.push(unit.id);
          neededUnits.splice(index, 1);
        }

        if (neededUnits.length === 0) break;
      }

      if (neededUnits.length > 0) {
        showGameMessage('Need More Units');
        return;
      }

      const newUnitList = unitList
        .filter((unit) => !unitsWillUse.includes(unit.id))
        .concat(newUnit);

      setUnitList(newUnitList);
      setSelectedUnitId(undefined);
    },
    [showGameMessage, unitList]
  );

  const generateUnit = useCallback(() => {
    if (gameStatus.money < UNIT_GENERATION_COST) {
      showGameMessage('Not Enough Money');
      return;
    } else if (unitList.length > UNIT_CNT_LIMIT) {
      showGameMessage(`You cannot generate units more than ${UNIT_CNT_LIMIT}.`);
      return;
    }

    setGameStatus((prevGameStatus) => ({
      ...prevGameStatus,
      money: prevGameStatus.money - UNIT_GENERATION_COST,
    }));

    setUnitList((prevUnitList) => {
      const randomUnit = getRandomFirstGradeUnit();
      const newUnit = createNewUnit({
        unit: randomUnit,
        map,
        unitList: prevUnitList,
      });

      return newUnit ? prevUnitList.concat(newUnit) : prevUnitList;
    });
  }, [gameStatus.money, showGameMessage, unitList.length]);

  // Release timers
  useEffect(() => {
    return () => {
      for (const timerId of Object.keys(timerIds.current)) {
        if (timerIds.current[timerId]) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          clearInterval(timerIds.current.money);
        }
      }
    };
  }, []);

  // Release main timer when the game is done
  useEffect(() => {
    if (!gameEnd) return;

    if (timerIds.current.timer) {
      clearInterval(timerIds.current.timer);
    }
  }, [gameEnd]);

  // Load Mob Image
  useEffect(() => {
    const mobImg = new window.Image();

    mobImg.addEventListener('load', () => {
      setMobSpriteImage(mobImg);
    });

    mobImg.src = MobSpriteImg;
  }, []);

  // Timer leveling up
  useEffect(() => {
    let stageUp = false;
    let gameEnd = false;

    timerIds.current.timer = setInterval(() => {
      // When the game is done, main timer stops
      if (gameEnd) {
        setGameEnd(true);
        clearInterval(timerIds.current.timer);
        return;
      }
      if (stageUp) {
        setGameStatus((prevGameStatus) => {
          const isAllStageCleared = prevGameStatus.level > stages.length;
          if (isAllStageCleared) {
            gameEnd = true;
            return prevGameStatus;
          }

          return {
            ...prevGameStatus,
            level: prevGameStatus.level + 1,
          };
        });
        stageUp = false;
      }

      setTime((prevTime) => {
        if (prevTime === 1) {
          stageUp = true;
          return EACH_STATE_TIME;
        }

        return prevTime - 1;
      });
    }, 1000);
  }, []);

  // When level is up, zen mobs
  useEffect(() => {
    const isAllStageCleared = gameStatus.level > stages.length;
    if (isAllStageCleared) return;

    const mobs = stages[gameStatus.level - 1].mobs;
    let index = 0;

    timerIds.current.mob = setInterval(() => {
      const allMobCreated = index >= mobs.length;
      // When the game is done, zen mob timer stops
      if (allMobCreated || gameEnd) {
        clearInterval(timerIds.current.mob);
        return;
      }

      setMobList((prevMobList) => {
        const newPrevMobList = prevMobList.concat(
          createMob(mobs[index].name, mobs[index].cnt, [270, 368])
        );
        index++;
        return newPrevMobList;
      });
    }, 1000);

    return () => {
      if (timerIds.current.mob) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearInterval(timerIds.current.mob);
      }
    };
  }, [gameStatus.level, gameEnd]);

  // Mob Move and Decrease Mob(when mob moves, it checks a number of mobs over the line)
  useEffect(() => {
    let mobCntOverLine = 0;
    let gameEnd = false;

    timerIds.current.mobMove = setInterval(() => {
      if (gameEnd) {
        setGameEnd(true);
      }

      if (mobCntOverLine > 0) {
        const valueToDecreaseLife = mobCntOverLine;
        mobCntOverLine = 0;
        setGameStatus((prevGameStatus) => {
          const life = prevGameStatus.life - valueToDecreaseLife;
          if (life < 0) gameEnd = true;

          return {
            ...prevGameStatus,
            life,
          };
        });
      }

      setMobList((prevMobList) => {
        const newMobList = prevMobList.map((mob) => {
          mob.speedInterval--;

          if (mob.speedInterval <= 0) {
            mob.speedInterval = MOB_SPEED_FASTEST - mob.speed;
            mob.x += MOB_ONE_STEP_DISTANCE;
          }

          return { ...mob };
        });

        const aliveMobList = newMobList.filter(
          (mob) => mob.x + MOB_SIZE / 2 < SCREEN_WIDTH
        );

        mobCntOverLine = newMobList.length - aliveMobList.length;

        mobListRef.current = aliveMobList; // For bullet useEffect
        return aliveMobList;
      });
    }, MOB_MOVEMENT_INTERVAL);

    return () => {
      if (timerIds.current.mobMove) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearInterval(timerIds.current.mobMove);
      }
    };
  }, [gameStatus.level]);

  // Generate bullets
  useEffect(() => {
    let bulletsReadyToShoot: Bullet[] = [];
    let mobIdAndBulletGetShot: Record<string, Bullet> = {};
    let killedMobCnt = 0;

    timerIds.current.bullet = setInterval(() => {
      // Generate bullets
      setGameStatus((prevGameStatus) => {
        setUnitList((prevUnitList) => {
          for (const unit of prevUnitList) {
            if (map[unit.y][unit.x] !== SHOOTABLE_POSITION) continue;

            unit.reloadInterval++;
            if (
              unit.reloadInterval <
              unit.reload / (1 + prevGameStatus.reload / 100)
            ) {
              continue;
            }
            const mobsInOrderClose = mobListRef.current
              .map((mob) => {
                return {
                  x: mob.x,
                  y: mob.y,
                  weight: Math.abs(mob.x - unit.x),
                };
              })
              .sort((a, b) => b.weight - a.weight);
            if (mobsInOrderClose.length === 0) continue;

            const newBullet = createNewBullet({
              unit,
              mobPos: {
                x: mobsInOrderClose[0].x,
                y: mobsInOrderClose[0].y,
              },
              power: prevGameStatus.power,
              speed: prevGameStatus.speed,
            });
            bulletsReadyToShoot.push(newBullet);
            unit.reloadInterval = 0;
          }

          return prevUnitList;
        });

        return prevGameStatus;
      });

      // Add bullets
      setBulletList((bulletList) => {
        if (bulletsReadyToShoot.length === 0) return bulletList;

        const newBulletList = bulletList.concat(...bulletsReadyToShoot);
        bulletsReadyToShoot = [];
        return newBulletList;
      });

      // Move and delete bullets
      setBulletList((bulletList) => {
        const newBulletList = [];

        for (const bullet of bulletList) {
          bullet.speedInterval -= 1;
          if (bullet.speedInterval < 0) {
            bullet.x += bullet.forceX;
            bullet.y += bullet.forceY;
            bullet.speedInterval = BULLET_SPEED_FASTEST - bullet.speed;
          }

          // since bullet is rendered from the center, the calcaulation of the position is different from images.
          const collideMobs = mobListRef.current.filter(
            (mob) =>
              !(
                mob.x > bullet.x + BULLET_SIZE / 2 ||
                mob.x + MOB_SIZE < bullet.x ||
                mob.y > bullet.y + BULLET_SIZE / 2 ||
                mob.y + MOB_SIZE < bullet.y
              )
          );

          if (collideMobs.length === 0) {
            // If a bullet is inside the screen

            if (
              !(
                BULLET_SIZE + bullet.y >= GAME_SCREEN_HEIGHT ||
                BULLET_SIZE + bullet.x >= GAME_SCREEN_WIDTH
              )
            ) {
              newBulletList.push(bullet);
            }
            continue;
          }

          mobIdAndBulletGetShot[collideMobs[0].id] = bullet;
        }

        return newBulletList;
      });

      // Make damage and kill mobs
      setMobList((prevMobList) => {
        const mobIds = Object.keys(mobIdAndBulletGetShot);
        if (mobIds.length === 0) return prevMobList;

        const newMobList = prevMobList
          .map((mob) => {
            if (!mobIds.includes(mob.id)) return mob;

            mob.hp -= mobIdAndBulletGetShot[mob.id].damage;
            return mob;
          })
          .filter((mob) => mob.hp > 0);

        killedMobCnt = prevMobList.length - newMobList.length;
        mobIdAndBulletGetShot = {};

        return newMobList;
      });

      // Earn money by number of killed mobs
      setGameStatus((prevGameStatus) => {
        if (killedMobCnt === 0) return prevGameStatus;

        const newGameStatus = {
          ...prevGameStatus,
          money: prevGameStatus.money + killedMobCnt * MONEY_WHNE_KILL_MOB,
        };
        killedMobCnt = 0;

        return newGameStatus;
      });
    }, BULLET_INTERVAL);

    return () => {
      if (timerIds.current.bullet) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearInterval(timerIds.current.bullet);
      }
    };
  }, []);

  const value = {
    ...gameStatus,
    unitList,
    bulletList,
    startIncreaseMoney,
    upgradeStatus,
    generateUnit,
    selectedUnitId,
    setSelectedUnitId,
    relocateSelectedUnit,
    sellSelectedUnit,
    upgradeUnit,
    mobSpriteImage,
    mobList,
    time,
  };

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => useContext(gameContext);
