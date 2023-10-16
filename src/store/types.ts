export type Set = {
  id: string,
  rep: string | number | null,
  rpe: string | number | null,
  weight: string | number | null,
  estiamtedOnerm: string | number | null,
  isComplete: boolean,
  name: string | null,
  lift: string | null,
  userId: string | null,
}

export type SS = {
  id: string,
  lift: string,
  name: string,
  onerm: string | number | null,
  onermTop: string | number | null,
  weightTop: string | number | null,
  weightBottom: string | number | null,
  isEstimatedOnerm: boolean | null,
  sets: string | number | null,
  reps: string | number | null,
  targetRpe: string | number | null,
  notes: string | null,
  set: Set[],
  estimatedOnermIndex: number | null,
  weightType: string | null,
  repUnit: string | null,
  isComplete: boolean,
  htmlLink: string | null,
  field1: string | null,
  field2: string | null,
}

export type Exercise = {
  id: string,
  lift: string,
  name: string,
  onerm: string | number | null,
  onermTop: string | number | null,
  weightTop: string | number | null,
  weightBottom: string | number | null,
  isEstimatedOnerm: boolean | null,
  sets: string | number | null,
  reps: string | number | null,
  targetRpe: string | number | null,
  notes: string | null,
  set: Set[],
  isSS: boolean,
  ss: SS[],
  estimatedOnermIndex: number | null,
  weightType: string | null,
  repUnit: string | null,
  isComplete: boolean,
  htmlLink: string | null,
  field1: string | null,
  field2: string | null,
}

export type Day = {
  id: string;
  name: string | null;
  weekId: string;
  energyRating: string | null;
  isRestDay: boolean,
  isComplete: boolean,
  exercise: Exercise[],
  warmupTemplateId: string | null,
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

export type SuperData = {
  lift: string,
  name: string,
  onerm: number | null,
  onermTop: number | null,
  weightTop: number | null,
  weightBottom: number | null,
  targetRpe: number | null,
  isEstimatedOnerm: boolean,
  sets: number | null,
  reps: number | null,
  estimatedOnermIndex: number | null,
  weightType: string | null,
  repUnit: string | null,
  isComplete: boolean,
  htmlLink: string | null,
  isSS: boolean,
}

export type ExerciseData = {
  lift: string,
  name: string,
  onerm: number | null,
  onermTop: number | null,
  weightTop: number | null,
  weightBottom: number | null,
  targetRpe: number | null,
  isEstimatedOnerm: boolean,
  sets: number | null,
  reps: number | null,
  estimatedOnermIndex: number | null,
  weightType: string | null,
  repUnit: string | null,
  isComplete: boolean,
  htmlLink: string | null,
  isSS: boolean,
  ss: SS[],
}

export type DayData = {
  isRestDay: boolean,
  exercise: ExerciseData[],
  isComplete: boolean,
  warmupTemplateId: string | null,
};

export type WeekData = {
  id: string | null,
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

export type WarmupTemplate = {
  name: string,
  warmups: Warmup[],
}

export type Warmup = {
  name: string,
  notes: string,
  link: string,
}
