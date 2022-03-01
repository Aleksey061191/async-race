import { getCars } from '../servis/cars/carsApi';
import { getWinners } from '../servis/winners/winnersApi';
import { GarageCars, Store, WinnerCars } from './interface';

const getGarageCars: GarageCars = await getCars(1);
const getWinnerCars: WinnerCars = await getWinners(1);

export const store: Store = {
  carsPage: 1,
  cars: getGarageCars.items,
  carsCount: getGarageCars.count,
  winnersPage: 1,
  winners: getWinnerCars.items,
  winnersCount: getWinnerCars.count,
  animation: {},
  page: 'garage',
  sort: '',
  sortBy: '',
};