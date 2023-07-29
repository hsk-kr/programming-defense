import { v4 as uuidv4 } from 'uuid';
import units, { BULLET_LIFE, BULLET_SPEED_FASTEST } from '../const/unit';
import { Bullet, NextUnit, Unit, UnitInfo, UnitName } from '../types/unit';
import { TILE_SIZE } from '../const/map';
import { MOB_SIZE } from '../const/mob';

const getRandomFirstGradeUnit = (): Unit => {
  const firstGradeUnits: Unit[] = [];

  for (const unitName of Object.keys(units)) {
    if (units[unitName as UnitName].grade === 1)
      firstGradeUnits.push(units[unitName]);
  }

  return firstGradeUnits[Math.floor(Math.random() * firstGradeUnits.length)];
};

const getNextUnits = (unitName: UnitName): NextUnit[] => {
  const nextUnits: NextUnit[] = [];

  const nextUnitNames = Object.keys(units) as UnitName[];

  for (const nextUnitName of nextUnitNames) {
    if (units[nextUnitName].neededUnits.includes(unitName)) {
      nextUnits.push({
        unitName: nextUnitName,
        neededUnits: units[nextUnitName].neededUnits,
      });
    }
  }

  return nextUnits;
};

/**
 * Assign id and position in the unit
 */
const createNewUnit = ({
  unit,
  map,
  unitList,
}: {
  unit: UnitInfo;
  map: number[][];
  unitList: Unit[];
}): Unit | undefined => {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (
        map[y][x] === 0 &&
        unitList.filter((unit) => unit.x === x && unit.y === y).length === 0
      ) {
        return { ...unit, x, y, id: uuidv4(), reloadInterval: 0 };
      }
    }
  }

  return undefined;
};

const createNewBullet = ({
  unit,
  mobPos,
  power,
  speed,
}: {
  unit: Unit;
  mobPos: {
    x: number;
    y: number;
  };
  power: number;
  speed: number;
}): Bullet => {
  // 180(Left) ~ 0(Right)
  const [unitCenterX, unitCenterY] = [
    TILE_SIZE * unit.x + TILE_SIZE / 2,
    TILE_SIZE * unit.y + TILE_SIZE / 2,
  ];
  const [mobCenterX, mobCenterY] = [
    mobPos.x + MOB_SIZE / 2,
    mobPos.y + MOB_SIZE / 2,
  ];
  const degreeToTarget =
    (Math.atan2(mobCenterY - unitCenterY, mobCenterX - unitCenterX) * 180) /
    Math.PI;

  const forceX = 1 - Math.abs(degreeToTarget) / 90;
  const forceY =
    (degreeToTarget > 0 ? 1 : -1) *
    (1 - Math.abs((90 - Math.abs(degreeToTarget)) / 90));
  const powerExp = 1 + power / 100;
  const speedExp = 1 + speed / 100;
  const enhancedForceX =
    forceX * speedExp * (1 + unit.speed / BULLET_SPEED_FASTEST);
  const enhancedForceY =
    forceY * speedExp * (1 + unit.speed / BULLET_SPEED_FASTEST);

  const newBullet: Bullet = {
    id: uuidv4(),
    damage: unit.damage * powerExp,
    speed: unit.speed / speedExp,
    speedInterval: 0,
    x: unitCenterX,
    y: unitCenterY,
    forceX: enhancedForceX,
    forceY: enhancedForceY,
    bulletLife: BULLET_LIFE,
  };

  return newBullet;
};

export {
  getRandomFirstGradeUnit,
  createNewUnit,
  createNewBullet,
  getNextUnits,
};
