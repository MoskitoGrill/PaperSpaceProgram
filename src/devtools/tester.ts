import { Session } from '../session/session';
import { timeSeconds } from '../domain/world';
import { drawWorld } from '../render/world';
import { createSys001 } from './scenario';
export function showTester(app: HTMLElement, back: () => void): void {
  let session: Session | undefined;
  app.innerHTML = `<header><p class="eyebrow">Vývojový tester · 2D</p><h1>SYS-001 — Izolovaná session a reset</h1><p>Dostupný scénář. Ověřuje skutečný krok času, izolaci a úplný reset. Bez fyziky a ukládání.</p></header>
    <section><h2>Postup a očekávané výsledky</h2><ol>
    <li>Zvol Spustit. Objeví se těleso a značka lodě, tick 0 a čas 0 s.</li>
    <li>Třikrát zvol Provést jeden krok. Tick bude 3, čas 0,05 s; polohy zůstanou stejné.</li>
    <li>Zvol Reset scénáře. Obnoví se celý výchozí stav: tick 0, čas 0 s a původní zobrazení.</li>
    <li>Proveď krok, vrať se do menu a spusť scénář znovu. Začne opět od nuly.</li></ol>
    <button id="start">Spustit</button></section><section id="running" hidden><h2>Stav scénáře</h2>
    <p id="status" role="status"></p><canvas width="640" height="360" aria-label="Referenční těleso sys001-body a nehybná značka lodě sys001-vessel"></canvas>
    <p>Rychlost času: pouze ruční krok · 60 ticků/s. Žádná gravitace ani pohyb.</p><div class="actions"><button id="step">Provést jeden krok</button><button id="reset">Reset scénáře</button></div></section>
    <button id="back">Zpět do menu</button>`;
  const render = () => {
    if (!session) return;
    const world = session.snapshot();
    app.querySelector('#status')!.textContent = `Tick: ${world.tick} · Čas: ${timeSeconds(world).toLocaleString('cs-CZ', { maximumFractionDigits: 6 })} s`;
    drawWorld(app.querySelector('canvas')!, world);
  };
  app.querySelector<HTMLButtonElement>('#start')!.onclick = () => {
    session = new Session(createSys001);
    app.querySelector<HTMLElement>('#running')!.hidden = false;
    app.querySelector<HTMLButtonElement>('#start')!.hidden = true;
    render(); app.querySelector<HTMLButtonElement>('#step')!.focus();
  };
  app.querySelector<HTMLButtonElement>('#step')!.onclick = () => { session?.advance(); render(); };
  app.querySelector<HTMLButtonElement>('#reset')!.onclick = () => { session?.reset(); render(); };
  app.querySelector<HTMLButtonElement>('#back')!.onclick = () => { session = undefined; back(); };
}
