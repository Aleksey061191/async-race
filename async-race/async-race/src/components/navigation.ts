import { renderGarage, updatePageGarage } from '../pages/garage/garage';
import { renderWinners, updatePageWinners } from '../pages/winners/winners';
import { store } from './store';

function update(elementName: string): void {
  const element = document.getElementById(elementName);
  if (element) {
    if (elementName === 'garage') {
      element.innerHTML = renderGarage();
    } else {
      element.innerHTML = renderWinners();
    }
  }
}

export function garagePaginationListen() {
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  nextBtn?.addEventListener('click', () => {
    (async () => {
      if (store.page === 'garage') {
        store.carsPage += 1;
        await updatePageGarage();
        update('garage');
      } else {
        store.winnersPage += 1;
        await updatePageWinners();
        update('winners-view');
      }
    })().catch(() => Error('Error'));
  });
  prevBtn?.addEventListener('click', () => {
    (async () => {
      if (store.page === 'garage') {
        store.carsPage -= 1;
        await updatePageGarage();
        update('garage');
      } else {
        store.winnersPage -= 1;
        await updatePageWinners();
        update('winners-view');
      }
    })().catch(() => Error('Error'));
  });
}

export function pageListen() {
  const menu = document.querySelector('.menu');
  const garage = document.getElementById('garage-view') as HTMLElement;
  const winner = document.getElementById('winners-view') as HTMLElement;
  menu?.addEventListener('click', (event) => {
    (async () => {
      if ((<HTMLElement>event.target).classList.contains('garage-menu-btn')) {
        garage.style.display = 'block';
        winner.style.display = 'none';
        store.page = 'garage';
        await updatePageGarage();
      }
      if ((<HTMLElement>event.target).classList.contains('winners-menu-btn')) {
        garage.style.display = 'none';
        winner.style.display = 'block';
        store.page = 'winners';
        await updatePageWinners();
        winner.innerHTML = renderWinners();
      }
    })().catch(() => Error('Error'));
  });
}