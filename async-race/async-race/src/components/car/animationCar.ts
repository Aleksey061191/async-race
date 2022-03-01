import { State } from '../interface';

export function animation(car: HTMLElement, distance: number, animationTime: number) {
  let start = 0;
  const state: State = { id: 0 };
  function step(timestemp: number) {
    if (start === 0) {
      start = timestemp;
    }
    const time = timestemp - start;
    const passed = Math.round(time * (distance / animationTime));
    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);
  return state;
}