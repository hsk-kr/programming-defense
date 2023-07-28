export type MobName =
  // STAGE 1~10
  | 'os'
  | 'network'
  | 'data_structure'
  | 'algorithm'
  | 'ai'
  | 'bug'
  // STAGE 11~20
  | 'dev_to'
  | 'youtube'
  | 'stack_overflow'
  | 'linkedin'
  | 'indeed'
  | 'burnout'
  // STAGE 21~30
  | 'coding_test'
  | 'recruiter'
  | 'interviewer'
  | 'onboarding'
  | 'team_leader'
  | 'CEO';

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
