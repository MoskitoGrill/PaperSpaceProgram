import { Session } from '../session/session';
import { timeSeconds } from '../domain/world';
import { drawWorld } from '../render/world';
import { createSys001, createOrb } from './scenario';
import { invariants, period } from '../sim/orbit';
export function showTester(app: HTMLElement, back: () => void): void {
  showSys(app, back);
  const nav = document.createElement('nav'); nav.className = 'actions'; nav.setAttribute('aria-label', 'Scénáře');
  for (const [id, e] of [['SYS-001', -1], ['ORB-001', 0], ['ORB-002', 0.3]] as const) {
    const button = document.createElement('button'); button.textContent = id;
    button.onclick = () => { if (e < 0) showTester(app, back); else showOrbit(app, back, id, e); };
    nav.append(button);
  }
  app.prepend(nav);
}
function showSys(app: HTMLElement, back: () => void): void {
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
function showOrbit(app: HTMLElement, back: () => void, id: string, e: number): void {
  let session: Session | undefined;
  const o = createOrb(e).orbit!;
  app.innerHTML = `<header><p class="eyebrow">Vývojový tester · 2D</p><h1>${id} — ${e ? 'Eliptická' : 'Kruhová'} dráha</h1><p>Jedna planeta a loď bez tahu. Ruční čas, analytická gravitace, provizorní zobrazení.</p></header>
  <section><h2>Postup a očekávané výsledky</h2><ol>
  <li>Spusť scénář. Čas 0 s, vzdálenost ${e ? '700' : '1 000'} km; loď vpravo, pohyb proti směru hodin.</li>
  <li>Zvol +60 s. Loď se posune nahoru. ${e ? 'Vzdálenost roste a rychlost klesá.' : 'Vzdálenost zůstane 1 000 km a rychlost 1 897,367 m/s.'}</li>
  <li>Resetuj, zadej 1655,766 s a posuň čas. Loď bude vlevo ${e ? 'v apoapsidě přibližně 1 300 km' : 've vzdálenosti 1 000 km'}.</li>
  <li>Resetuj, zadej 3311,529 s a posuň čas. Loď se téměř vrátí na začátek; čas se zaokrouhlí na tick 1/60 s. Reset a nové spuštění začnou od nuly.</li></ol>
  <p>μ = 3,6 × 10¹² m³/s²; poloměr 600 km; a = 1 000 km; e = ${e}. Perioda ${period(o).toFixed(9)} s. Časy v návodu jsou přibližné.</p>
  <button id="start">Spustit</button></section>
  <section id="running" hidden><h2>Stav scénáře</h2><p id="status" role="status"></p><canvas width="640" height="360" aria-label="Planeta, oběžná dráha a poloha lodě"></canvas><p id="telemetry"></p><p id="diagnostics"></p>
  <div class="actions"><button id="step">Provést jeden krok</button><button id="minute">+60 s</button><label>Posun v sekundách <input id="seconds" type="number" min="0.016666667" step="any" value="60"></label><button id="advance">Posunout čas</button><button id="reset">Reset scénáře</button></div><p id="error" role="alert"></p></section>
  <div class="actions"><button id="catalog">Seznam scénářů</button><button id="back">Zpět do menu</button></div>`;
  const render = () => {
    if (!session) return;
    const w = session.snapshot(), p = w.vessel.position, v = w.velocity!, inv = invariants(o, p, v);
    const energyError = Math.abs((inv.energy + o.mu / (2 * o.a)) / (o.mu / (2 * o.a)));
    const h = Math.sqrt(o.mu * o.a * (1 - o.e ** 2));
    app.querySelector('#status')!.textContent = `Tick: ${w.tick} · Čas: ${timeSeconds(w).toLocaleString('cs-CZ', { maximumFractionDigits: 6 })} s`;
    app.querySelector('#telemetry')!.textContent = `Vzdálenost: ${(Math.hypot(p.x, p.y) / 1000).toFixed(6)} km · Rychlost: ${Math.hypot(v.x, v.y).toFixed(6)} m/s · Poloha: (${p.x.toFixed(3)}, ${p.y.toFixed(3)}) m · Rychlost XY: (${v.x.toFixed(6)}, ${v.y.toFixed(6)}) m/s`;
    app.querySelector('#diagnostics')!.textContent = `Relativní chyba energie: ${energyError.toExponential(3)} · momentu hybnosti: ${Math.abs((inv.momentum - h) / h).toExponential(3)}. Nezávislé ověření fáze a periody probíhá v automatických testech.`;
    drawWorld(app.querySelector('canvas')!, w);
  };
  const advance = (ticks: number) => { try { session?.advance(ticks); app.querySelector('#error')!.textContent = ''; render(); } catch (error) { app.querySelector('#error')!.textContent = (error as Error).message; } };
  app.querySelector<HTMLButtonElement>('#start')!.onclick = () => { session = new Session(() => createOrb(e)); app.querySelector<HTMLElement>('#running')!.hidden = false; app.querySelector<HTMLButtonElement>('#start')!.hidden = true; render(); };
  app.querySelector<HTMLButtonElement>('#step')!.onclick = () => advance(1);
  app.querySelector<HTMLButtonElement>('#minute')!.onclick = () => advance(3600);
  app.querySelector<HTMLButtonElement>('#advance')!.onclick = () => advance(Math.round(Number(app.querySelector<HTMLInputElement>('#seconds')!.value) * 60));
  app.querySelector<HTMLButtonElement>('#reset')!.onclick = () => { session?.reset(); app.querySelector<HTMLInputElement>('#seconds')!.value = '60'; app.querySelector('#error')!.textContent = ''; render(); };
  app.querySelector<HTMLButtonElement>('#catalog')!.onclick = () => { session = undefined; showTester(app, back); };
  app.querySelector<HTMLButtonElement>('#back')!.onclick = () => { session = undefined; back(); };
}
