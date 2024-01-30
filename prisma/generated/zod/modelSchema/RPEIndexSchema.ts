import { z } from 'zod';
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// RPE INDEX SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const RPEIndexSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  name: z.string(),
  value: z.instanceof(Prisma.Decimal, { message: "Field 'value' must be a Decimal. Location: ['Models', 'RPEIndex']"}),
  isDeleted: z.boolean(),
})

export type RPEIndex = z.infer<typeof RPEIndexSchema>

/////////////////////////////////////////
// RPE INDEX OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const RPEIndexOptionalDefaultsSchema = RPEIndexSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  isDeleted: z.boolean().optional(),
}))

export type RPEIndexOptionalDefaults = z.infer<typeof RPEIndexOptionalDefaultsSchema>

export default RPEIndexSchema;
