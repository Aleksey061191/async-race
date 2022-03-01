import { renderWinners, updatePageWinners } from '../../pages/winners/winners';
import { store } from '../store';

async function sort(param: string) {
  const winnersPage = document.getElementById('winners-view') as HTMLElement;
  store.sort = store.sort === 'asc' ? 'desc' : 'asc';
  store.sortBy = param;
  await updatePageWinners();
  winnersPage.innerHTML = renderWinners();
}

export function sortListen() {
  const winnersPage = document.getElementById('winners-view') as HTMLElement;
  winnersPage.addEventListener('click', (e) => {
    if ((<HTMLElement>e.target).classList.contains('table-time')) {
      sort('time').catch(() => Error('Error'));
    }
    if ((<HTMLElement>e.target).classList.contains('table-wins')) {
      sort('wins').catch(() => Error('Error'));
    }
  });
}