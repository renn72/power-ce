import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// ONE REP MAX SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const OneRepMaxSchema = z.object({
  createdAt: z.coerce.date(),
  userId: z.string(),
  lift: z.string(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'OneRepMax']"}),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
})

export type OneRepMax = z.infer<typeof OneRepMaxSchema>

/////////////////////////////////////////
// ONE REP MAX OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OneRepMaxOptionalDefaultsSchema = OneRepMaxSchema.merge(z.object({
  createdAt: z.coerce.date().optional(),
}))

export type OneRepMaxOptionalDefaults = z.infer<typeof OneRepMaxOptionalDefaultsSchema>

export default OneRepMaxSchema;
