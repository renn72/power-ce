import { z } from 'zod';

/////////////////////////////////////////
// COMP LIFT SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const CompLiftSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  name: z.string(),
  Age: z.string(),
  AgeClass: z.string(),
  BirthYearClass: z.string(),
  Division: z.string(),
  Event: z.string(),
  BodyweightKg: z.string().nullish(),
  WeightClass: z.string().nullish(),
  Squat1: z.string().nullish(),
  Squat2: z.string().nullish(),
  Squat3: z.string().nullish(),
  Squat4: z.string().nullish(),
  Bench1: z.string().nullish(),
  Bench2: z.string().nullish(),
  Bench3: z.string().nullish(),
  Bench4: z.string().nullish(),
  Deadlift1: z.string().nullish(),
  Deadlift2: z.string().nullish(),
  Deadlift3: z.string().nullish(),
  Deadlift4: z.string().nullish(),
  Total: z.string().nullish(),
  Place: z.string().nullish(),
  Dots: z.string().nullish(),
  Wilks: z.string().nullish(),
  Glossbrenner: z.string().nullish(),
  GoodLift: z.string().nullish(),
  Federation: z.string().nullish(),
  Date: z.string().nullish(),
  MeetCountry: z.string().nullish(),
  MeetState: z.string().nullish(),
  MeetTown: z.string().nullish(),
  MeetName: z.string().nullish(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
  flield6: z.string().nullish(),
  flield7: z.string().nullish(),
  flield8: z.string().nullish(),
  flield9: z.string().nullish(),
  flield0: z.string().nullish(),
})

export type CompLift = z.infer<typeof CompLiftSchema>

/////////////////////////////////////////
// COMP LIFT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CompLiftOptionalDefaultsSchema = CompLiftSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type CompLiftOptionalDefaults = z.infer<typeof CompLiftOptionalDefaultsSchema>

export default CompLiftSchema;
