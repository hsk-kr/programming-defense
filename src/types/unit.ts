export type AttackType = 'basic';

export type UnitName = 'html' | 'css' | 'javascript';

export type UnitInfo = {
  name: UnitName;
  desc: string;
  grade: number;
  power: number;
  attackType: AttackType;
  speed: number;
  nextUnits: {
    unitName: UnitName;
    neededUnits: UnitName[];
  }[];
  returnCost: number;
};

// TODO: Unit has all information. It doesn't need to include UnitInfo since this type is only used to locate units in the map.
export type Unit = UnitInfo & {
  id: string;
  x: number;
  y: number;
};
