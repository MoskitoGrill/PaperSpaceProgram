export interface Marker { id: string; position: { x: number; y: number } }
export interface Orbit { mu: number; radius: number; a: number; e: number; angle: number; direction: 1 | -1 }
export interface WorldState {
  mode: '2d';
  tick: number;
  body: Marker;
  vessel: Marker;
  orbit?: Orbit;
  velocity?: { x: number; y: number };
}
export const TICKS_PER_SECOND = 60;
export const timeSeconds = (world: WorldState): number => world.tick / TICKS_PER_SECOND;
