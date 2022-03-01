import { garageView } from './garage/garageView';
import { renderWinners } from './winners/winners';

export function render() {
  const body = `
    <div class="menu">
      <button class="button garage-menu-btn primary" id="garage-menu">To garage</button>
      <button class="button winners-menu-btn primary" id="winners-menu">To winners</button>
    </div>
    <div id="garage-view">
      ${garageView()}
    </div>
    <div id="winners-view">
      ${renderWinners()}
    </div>
    <div class="pagination">
      <button class="button primary prev-btn" id="prev" disabled>Prev</button>
      <button class="button primary next-btn" id="next" disabled>Next</button>
    </div>
    `;
  const page: HTMLElement = document.createElement('div');
  page.innerHTML = body;
  document.body.append(page);
}