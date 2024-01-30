import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const UserSchema = z.object({
  id: z.string().cuid(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.coerce.date().nullish(),
  image: z.string().nullish(),
  name: z.string().nullish(),
  isDiet: z.boolean(),
  isDietTrainer: z.boolean(),
  isPower: z.boolean(),
  isTrainer: z.boolean(),
  isClient: z.boolean(),
  isRecordEditor: z.boolean(),
  isAdmin: z.boolean(),
  isSuper: z.boolean(),
  isCreator: z.boolean(),
  isRoot: z.boolean(),
  isHiit: z.boolean(),
  isHiitTrainer: z.boolean(),
  isPowerTrainer: z.boolean(),
  flield1: z.string().nullish(),
  flield2: z.string().nullish(),
  flield3: z.string().nullish(),
  flield4: z.string().nullish(),
  flield5: z.string().nullish(),
  flield6: z.string().nullish(),
  flield7: z.string().nullish(),
  flield8: z.string().nullish(),
  flield9: z.string().nullish(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.string().cuid().optional(),
  isDiet: z.boolean().optional(),
  isDietTrainer: z.boolean().optional(),
  isPower: z.boolean().optional(),
  isTrainer: z.boolean().optional(),
  isClient: z.boolean().optional(),
  isRecordEditor: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  isSuper: z.boolean().optional(),
  isCreator: z.boolean().optional(),
  isRoot: z.boolean().optional(),
  isHiit: z.boolean().optional(),
  isHiitTrainer: z.boolean().optional(),
  isPowerTrainer: z.boolean().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

export default UserSchema;
