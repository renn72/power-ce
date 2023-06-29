export type Exercise = {
  lift: string,
  name: string,
  onerm: string,
  sets: string,
  reps: string,
}

export type Day = {
  isRestDay: boolean,
  exercise: Exercise[],
};

export type Week = {
  name: string,
  day: Day[],
}

export type Block = {
  name: string,
  week: Week[],
}
