

export enum TrainingTypes {
  endurance = 'endurance',
  strength = 'strength',
  recovery = 'recovery',
  nutrition = 'nutrition',
  wellBeing = 'wellBeing',
  running = 'running',
  cycling = 'cycling'
}

export const TrainingNames = {
  [TrainingTypes.endurance]: 'Morning Run',
  [TrainingTypes.strength]: 'Gym',
  [TrainingTypes.recovery]: 'Recovery',
  [TrainingTypes.nutrition]: 'Nutrition',
  [TrainingTypes.wellBeing]: 'Well Being',
}
