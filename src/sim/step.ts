import type { WorldState } from '../domain/world';
export function step(world: WorldState): WorldState {
  if (!Number.isSafeInteger(world.tick) || world.tick < 0 || world.tick === Number.MAX_SAFE_INTEGER) {
    throw new Error('Tick je mimo bezpečný rozsah.');
  }
  return { ...world, tick: world.tick + 1 };
}
