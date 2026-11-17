import { describe, expect, it } from 'vitest';
import { propagate, period, invariants } from '../../src/sim/orbit';
import { createOrb } from '../../src/devtools/scenario';
import { Session } from '../../src/session/session';
import type { Orbit } from '../../src/domain/world';

// Independent Cartesian Newton ODE + RK4: no production propagator, period or element conversion.
type State = [number, number, number, number];
function reference(o: Orbit, t: number, resolution: number): State {
  const r = o.a * (1 - o.e), speed = Math.sqrt(o.mu * (1 + o.e) / r);
  const c = Math.cos(o.angle), s = Math.sin(o.angle);
  let y: State = [r * c, r * s, -o.direction * speed * s, o.direction * speed * c];
  const T = 2 * Math.PI * Math.sqrt(o.a ** 3 / o.mu);
  const steps = Math.ceil(t / (T / resolution)), dt = t / steps;
  const derivative = (z: State): State => {
    const f = -o.mu / Math.hypot(z[0], z[1]) ** 3;
    return [z[2], z[3], f * z[0], f * z[1]];
  };
  const add = (a: State, b: State, scale: number): State => a.map((v, i) => v + b[i]! * scale) as State;
  for (let i = 0; i < steps; i++) {
    const k1 = derivative(y), k2 = derivative(add(y, k1, dt / 2));
    const k3 = derivative(add(y, k2, dt / 2)), k4 = derivative(add(y, k3, dt));
    y = y.map((v, j) => v + dt / 6 * (k1[j]! + 2 * k2[j]! + 2 * k3[j]! + k4[j]!)) as State;
  }
  return y;
}
const distance = (a: number[], b: number[]) => Math.hypot(...a.map((v, i) => v - b[i]!));
const metrics = { position: 0, velocity: 0, phase: 0, referencePosition: 0, referenceVelocity: 0, period: 0, invariant: 0 };
describe('Kepler independent acceptance', () => {
  it('reference converges and independently measures the ellipse period', () => {
    const o = createOrb(0.3).orbit!, T = 2 * Math.PI * Math.sqrt(o.a ** 3 / o.mu);
    const coarse = reference(o, T * 0.789, 512), medium = reference(o, T * 0.789, 1024), fine = reference(o, T * 0.789, 2048);
    const ratio = distance(coarse, medium) / distance(medium, fine);
    expect(ratio).toBeGreaterThan(12); expect(ratio).toBeLessThan(20);
    let lo = 0.9 * T, hi = 1.1 * T;
    for (let i = 0; i < 36; i++) {
      const mid = (lo + hi) / 2, state = reference(o, mid, 16384);
      expect(state[0]).toBeGreaterThan(0);
      if (state[1] < 0) lo = mid; else hi = mid;
    }
    const relative = Math.abs(((lo + hi) / 2 - T) / T);
    expect(relative).toBeLessThan(1e-8);
    console.log('Independent period relative error', relative, 'RK4 convergence ratio', ratio);
  });
  for (const e of [0, 0.3]) for (const [angle, direction] of [[0, 1], [0.7, -1]] as const) {
    it(`100 periods, intermediate phases, e=${e}, angle=${angle}, direction=${direction}`, () => {
      const o: Orbit = { ...createOrb(e).orbit!, angle, direction };
      const T = 2 * Math.PI * Math.sqrt(o.a ** 3 / o.mu);
      for (const cycles of [0.123, 0.25, 0.5, 0.789, 1, 10.37, 100, 100.123]) {
        const t = cycles * T, actual = propagate(o, t);
        const coarse = reference(o, t, 8192), fine = reference(o, t, 16384);
        const uncertaintyP = distance(coarse.slice(0, 2), fine.slice(0, 2));
        const uncertaintyV = distance(coarse.slice(2), fine.slice(2));
        metrics.referencePosition = Math.max(metrics.referencePosition, uncertaintyP);
        metrics.referenceVelocity = Math.max(metrics.referenceVelocity, uncertaintyV);
        expect(uncertaintyP).toBeLessThan(0.001);
        expect(uncertaintyV).toBeLessThan(1e-6);
        const p = [actual.position.x, actual.position.y], v = [actual.velocity.x, actual.velocity.y];
        const errorP = distance(p, fine.slice(0, 2)), errorV = distance(v, fine.slice(2));
        const phase = Math.abs(Math.atan2(p[0]! * fine[1] - p[1]! * fine[0], p[0]! * fine[0] + p[1]! * fine[1]));
        metrics.position = Math.max(metrics.position, errorP); metrics.velocity = Math.max(metrics.velocity, errorV); metrics.phase = Math.max(metrics.phase, phase);
        expect(errorP).toBeLessThanOrEqual(0.01); expect(errorV).toBeLessThanOrEqual(1e-5); expect(phase).toBeLessThanOrEqual(1e-8);
        if (e === 0) {
          const theta = angle + direction * Math.sqrt(o.mu / o.a ** 3) * t;
          expect(distance(p, [o.a * Math.cos(theta), o.a * Math.sin(theta)])).toBeLessThan(0.01);
        }
        const inv = invariants(o, actual.position, actual.velocity);
        const errors = [Math.abs((inv.energy + o.mu / (2 * o.a)) / (o.mu / (2 * o.a))), Math.abs((inv.momentum - direction * Math.sqrt(o.mu * o.a * (1 - e * e))) / inv.momentum)];
        metrics.invariant = Math.max(metrics.invariant, ...errors);
        for (const error of errors) expect(error).toBeLessThanOrEqual(1e-8);
      }
      // Find same-direction crossing independently from reported period, with continuous-time refinement.
      let lo = T * 0.9, hi = T * 1.1;
      for (let i = 0; i < 55; i++) {
        const mid = (lo + hi) / 2, p = propagate(o, mid).position;
        const cross = direction * (Math.cos(angle) * p.y - Math.sin(angle) * p.x);
        if (cross < 0) lo = mid; else hi = mid;
      }
      const error = Math.abs(((lo + hi) / 2 - T) / T);
      metrics.period = Math.max(metrics.period, error); expect(error).toBeLessThanOrEqual(1e-8);
      expect(Math.hypot(...Object.values(propagate(o, 0).position))).toBeCloseTo(o.a * (1 - e), 7);
      const ap = propagate(o, T / 2).position;
      expect(Math.hypot(ap.x, ap.y)).toBeCloseTo(o.a * (1 + e), 7);
      console.log('Acceptance maxima', JSON.stringify(metrics));
    }, 60000);
  }
  it('partition-independent ticks, isolation, reset and invalid input', () => {
    const a = new Session(() => createOrb(0.3)), b = new Session(() => createOrb(0.3));
    a.advance(3600); for (let i = 0; i < 3600; i++) b.advance();
    expect(a.snapshot()).toEqual(b.snapshot());
    const copy = a.snapshot(); copy.orbit!.mu = 0; copy.vessel.position.x = 0;
    expect(a.snapshot()).not.toEqual(copy);
    for (const ticks of [0, -1, NaN, Infinity, 0.5, Number.MAX_SAFE_INTEGER]) expect(() => a.advance(ticks)).toThrow();
    a.reset(); expect(a.snapshot()).toEqual(createOrb(0.3)); expect(b.snapshot().tick).toBe(3600);
    for (const override of [{ e: 1 }, { e: -0.1 }, { mu: 0 }, { a: NaN }, { radius: 1e9 }]) expect(() => propagate({ ...createOrb(0).orbit!, ...override }, 1)).toThrow();
    expect(() => propagate(createOrb(0).orbit!, -1)).toThrow();
    expect(period(createOrb(0).orbit!)).toBeCloseTo(3311.529421932034, 8);
  });
});
