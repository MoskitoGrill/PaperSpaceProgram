import type { WorldState } from '../domain/world';
import { propagate } from '../sim/orbit';
export function createOrb(e: number): WorldState {
  const orbit = { mu: 3.6e12, radius: 600_000, a: 1_000_000, e, angle: 0, direction: 1 as const };
  const state = propagate(orbit, 0);
  return { mode: '2d', tick: 0, orbit, body: { id: 'orb-body', position: { x: 0, y: 0 } }, vessel: { id: 'orb-vessel', position: state.position }, velocity: state.velocity };
}
export function createSys001(): WorldState {
  return { mode: '2d', tick: 0, body: { id: 'sys001-body', position: { x: 70, y: 0 } }, vessel: { id: 'sys001-vessel', position: { x: 300, y: 50 } } };
}
