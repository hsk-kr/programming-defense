import { MobName } from '../types/mob';

export const EACH_STATE_TIME = 30;

const createMobs = (name: MobName, mobCnt: number, num: number) => {
  const mobs: {
    name: MobName;
    cnt: number;
  }[] = [];

  for (let i = 0; i < num; i++) {
    mobs.push({
      name,
      cnt: mobCnt,
    });
  }

  return mobs;
};

const stages: {
  mobs: {
    name: MobName;
    cnt: number;
  }[]; // Zen mobs each seconds
}[] = [
  // STAGE 1
  {
    mobs: [...createMobs('os', 1, 10)],
  },
  // STAGE 2
  {
    mobs: [...createMobs('os', 2, 5)],
  },
  // STAGE 3
  {
    mobs: [...createMobs('network', 1, 10)],
  },
  // STAGE 4
  {
    mobs: [...createMobs('network', 2, 5)],
  },
  // STAGE 5
  {
    mobs: [...createMobs('data_structure', 1, 10)],
  },
  // STAGE 6
  {
    mobs: [...createMobs('data_structure', 2, 5)],
  },
  // STAGE 7
  {
    mobs: [...createMobs('algorithm', 1, 10)],
  },
  // STAGE 8
  {
    mobs: [...createMobs('algorithm', 2, 5)],
  },
  // STAGE 9
  {
    mobs: [...createMobs('ai', 1, 10)],
  },
  // STAGE 10
  {
    mobs: [
      ...createMobs('os', 3, 1),
      ...createMobs('network', 3, 1),
      ...createMobs('bug', 1, 1),
      ...createMobs('data_structure', 3, 1),
      ...createMobs('algorithm', 3, 1),
      ...createMobs('ai', 2, 5),
    ],
  },
  // STAGE 11
  {
    mobs: [...createMobs('dev_to', 2, 10)],
  },
  // STAGE 12
  {
    mobs: [...createMobs('dev_to', 4, 5)],
  },
  // STAGE 13
  {
    mobs: [...createMobs('youtube', 2, 10)],
  },
  // STAGE 14
  {
    mobs: [...createMobs('youtube', 4, 5)],
  },
  // STAGE 15
  {
    mobs: [...createMobs('stack_overflow', 2, 10)],
  },
  // STAGE 16
  {
    mobs: [...createMobs('stack_overflow', 4, 5)],
  },
  // STAGE 17
  {
    mobs: [...createMobs('linkedin', 2, 10)],
  },
  // STAGE 18
  {
    mobs: [...createMobs('linkedin', 4, 5)],
  },
  // STAGE 19
  {
    mobs: [...createMobs('indeed', 2, 10)],
  },
  // STAGE 20
  {
    mobs: [
      ...createMobs('burnout', 1, 1),
      ...createMobs('indeed', 10, 1),
      ...createMobs('linkedin', 10, 1),
      ...createMobs('stack_overflow', 10, 1),
      ...createMobs('youtube', 0, 1),
      ...createMobs('dev_to', 10, 1),
    ],
  },
  // STAGE 21
  {
    mobs: [...createMobs('coding_test', 2, 20)],
  },
  // STAGE 22
  {
    mobs: [...createMobs('coding_test', 4, 10)],
  },
  // STAGE 23
  {
    mobs: [...createMobs('recruiter', 2, 20)],
  },
  // STAGE 24
  {
    mobs: [...createMobs('recruiter', 4, 10)],
  },
  // STAGE 25
  {
    mobs: [...createMobs('interviewer', 2, 20)],
  },
  // STAGE 26
  {
    mobs: [...createMobs('interviewer', 4, 10)],
  },
  // STAGE 27
  {
    mobs: [
      ...createMobs('coding_test', 10, 1),
      ...createMobs('recruiter', 10, 1),
      ...createMobs('onboarding', 4, 10),
    ],
  },
  // STAGE 28
  {
    mobs: [
      ...createMobs('onboarding', 10, 1),
      ...createMobs('interviewer', 10, 1),
      ...createMobs('onboarding', 8, 5),
    ],
  },
  // STAGE 29
  {
    mobs: [
      ...createMobs('team_leader', 4, 5),
      ...createMobs('onboarding', 8, 1),
      ...createMobs('team_leader', 4, 5),
      ...createMobs('interviewer', 8, 1),
    ],
  },
  // STAGE 30
  {
    mobs: [
      ...createMobs('team_leader', 8, 3),
      ...createMobs('CEO', 1, 1),
      ...createMobs('interviewer', 8, 3),
      ...createMobs('team_leader', 8, 3),
      ...createMobs('onboarding', 8, 3),
      ...createMobs('team_leader', 4, 10),
    ],
  },
];

export default stages;
