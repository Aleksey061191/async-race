import { getFlag } from '../getFlag';
import { Car } from '../interface';
import { getCarImg } from './getCarImg';

export function renderCar(car: Car): string {
  return `
        <div class="general-buttons">
            <button class="button select-btn" id="select-car-${car.id}">Select</button>
            <button class="button remove-btn" id="remove-car-${car.id}">Remove</button>
            <span class="car-name">${car.name}</span>
        </div>
        <div class="road">
            <div class="launch-pad">
                <div class="control-panel">
                    <button class="icon start-engine-btn" id="start-engine-car-${car.id}">Start</button>
                    <button class="icon stop-engine-btn" id="stop-engine-car-${car.id}" disabled>Stop</button>
                </div>
                <div class="car" id="car-${car.id}">
                    ${getCarImg(car.color)}
                </div>
            </div>
            <div class="flag" id="flag-${car.id}">${getFlag()}</div>
        </div>
    `;
}