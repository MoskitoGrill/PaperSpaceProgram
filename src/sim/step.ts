import type { WorldState } from '../domain/world';
import { TICKS_PER_SECOND } from '../domain/world';
import { propagate } from './orbit';
export function step(world: WorldState, ticks = 1): WorldState {
  if (!Number.isSafeInteger(world.tick) || world.tick < 0 || !Number.isSafeInteger(ticks) || ticks <= 0 || !Number.isSafeInteger(world.tick + ticks)) {
    throw new Error('Tick je mimo bezpečný rozsah.');
  }
  const tick = world.tick + ticks;
  if (!world.orbit) return { ...world, tick };
  const state = propagate(world.orbit, tick / TICKS_PER_SECOND);
  return { ...world, tick, vessel: { ...world.vessel, position: state.position }, velocity: state.velocity };
}
