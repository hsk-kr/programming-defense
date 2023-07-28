import { UPGRADEABLE_STATUS } from '../types/game';

const upgradeCost = (type: UPGRADEABLE_STATUS, value: number) => {
  if (type === 'moneyLevel') return value * 10;
  else if (type === 'speed' || type === 'reload') return 10 + value * 10;
  else return value + 10;
};

export { upgradeCost };
