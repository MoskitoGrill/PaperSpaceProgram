import type { Orbit } from '../domain/world';
export const period = (o: Orbit): number => 2 * Math.PI * Math.sqrt(o.a ** 3 / o.mu);
/** Elliptic two-body propagation from periapsis at epoch zero; SI, body-relative. */
export function propagate(o: Orbit, seconds: number) {
  if (![o.mu, o.radius, o.a, o.e, o.angle, seconds].every(Number.isFinite) || o.mu <= 0 || o.radius <= 0 || o.a <= 0 || o.e < 0 || o.e >= 1 || o.a * (1 - o.e) <= o.radius || ![1, -1].includes(o.direction) || seconds < 0) throw new Error('Neplatná eliptická dráha nebo čas.');
  const n = Math.sqrt(o.mu / o.a ** 3);
  const m = (seconds % period(o)) * n;
  // Bounded Newton iteration with bisection fallback, including near-circular orbits.
  let lo = 0, hi = 2 * Math.PI, E = m;
  for (let i = 0; i < 80; i++) {
    const f = E - o.e * Math.sin(E) - m;
    if (Math.abs(f) <= 2e-15) break;
    if (f > 0) hi = E; else lo = E;
    const next = E - f / (1 - o.e * Math.cos(E));
    E = next > lo && next < hi ? next : (lo + hi) / 2;
    if (i === 79) throw new Error('Keplerův výpočet nekonverguje.');
  }
  const q = Math.sqrt(1 - o.e ** 2), rate = n / (1 - o.e * Math.cos(E));
  const rotate = (x: number, y: number) => ({ x: x * Math.cos(o.angle) - y * Math.sin(o.angle), y: x * Math.sin(o.angle) + y * Math.cos(o.angle) });
  return { position: rotate(o.a * (Math.cos(E) - o.e), o.direction * o.a * q * Math.sin(E)), velocity: rotate(-o.a * Math.sin(E) * rate, o.direction * o.a * q * Math.cos(E) * rate) };
}
export function invariants(o: Orbit, p: { x: number; y: number }, v: { x: number; y: number }) {
  return { energy: (v.x ** 2 + v.y ** 2) / 2 - o.mu / Math.hypot(p.x, p.y), momentum: p.x * v.y - p.y * v.x };
}
