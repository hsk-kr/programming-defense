import { MobInfo, MobName } from '../types/mob';

export const MOB_ONE_STEP_DISTANCE = 8;

export const MOB_SIZE = 16;

const mobs: Record<MobName, MobInfo> = {
  computerScience: {
    name: 'Computer Science',
    hp: 10,
    imageIndex: 0,
    speed: 6,
  },
  bug: {
    name: 'bug',
    hp: 10,
    imageIndex: 1,
    speed: 5,
  },
};

export default mobs;
