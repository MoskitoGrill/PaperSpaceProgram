import './style.css';
declare const __BUILD_ID__: string;
declare const __PAGES_TEST__: boolean;
const app = document.querySelector<HTMLElement>('#app')!;
export function showMenu(): void {
  app.innerHTML = `<header><p class="eyebrow">Vesmírný program · vývojová kostra</p><h1>PaperSpaceProgram</h1><p>Od prvního kroku k vlastnímu vesmíru.</p></header>
    <section aria-label="Hlavní menu"><h2>Zvolit režim</h2><div class="modes"><button disabled>2D</button><button disabled>2D/3D <small>Připravujeme</small></button></div>
    <p>Herní režimy zatím nejsou dostupné.</p><div id="dev-entry"></div></section>
    <footer><p>Build ${__BUILD_ID__}${__PAGES_TEST__ ? ' · Veřejná testovací sestava' : ''}</p><p>Dostupné: webová kostra a menu${import.meta.env.DEV || __PAGES_TEST__ ? ', tester SYS-001, ORB-001/002' : ''}.</p><p>Další vývoj: tah, palivo, řízení a editor raket.</p></footer>`;
  if (import.meta.env.DEV || __PAGES_TEST__) {
    const button = document.createElement('button'); button.textContent = 'Vývojový tester';
    button.onclick = async () => { const { showTester } = await import('./devtools/tester'); showTester(app, showMenu); };
    app.querySelector('#dev-entry')!.append(button);
  }
}
showMenu();
