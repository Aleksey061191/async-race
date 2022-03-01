import { renderGarage, updatePageGarage } from '../../pages/garage/garage';
import { createCar } from '../../servis/cars/carsApi';
import { RandomCars } from '../interface';

function activeBtn() {
  const createName = document.getElementById('create-name') as HTMLInputElement;
  const submitBtn = document.getElementById('create-btn') as HTMLButtonElement;
  if (createName.value !== '' && createName.value !== ' ' ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

export function createCarSubmit() {
  const createForm = document.getElementById('create');
  const createName = document.getElementById('create-name') as HTMLInputElement;
  createName.addEventListener('input', activeBtn);
  createForm?.addEventListener('submit', (event) => {
    (async () => {
      event.preventDefault();
      const createColor = document.getElementById('create-color') as HTMLInputElement;
      const submitBtn = document.getElementById('create-btn') as HTMLButtonElement;
      const car: RandomCars = {
        name: createName.value,
        color: createColor.value,
      };
      await createCar(car);
      await updatePageGarage();
      const garage = document.getElementById('garage');
      if (garage) {
        garage.innerHTML = renderGarage();
      }
      createName.value = '';
      createColor.value = '#ffffff';
      submitBtn.disabled = true;
    })().catch(() => Error('Error'));
  });
}