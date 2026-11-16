import { describe, expect, it } from 'vitest';
import { Session } from '../../src/session/session';
import { createSys001 } from '../../src/devtools/scenario';
import { timeSeconds } from '../../src/domain/world';
import { step } from '../../src/sim/step';
describe('SYS-001', () => {
  it('advances real ticks and derives time without moving entities', () => {
    const session = new Session(createSys001), initial = session.snapshot();
    for (let i = 0; i < 3; i++) session.advance();
    expect(session.snapshot().tick).toBe(3);
    expect(timeSeconds(session.snapshot())).toBe(0.05);
    expect(session.snapshot().body).toEqual(initial.body);
    expect(session.snapshot().vessel).toEqual(initial.vessel);
    expect(initial.tick).toBe(0);
  });
  it('isolates two sessions, snapshots, fixtures and repeated full resets', () => {
    const first = new Session(createSys001), second = new Session(createSys001);
    const snapshot = first.snapshot(); snapshot.body.position.x = -999;
    const fixture = createSys001(); fixture.vessel.position.y = -999;
    first.advance();
    expect(second.snapshot()).toEqual(createSys001());
    expect(first.snapshot().body).toEqual(createSys001().body);
    for (let i = 0; i < 4; i++) { first.advance(); first.reset(); expect(first.snapshot()).toEqual(createSys001()); }
    expect(new Session(createSys001).snapshot()).toEqual(createSys001());
  });
  it('rejects ticks that cannot be advanced safely', () => {
    expect(() => step({ ...createSys001(), tick: Number.MAX_SAFE_INTEGER })).toThrow();
    expect(() => step({ ...createSys001(), tick: -1 })).toThrow();
  });
});
