export interface Car {
  id: number,
  name: string,
  color: string
}

export interface GarageCars {
  items: Array<Car>,
  count: string
}

export interface State {
  id: number
}

export interface Store {
  carsPage: number,
  cars: Array<Car>,
  carsCount: string,
  winnersPage: number,
  winners: Array<Winner>,
  winnersCount: string,
  animation: { [id: number]: State },
  page: string,
  sort: string,
  sortBy: string
}

export interface Winner {
  car: Car,
  id: number,
  time: number,
  wins: number
}

export interface WinnerCars {
  items: Array<Winner>,
  count: string
}

export interface RandomCars {
  name: string,
  color: string
}

export interface StartEngine {
  velocity: number,
  distance: number
}

export interface Wins {
  id: number,
  wins: number,
  time: number
}

export interface DriveCar {
  success: boolean,
  id: number,
  time: number
}

export interface WinnerSave {
  color?: string,
  id?: number,
  name?: string,
  time: number
}