import { z } from 'zod';
import { JsonValueSchema } from '../inputTypeSchemas/JsonValueSchema'

/////////////////////////////////////////
// LOG SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const LogSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  action: z.string(),
  location: z.string(),
  url: z.string().nullish(),
  response: JsonValueSchema.nullable(),
  request: JsonValueSchema,
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
})

export type Log = z.infer<typeof LogSchema>

/////////////////////////////////////////
// LOG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const LogOptionalDefaultsSchema = LogSchema.merge(z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
}))

export type LogOptionalDefaults = z.infer<typeof LogOptionalDefaultsSchema>

export default LogSchema;
