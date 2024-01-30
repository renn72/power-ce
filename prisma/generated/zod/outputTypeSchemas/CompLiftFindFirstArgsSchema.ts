import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CompLiftWhereInputSchema } from '../inputTypeSchemas/CompLiftWhereInputSchema'
import { CompLiftOrderByWithRelationInputSchema } from '../inputTypeSchemas/CompLiftOrderByWithRelationInputSchema'
import { CompLiftWhereUniqueInputSchema } from '../inputTypeSchemas/CompLiftWhereUniqueInputSchema'
import { CompLiftScalarFieldEnumSchema } from '../inputTypeSchemas/CompLiftScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CompLiftSelectSchema: z.ZodType<Prisma.CompLiftSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  Age: z.boolean().optional(),
  AgeClass: z.boolean().optional(),
  BirthYearClass: z.boolean().optional(),
  Division: z.boolean().optional(),
  Event: z.boolean().optional(),
  BodyweightKg: z.boolean().optional(),
  WeightClass: z.boolean().optional(),
  Squat1: z.boolean().optional(),
  Squat2: z.boolean().optional(),
  Squat3: z.boolean().optional(),
  Squat4: z.boolean().optional(),
  Bench1: z.boolean().optional(),
  Bench2: z.boolean().optional(),
  Bench3: z.boolean().optional(),
  Bench4: z.boolean().optional(),
  Deadlift1: z.boolean().optional(),
  Deadlift2: z.boolean().optional(),
  Deadlift3: z.boolean().optional(),
  Deadlift4: z.boolean().optional(),
  Total: z.boolean().optional(),
  Place: z.boolean().optional(),
  Dots: z.boolean().optional(),
  Wilks: z.boolean().optional(),
  Glossbrenner: z.boolean().optional(),
  GoodLift: z.boolean().optional(),
  Federation: z.boolean().optional(),
  Date: z.boolean().optional(),
  MeetCountry: z.boolean().optional(),
  MeetState: z.boolean().optional(),
  MeetTown: z.boolean().optional(),
  MeetName: z.boolean().optional(),
  flield1: z.boolean().optional(),
  flield2: z.boolean().optional(),
  flield3: z.boolean().optional(),
  flield4: z.boolean().optional(),
  flield5: z.boolean().optional(),
  flield6: z.boolean().optional(),
  flield7: z.boolean().optional(),
  flield8: z.boolean().optional(),
  flield9: z.boolean().optional(),
  flield0: z.boolean().optional(),
}).strict()

export const CompLiftFindFirstArgsSchema: z.ZodType<Prisma.CompLiftFindFirstArgs> = z.object({
  select: CompLiftSelectSchema.optional(),
  where: CompLiftWhereInputSchema.optional(),
  orderBy: z.union([ CompLiftOrderByWithRelationInputSchema.array(),CompLiftOrderByWithRelationInputSchema ]).optional(),
  cursor: CompLiftWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompLiftScalarFieldEnumSchema,CompLiftScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default CompLiftFindFirstArgsSchema;
