import { getCarImg } from '../../components/car/getCarImg';
import { WinnerCars } from '../../components/interface';
import { store } from '../../components/store';
import { getWinners } from '../../servis/winners/winnersApi';

export function renderWinners(): string {
  return `
    <h1>Winners (${store.winnersCount})</h1>
    <h2>Page #${store.winnersPage}</h2>
    <table class="table">
        <thead>
            <th>№</th>
            <th>Car</th>
            <th>Name</th>
            <th class="table-btn table-wins ${store.sortBy === 'wins' ? store.sort : ''}">Wins</th>
            <th class="table-btn table-time ${store.sortBy === 'time' ? store.sort : ''}">Time</th>
        </thead>
        <tbody>
            ${store.winners.map((winner, index) => {
    return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${getCarImg(winner.car.color)}</td>
                        <td class="winner-name">${winner.car.name}</td>
                        <td>${winner.wins}</td>
                        <td>${winner.time}</td>
                    </tr>
                `;
  }).join('')}
        </tbody>
    </table>
    `;
}

export async function updatePageWinners() {
  const winner: WinnerCars = await getWinners(store.winnersPage, store.sortBy, store.sort);
  const maxWinners = 10;
  store.winners = winner.items;
  store.winnersCount = winner.count;
  if (store.winnersPage * maxWinners < +store.winnersCount) {
    (<HTMLButtonElement>document.getElementById('next')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('next')).disabled = true;
  }
  if (store.winnersPage > 1) {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = true;
  }
}