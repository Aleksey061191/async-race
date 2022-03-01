import { renderGarage, updatePageGarage } from '../../pages/garage/garage';
import { createCar } from '../../servis/cars/carsApi';
import { RandomCars } from '../interface';

const marka: string[] = ['Acura', 'Aston Martin', 'Bentley', 'BMW', 'Bugatti', 'Buick', 'Cadillac', 'Chery', 'Audi', 'Ford', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Tesla'];
const model: string[] = ['Legend', 'TLX', 'Integra', 'Virage', 'Vulcan', 'Valkyrie', 'Continental', 'Mulsanne', 'Azure', 'F01', 'M6', 'M8', 'Chiron', 'Divo', 'Centodieci', 'Limited', 'Cascada', 'Eldorado', 'Escalade', 'Tiggo 7', 'S8', 'A5', 'TT', 'Mustang', 'Focus', '6', 'Genesis', 'Accord', 'Model X'];

function getRandomCar(): string {
  return `${marka[Math.floor(Math.random() * marka.length)]} ${model[Math.floor(Math.random() * model.length)]}`;
}

function getRAndomColor(): string {
  const index = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += index[Math.floor(Math.random() * index.length)];
  }
  return color;
}

export function generateRandomCar(count = 100): RandomCars[] {
  const newArr = new Array(count) as RandomCars[];
  newArr.fill({ name: '', color: '' });
  return newArr.map(() => ({ name: getRandomCar(), color: getRAndomColor() }));
}

export function generateRandomCarListen(): void {
  const generateBtn = document.querySelector('.generator-btn');
  generateBtn?.addEventListener('click', () => {
    (async () => {
      (<HTMLButtonElement>generateBtn).disabled = true;
      const cars = generateRandomCar();
      await Promise.all(cars.map(async (e) => createCar(e)));
      await updatePageGarage();
      const garage = document.getElementById('garage');
      if (garage) {
        garage.innerHTML = renderGarage();
      }
      (<HTMLButtonElement>generateBtn).disabled = false;
    })().catch(() => Error('Error'));
        
  });
}