import { UPGRADEABLE_STATUS } from '../types/game';

const upgradeCost = (type: UPGRADEABLE_STATUS, value: number) => {
  if (type === 'moneyLevel') return value * 100;
  else return (value + 1) * 100;
};

export { upgradeCost };
