import { renderCar } from '../../components/car/renderCar';
import { GarageCars } from '../../components/interface';
import { store } from '../../components/store';
import { getCars } from '../../servis/cars/carsApi';

export function renderGarage(): string {
  return `
        <h1>Garage (${store.carsCount})</h1>
        <h2>Page #${store.carsPage}</h2>
        <ul class="garage">
            ${store.cars.map((car) => `<li>${renderCar(car)}</li>`).join('')}
        </ul>
    `;
}

export async function updatePageGarage(): Promise<void> {
  const cars: GarageCars = await getCars(store.carsPage);
  const raceBtn = document.getElementById('race') as HTMLButtonElement;
  const maxCar = 7;
  store.cars = cars.items;
  store.carsCount = cars.count;
  if (store.carsPage * maxCar < +store.carsCount && raceBtn.disabled === false) {
    (<HTMLButtonElement>document.getElementById('next')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('next')).disabled = true;
  }
  if (store.carsPage > 1 && raceBtn.disabled === false) {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = false;
  } else {
    (<HTMLButtonElement>document.getElementById('prev')).disabled = true;
  }
}
