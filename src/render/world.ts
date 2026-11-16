import type { WorldState } from '../domain/world';
export function drawWorld(canvas: HTMLCanvasElement, world: WorldState): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Prohlížeč nepodporuje Canvas 2D.');
  ctx.fillStyle = '#15232e'; ctx.fillRect(0, 0, canvas.width, canvas.height);
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
