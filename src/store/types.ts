export type Exercise = {
  id: string,
  lift: string,
  name: string,
  onerm: string | number | null,
  sets: string | number | null,
  reps: string | number | null,
  notes: string | null,
}

export type Day = {
  id: string;
  name: string | null;
  weekId: string;
  energyRating: string | null;
  isRestDay: boolean,
  exercise: Exercise[],
};

export type Week = {
  name: string,
  isTemplate: boolean,
  day: Day[],
}

export type Block = {
  name: string,
  week: Week[],
}

export type ExerciseData = {
  lift: string,
  name: string,
  onerm: number | null,
  sets: number | null,
  reps: number | null,
}

export type DayData = {
  isRestDay: boolean,
  exercise: ExerciseData[],
};

export type WeekData = {
  name: string,
  isTemplate: boolean,
  day: DayData[],
}

export type BlockData = {
  name: string,
  id: string,
  isProgram: boolean,
  week: WeekData[],
}
