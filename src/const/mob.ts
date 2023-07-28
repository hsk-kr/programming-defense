import { MobInfo, MobName } from '../types/mob';

export const MOB_ONE_STEP_DISTANCE = 5;
export const MOB_SIZE = 16;
export const MOB_MOVEMENT_INTERVAL = 100;
export const MOB_SPEED_SLOWEST = 1;
export const MOB_SPEED_FASTEST = 10;

// SPEED = 1(sloweset) ~ 10(fastest)
const mobs: Record<MobName, MobInfo> = {
  os: {
    name: 'OS',
    hp: 1,
    imageIndex: 0,
    speed: 2,
  },
  network: {
    name: 'Network',
    hp: 2,
    imageIndex: 2,
    speed: 5,
  },
  data_structure: {
    name: 'DS',
    hp: 4,
    imageIndex: 3,
    speed: 5,
  },
  algorithm: {
    name: 'Algorithm',
    hp: 8,
    imageIndex: 4,
    speed: 5,
  },
  ai: {
    name: 'AI',
    hp: 10,
    imageIndex: 5,
    speed: 8,
  },
  bug: {
    name: 'bug',
    hp: 100,
    imageIndex: 10,
    speed: 2,
  },
  dev_to: {
    name: 'Dev.to',
    hp: 25,
    imageIndex: 13,
    speed: 6,
  },
  youtube: {
    name: 'Youtube',
    hp: 15,
    imageIndex: 6,
    speed: 8,
  },
  stack_overflow: {
    name: 'Stack Overflow',
    hp: 50,
    imageIndex: 7,
    speed: 6,
  },
  linkedin: {
    name: 'Linkedin',
    hp: 100,
    imageIndex: 8,
    speed: 4,
  },
  indeed: {
    name: 'Indeed',
    hp: 50,
    imageIndex: 9,
    speed: 6,
  },
  burnout: {
    name: 'Burnout',
    hp: 1000,
    imageIndex: 11,
    speed: 2,
  },
  coding_test: {
    name: 'Coding Test',
    hp: 100,
    imageIndex: 14,
    speed: 7,
  },
  recruiter: {
    name: 'Recruiter',
    hp: 150,
    imageIndex: 15,
    speed: 7,
  },
  interviewer: {
    name: 'Interviewer',
    hp: 200,
    imageIndex: 16,
    speed: 7,
  },
  onboarding: {
    name: 'Onboarding',
    hp: 300,
    imageIndex: 17,
    speed: 7,
  },
  team_leader: {
    name: 'Team Leader',
    hp: 400,
    imageIndex: 18,
    speed: 7,
  },
  CEO: {
    name: 'CEO',
    hp: 5000,
    imageIndex: 12,
    speed: 2,
  },
};

export default mobs;
