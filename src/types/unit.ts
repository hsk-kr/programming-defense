export type AttackType = 'basic';

export type UnitName = 'html' | 'css' | 'javascript' | 'typescript';

export interface NextUnit {
  unitName: UnitName;
  neededUnits: UnitName[];
}

export type UnitInfo = {
  name: UnitName;
  desc: string;
  grade: number;
  attackType: AttackType;
  damage: number;
  speed: number;
  reload: number;
  nextUnits: NextUnit[];
  returnCost: number;
};

// TODO: Unit has all information. It doesn't need to include UnitInfo since this type is only used to locate units in the map.
export type Unit = UnitInfo & {
  id: string;
  x: number;
  y: number;
};
