import { renderGarage } from './garage';
import { getForms } from './getCreateUpdateForms';

export function garageView(): string {
  return `
      <div>
        ${getForms()}
      </div>
      <div class="race-controls">
        <button class="button race-btn primary" id="race">Race</button>
        <button class="button reset-btn primary" id="reset" disabled>Reset</button>
        <button class="button generator-btn" id="generator">Ganerate cars</button>
      </div>
      <div id="garage">
        ${renderGarage()}
      </div>
      <div>
        <p class="message" id="message"></p>
      </div>
    `;
}