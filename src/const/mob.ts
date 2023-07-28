import { MobInfo, MobName } from '../types/mob';

export const MOB_ONE_STEP_DISTANCE = 8;
export const MOB_SIZE = 16;
export const MOB_MOVEMENT_INTERVAL = 100;
export const MOB_SPEED_SLOWEST = 1;
export const MOB_SPEED_FASTEST = 10;

// SPEED = 1(sloweset) ~ 10(fastest)
const mobs: Record<MobName, MobInfo> = {
  computerScience: {
    name: 'Computer Science',
    hp: 10,
    imageIndex: 0,
    speed: 1,
  },
  bug: {
    name: 'bug',
    hp: 1,
    imageIndex: 1,
    speed: 9,
  },
};

export default mobs;
