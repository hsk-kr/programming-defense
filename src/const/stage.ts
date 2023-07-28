import { MobName } from '../types/mob';

export const EACH_STATE_TIME = 10;

const stages: {
  mobs: {
    name: MobName;
    cnt: number;
  }[]; // Zen mobs each seconds
}[] = [
  {
    mobs: [
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
    ],
  },
  {
    mobs: [
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'bug',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'bug',
        cnt: 5,
      },
    ],
  },
  {
    mobs: [
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
    ],
  },
  {
    mobs: [
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
      {
        name: 'computerScience',
        cnt: 5,
      },
    ],
  },
];

export default stages;
