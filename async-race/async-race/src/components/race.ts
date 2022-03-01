import { saveWinner } from '../servis/winners/winnersApi';
import { startDriving, stopDriving } from './car/carDriving';
import { DriveCar, WinnerSave } from './interface';
import { store } from './store';

async function raceAllCars(promises: Promise<DriveCar>[], ids: number[]): Promise<WinnerSave> {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const failedIndex = ids.findIndex((i) => i === id);
    const restPromise = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    return raceAllCars(restPromise, restIds);
  }
  const rez: WinnerSave = { ...store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
  return rez;
}

async function race(act: (id: number) => Promise<DriveCar>): Promise<WinnerSave> {
  const promises: Promise<DriveCar>[] = store.cars.map((e) => act(e.id));
  const ids: number[] = store.cars.map((e) => e.id);
  const winner: WinnerSave = await raceAllCars(promises, ids);
  return winner;
}

function enabledBtn() {
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const randomCarsBtn = document.getElementById('generator') as HTMLButtonElement;
  const createName = document.getElementById('create-name') as HTMLInputElement;
  createName.disabled = false;
  randomCarsBtn.disabled = false;
  const maxCar = 7;
  if (store.carsPage * maxCar < +store.carsCount) {
    nextBtn.disabled = false;
  }
  if (store.carsPage > 1) {
    prevBtn.disabled = false;
  }
  store.cars.map((e) => {
    const selectBtn = document.getElementById(`select-car-${e.id}`) as HTMLButtonElement;
    const removeBtn = document.getElementById(`remove-car-${e.id}`) as HTMLButtonElement;
    selectBtn.disabled = false;
    removeBtn.disabled = false;
  });
}

function disabledBtn() {
  const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;
  const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
  const randomCarsBtn = document.getElementById('generator') as HTMLButtonElement;
  const createName = document.getElementById('create-name') as HTMLInputElement;
  createName.disabled = true;
  nextBtn.disabled = true;
  prevBtn.disabled = true;
  randomCarsBtn.disabled = true;
  store.cars.map((e) => {
    const selectBtn = document.getElementById(`select-car-${e.id}`) as HTMLButtonElement;
    const removeBtn = document.getElementById(`remove-car-${e.id}`) as HTMLButtonElement;
    selectBtn.disabled = true;
    removeBtn.disabled = true;
  });
}

export function raceListen() {
  const raceBtn = document.getElementById('race') as HTMLButtonElement;
  const resetBtn = document.getElementById('reset') as HTMLButtonElement;
  const massage = document.getElementById('message') as HTMLElement;
  raceBtn.addEventListener('click', () => {
    (async () => {
      raceBtn.disabled = true;
      disabledBtn();
      const winner = await race(startDriving);
      if (winner.id && winner.name) {
        await saveWinner(winner.id, winner.time);
        massage.innerHTML = `${winner.name?.toString()} went first (${winner.time}s)!`;
        massage.classList.toggle('visible');
      }
      resetBtn.disabled = false;
    })().catch(() => Error('Error'));
  });
  resetBtn.addEventListener('click', () => {
    resetBtn.disabled = true;
    enabledBtn();
    store.cars.map((e) => stopDriving(e.id));
    massage.classList.toggle('visible', false);
    raceBtn.disabled = false;
  });
}