// export type AttackType = 'basic';

export type UnitName =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'vue'
  | 'angular'
  | 'svelte'
  | 'c'
  | 'c++'
  | 'rust'
  | 'java'
  | 'c#'
  | 'go'
  | 'php'
  | 'python';

export interface NextUnit {
  unitName: UnitName;
  neededUnits: UnitName[];
}

export type UnitInfo = {
  name: UnitName;
  desc: string;
  grade: number;
  // attackType: AttackType;
  damage: number;
  speed: number; // 100ms * speed
  reload: number; // 100ms * speed
  neededUnits: UnitName[];
  returnCost: number;
};

// TODO: Unit has all information. It doesn't need to include UnitInfo since this type is only used to locate units in the map.
export type Unit = UnitInfo & {
  id: string;
  x: number;
  y: number;
  reloadInterval: number; // when it reahes the speed, the unit create a bullet
};

export interface Bullet {
  id: string;
  damage: number;
  speed: number;
  speedInterval: number; // when it reahes the speed, the bullet moves
  x: number;
  y: number;
  bulletLife: number;
  forceX: number; // Bullet Direction
  forceY: number; // Bullet Direction
}
