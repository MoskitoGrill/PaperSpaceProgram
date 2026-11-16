import type { WorldState } from '../domain/world';
export function createSys001(): WorldState {
  return { mode: '2d', tick: 0, body: { id: 'sys001-body', position: { x: 70, y: 0 } }, vessel: { id: 'sys001-vessel', position: { x: 300, y: 50 } } };
}
