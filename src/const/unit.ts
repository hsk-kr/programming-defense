import { UnitInfo, UnitName } from '../types/unit';

/** Resources */
import javascript from '../assets/unit/javascript.png';
import typescript from '../assets/unit/typescript.png';
import html from '../assets/unit/html.png';
import css from '../assets/unit/css.png';
import python from '../assets/unit/python.png';
import react from '../assets/unit/react.png';
import vue from '../assets/unit/vue.png';
import angular from '../assets/unit/angular.png';
import svelte from '../assets/unit/svelte.png';
import c from '../assets/unit/c.png';
import cpp from '../assets/unit/cpp.png';
import rust from '../assets/unit/rust.png';
import java from '../assets/unit/java.png';
import csharp from '../assets/unit/csharp.png';
import go from '../assets/unit/go.png';
import php from '../assets/unit/php.png';

export const UNIT_CNT_LIMIT = 100;
export const UNIT_GENERATION_COST = 10;
export const BULLET_INTERVAL = 10;
export const BULLET_SIZE = 5;
export const BULLET_LIFE = 1500;
export const BULLET_SPEED_SLOWEST = 1;
export const BULLET_SPEED_FASTEST = 10;

// COMPOSITION

// RELOAD = 1 = 10ms, 100 = 1000ms
// SPEED = 1(sloweset) ~ 10(fastest)
const units: Record<UnitName, UnitInfo & { imgSrc: string }> = {
  javascript: {
    name: 'javascript',
    desc: 'Javascript',
    grade: 1,
    damage: 1,
    speed: 5,
    reload: 300,
    neededUnits: [],
    returnCost: 5,
    imgSrc: javascript,
  },
  html: {
    name: 'html',
    desc: 'HTML',
    grade: 1,
    damage: 1,
    speed: 5,
    reload: 300,
    neededUnits: [],
    returnCost: 5,
    imgSrc: html,
  },
  css: {
    name: 'css',
    desc: 'CSS',
    grade: 1,
    damage: 1,
    speed: 5,
    reload: 300,
    neededUnits: [],
    returnCost: 5,
    imgSrc: css,
  },
  c: {
    name: 'c',
    desc: 'C',
    grade: 1,
    damage: 1,
    speed: 5,
    reload: 300,
    neededUnits: [],
    returnCost: 5,
    imgSrc: c,
  },
  python: {
    name: 'python',
    desc: 'Python',
    grade: 1,
    damage: 1,
    speed: 5,
    reload: 300,
    neededUnits: [],
    returnCost: 5,
    imgSrc: python,
  },
  typescript: {
    name: 'typescript',
    desc: 'typescript',
    grade: 2,
    damage: 2,
    speed: 7,
    reload: 300,
    neededUnits: ['javascript', 'javascript'],
    returnCost: 10,
    imgSrc: typescript,
  },
  react: {
    name: 'react',
    desc: 'React',
    grade: 3,
    damage: 10,
    speed: 6,
    reload: 200,
    neededUnits: ['html', 'css', 'typescript'],
    returnCost: 20,
    imgSrc: react,
  },
  vue: {
    name: 'vue',
    desc: 'Vue',
    grade: 3,
    damage: 8,
    speed: 7,
    reload: 200,
    neededUnits: ['html', 'css', 'typescript'],
    returnCost: 20,
    imgSrc: vue,
  },
  angular: {
    name: 'angular',
    desc: 'Angular',
    grade: 3,
    damage: 3,
    speed: 9,
    reload: 300,
    neededUnits: ['html', 'css', 'typescript'],
    returnCost: 20,
    imgSrc: angular,
  },
  svelte: {
    name: 'svelte',
    desc: 'Svelte',
    grade: 4,
    damage: 20,
    speed: 10,
    reload: 200,
    neededUnits: ['react', 'vue', 'angular'],
    returnCost: 60,
    imgSrc: svelte,
  },
  'c++': {
    name: 'c++',
    desc: 'C++',
    grade: 2,
    damage: 4,
    speed: 5,
    reload: 300,
    neededUnits: ['c', 'c'],
    returnCost: 10,
    imgSrc: cpp,
  },
  java: {
    name: 'java',
    desc: 'JAVA',
    grade: 3,
    damage: 12,
    speed: 5,
    reload: 300,
    neededUnits: ['c', 'c++', 'python'],
    returnCost: 20,
    imgSrc: java,
  },
  'c#': {
    name: 'c#',
    desc: 'C#',
    grade: 3,
    damage: 12,
    speed: 5,
    reload: 300,
    neededUnits: ['c', 'c++', 'python'],
    returnCost: 20,
    imgSrc: csharp,
  },
  rust: {
    name: 'rust',
    desc: 'Rust',
    grade: 4,
    damage: 40,
    speed: 6,
    reload: 250,
    neededUnits: ['c#', 'c#', 'php'],
    returnCost: 50,
    imgSrc: rust,
  },
  go: {
    name: 'go',
    desc: 'GO',
    grade: 4,
    damage: 5,
    speed: 7,
    reload: 50,
    neededUnits: ['java', 'java', 'php'],
    returnCost: 50,
    imgSrc: go,
  },
  php: {
    name: 'php',
    desc: 'PHP',
    grade: 2,
    damage: 2,
    speed: 5,
    reload: 200,
    neededUnits: ['python', 'python'],
    returnCost: 10,
    imgSrc: php,
  },
};

export default units;
