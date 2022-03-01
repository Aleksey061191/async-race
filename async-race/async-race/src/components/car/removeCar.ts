import { renderGarage, updatePageGarage } from '../../pages/garage/garage';
import { deletCar } from '../../servis/cars/carsApi';
import { deletWinner } from '../../servis/winners/winnersApi';

function clearUpdate() {
  const updateName = document.getElementById('update-name') as HTMLInputElement;
  const updateColor = document.getElementById('update-color') as HTMLInputElement;
  const submitBtn = document.getElementById('update-btn') as HTMLButtonElement;
  updateName.value = '';
  updateColor.value = '#ffffff';
  updateName.disabled = true;
  updateColor.disabled = true;
  submitBtn.disabled = true;
}

export function removeCar() {
  const garage = document.getElementById('garage');
  garage?.addEventListener('click', (event) => {
    (async () => {
      if ((<HTMLElement>event.target).classList.contains('remove-btn')) {
        const idName: string[] = (<HTMLElement>event.target).id.split('-');
        const id: number = +idName[idName.length - 1];
        clearUpdate();
        await deletCar(id);
        await deletWinner(id);
        await updatePageGarage();
        garage.innerHTML = renderGarage();
      }
    })().catch(() => Error('Error'));
  });
}
