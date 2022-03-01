import { renderGarage, updatePageGarage } from '../../pages/garage/garage';
import { getCar, updateCar } from '../../servis/cars/carsApi';
import { Car, RandomCars } from '../interface';

let selectedCar: Car;

export function selectCar() {
  const garage = document.getElementById('garage');
  garage?.addEventListener('click', (event) => {
    (async () => {
      if ((<HTMLElement>event.target).classList.contains('select-btn')) {
        const idName: string[] = (<HTMLElement>event.target).id.split('-');
        const id: number = +idName[idName.length - 1];
        selectedCar = await getCar(id);
        const updateName = document.getElementById('update-name') as HTMLInputElement;
        const updateColor = document.getElementById('update-color') as HTMLInputElement;
        const submitBtn = document.getElementById('update-btn') as HTMLButtonElement;
        updateName.disabled = false;
        updateColor.disabled = false;
        submitBtn.disabled = false;
        updateName.value = selectedCar.name;
        updateColor.value = selectedCar.color;
      }
    })().catch(() => Error('Error'));
  });
}

export function updateCarSubmit() {
  const updateForm = document.getElementById('update');
  updateForm?.addEventListener('submit', (event) => {
    (async () => {
      event.preventDefault();
      const updateName = document.getElementById('update-name') as HTMLInputElement;
      const updateColor = document.getElementById('update-color') as HTMLInputElement;
      const submitBtn = document.getElementById('update-btn') as HTMLButtonElement;
      const car: RandomCars = {
        name: updateName.value,
        color: updateColor.value,
      };
      await updateCar(selectedCar.id, car);
      await updatePageGarage();
      const garage = document.getElementById('garage');
      if (garage) {
        garage.innerHTML = renderGarage();
      }
      updateName.value = '';
      updateColor.value = '#ffffff';
      updateName.disabled = true;
      updateColor.disabled = true;
      submitBtn.disabled = true;
      selectedCar.id = 0;
    })().catch(() => Error('Error'));
  });
}