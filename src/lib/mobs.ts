import { v4 as uuidv4 } from 'uuid';
import { Mob, MobName } from '../types/mob';
import mobs from '../const/mob';

const createMob = (
  mobName: MobName,
  cnt: number,
  yRange: [number, number]
): Mob[] => {
  const newMobs: Mob[] = [];

  for (let i = 0; i < cnt; i++) {
    const newMob: Mob = {
      ...mobs[mobName],
      id: uuidv4(),
      speedInterval: 0,
      x: -Math.floor(Math.random() * 16),
      y: yRange[0] + Math.floor(Math.random() * (yRange[1] - yRange[0])),
    };

    newMobs.push(newMob);
  }

  return newMobs;
};

export { createMob };
