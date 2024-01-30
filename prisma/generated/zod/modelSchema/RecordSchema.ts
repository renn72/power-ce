import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// RECORD SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const RecordSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  date: z.coerce.date(),
  lift: z.string(),
  wc: z.string(),
  gender: z.string(),
  name: z.string(),
  weight: z.instanceof(Prisma.Decimal, { message: "Field 'weight' must be a Decimal. Location: ['Models', 'Record']"}),
  userId: z.string(),
  isDeleted: z.boolean(),
})

export type Record = z.infer<typeof RecordSchema>

/////////////////////////////////////////
// RECORD OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RecordOptionalDefaultsSchema = RecordSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  date: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type RecordOptionalDefaults = z.infer<typeof RecordOptionalDefaultsSchema>

export default RecordSchema;
