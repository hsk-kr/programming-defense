import { v4 as uuidv4 } from 'uuid';
import units from '../const/unit';
import { Unit, UnitInfo, UnitName } from '../types/unit';

const getRandomFirstGradeUnit = (): Unit => {
  const firstGradeUnits: Unit[] = [];

  for (const unitName of Object.keys(units)) {
    if (units[unitName as UnitName].grade === 1)
      firstGradeUnits.push(units[unitName]);
  }

  return firstGradeUnits[Math.floor(Math.random() * firstGradeUnits.length)];
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
        return { ...unit, x, y, id: uuidv4() };
      }
    }
  }

  return undefined;
};

export { getRandomFirstGradeUnit, createNewUnit };
