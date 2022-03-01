import { drive, startEngine, stopEngine } from '../../servis/cars/raceApi';
import { DriveCar, StartEngine } from '../interface';
import { store } from '../store';
import { animation } from './animationCar';

function getCenter(element: HTMLElement) {
  const { left, width } = element.getBoundingClientRect();
  const x: number = left + width / 2;
  return x;
}

function getDistance(car: HTMLElement, flag: HTMLElement): number {
  const carPos = getCenter(car);
  const flagPos = getCenter(flag);
  return flagPos - carPos;
}

export const startDriving = async (id: number): Promise<DriveCar> => {
  const startBtn = document.getElementById(`start-engine-car-${id}`);
  const stopBtn = document.getElementById(`stop-engine-car-${id}`);
  const raceBtn = document.getElementById('race') as HTMLButtonElement;
  (<HTMLButtonElement>startBtn).disabled = true;
  startBtn?.classList.toggle('enabling', true);
  const item: StartEngine = await startEngine(id);
  const time = Math.round(item.distance / item.velocity);
  startBtn?.classList.toggle('enabling', false);
  if (!raceBtn.disabled) {
    (<HTMLButtonElement>stopBtn).disabled = false;
  }
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  const flag = document.getElementById(`flag-${id}`) as HTMLElement;
  const distanceScrin = Math.floor(getDistance(car, flag)) + 100;
  store.animation[id] = animation(car, distanceScrin, time);
  const { success } = await drive(id);
  if (!success) {
    window.cancelAnimationFrame(store.animation[id].id);
  }
  return { success, id, time };
};

export async function stopDriving(id: number) {
  const startBtn = document.getElementById(`start-engine-car-${id}`);
  const stopBtn = document.getElementById(`stop-engine-car-${id}`);
  (<HTMLButtonElement>stopBtn).disabled = true;
  stopBtn?.classList.toggle('enabling', true);
  await stopEngine(id);
  stopBtn?.classList.toggle('enabling', false);
  (<HTMLButtonElement>startBtn).disabled = false;
  const car = document.getElementById(`car-${id}`) as HTMLElement;
  car.style.transform = 'translateX(0)';
  if (store.animation[id]) {
    window.cancelAnimationFrame(store.animation[id].id);
  }
}

export function carDriving() {
  const garage = document.getElementById('garage');
  garage?.addEventListener('click', (event) => {
    if ((<HTMLElement>event.target).classList.contains('start-engine-btn')) {
      const idName: string[] = (<HTMLElement>event.target).id.split('-');
      const id: number = +idName[idName.length - 1];
      startDriving(id).catch(() => Error('Error'));
    }
    if ((<HTMLElement>event.target).classList.contains('stop-engine-btn')) {
      const idName: string[] = (<HTMLElement>event.target).id.split('-');
      const id: number = +idName[idName.length - 1];
      stopDriving(id).catch(() => Error('Error'));
    }
  });
}