import type { WorldState } from '../domain/world';
import { step } from '../sim/step';
export class Session {
  private world: WorldState;
  constructor(private readonly createWorld: () => WorldState) { this.world = createWorld(); }
  snapshot(): WorldState { return structuredClone(this.world); }
  advance(ticks = 1): void { this.world = step(this.world, ticks); }
  reset(): void { this.world = this.createWorld(); }
}
