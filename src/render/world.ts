import type { WorldState } from '../domain/world';
export function drawWorld(canvas: HTMLCanvasElement, world: WorldState): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Prohlížeč nepodporuje Canvas 2D.');
  ctx.fillStyle = '#15232e'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (world.orbit) {
    const o = world.orbit, scale = 150 / (o.a * (1 + o.e));
    const projectOrbit = (x: number, y: number) => ({ x: canvas.width / 2 + x * scale, y: canvas.height / 2 - y * scale });
    ctx.strokeStyle = '#84b8c5'; ctx.beginPath();
    for (let i = 0; i <= 256; i++) {
      const E = i * 2 * Math.PI / 256;
      const p = projectOrbit(o.a * (Math.cos(E) - o.e), o.a * Math.sqrt(1 - o.e ** 2) * Math.sin(E));
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
    ctx.fillStyle = '#8aa7a1'; ctx.beginPath(); ctx.arc(canvas.width / 2, canvas.height / 2, o.radius * scale, 0, 2 * Math.PI); ctx.fill();
    const p = projectOrbit(world.vessel.position.x, world.vessel.position.y);
    ctx.fillStyle = '#f2c66d'; ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    ctx.fillStyle = '#edf1ed'; ctx.font = '14px sans-serif'; ctx.fillText('Planeta · dráha · loď (žlutá)', 12, 24);
    return;
  }
  const project = (p: { x: number; y: number }) => ({ x: 100 + p.x, y: 190 - p.y });
  const body = project(world.body.position), ship = project(world.vessel.position);
  ctx.strokeStyle = '#30414d';
  for (let x = 0; x < canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  ctx.fillStyle = '#8aa7a1'; ctx.beginPath(); ctx.arc(body.x, body.y, 60, 0, 2 * Math.PI); ctx.fill();
  ctx.fillStyle = '#f2c66d'; ctx.fillRect(ship.x - 6, ship.y - 6, 12, 12);
  ctx.font = '14px sans-serif'; ctx.fillStyle = '#edf1ed';
  ctx.fillText(world.body.id, body.x - 60, body.y + 86);
  ctx.fillText(world.vessel.id, ship.x - 45, ship.y + 30);
}
