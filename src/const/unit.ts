import javascript from '../assets/unit/javascript.png';
import html from '../assets/unit/html.png';
import css from '../assets/unit/css.png';
import { Unit, UnitInfo, UnitName } from '../types/unit';

export const UNIT_CNT_LIMIT = 100;

export const UNIT_GENERATION_COST = 10;

export const getRandomFirstGradeUnit = () => {
  const firstGradeUnits: Unit[] = [];

  for (const unitName of Object.keys(units)) {
    if (units[unitName as UnitName].grade === 1)
      firstGradeUnits.push(units[unitName]);
  }

  return firstGradeUnits[Math.floor(Math.random() * firstGradeUnits.length)];
};

const units: Record<UnitName, UnitInfo & { imgSrc: string }> = {
  javascript: {
    name: 'javascript',
    desc: 'Javascript',
    grade: 1,
    power: 1,
    attackType: 'basic',
    speed: 1,
    nextUnits: [],
    returnCost: 5,
    imgSrc: javascript,
  },
  html: {
    name: 'html',
    desc: 'HTML',
    grade: 1,
    power: 1,
    attackType: 'basic',
    speed: 1,
    nextUnits: [],
    returnCost: 5,
    imgSrc: html,
  },
  css: {
    name: 'css',
    desc: 'CSS',
    grade: 1,
    power: 1,
    attackType: 'basic',
    speed: 1,
    nextUnits: [],
    returnCost: 5,
    imgSrc: css,
  },
};

export default units;
