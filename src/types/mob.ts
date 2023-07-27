export interface MobInfo {
  name: string;
  imageIndex: number;
  hp: number;
  speed: number; // 100ms * speed
}

export interface Mob extends MobInfo {
  id: string;
  speedInterval: number; // when it reahes the speed, the mob moves
  x: number;
  y: number;
}

export type MobName = 'computerScience' | 'bug';
