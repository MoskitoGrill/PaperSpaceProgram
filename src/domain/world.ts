export interface Marker { id: string; position: { x: number; y: number } }
export interface WorldState {
  mode: '2d';
  tick: number;
  body: Marker;
  vessel: Marker;
}
export const TICKS_PER_SECOND = 60;
export const timeSeconds = (world: WorldState): number => world.tick / TICKS_PER_SECOND;
