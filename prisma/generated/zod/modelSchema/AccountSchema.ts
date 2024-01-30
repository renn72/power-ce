import { z } from 'zod';

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

/**
 * @@Gen.model(hide: true)
 */
export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullish(),
  access_token: z.string().nullish(),
  expires_at: z.number().int().nullish(),
  token_type: z.string().nullish(),
  scope: z.string().nullish(),
  id_token: z.string().nullish(),
  session_state: z.string().nullish(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// ACCOUNT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AccountOptionalDefaultsSchema = AccountSchema.merge(z.object({
  id: z.string().cuid().optional(),
}))

export type AccountOptionalDefaults = z.infer<typeof AccountOptionalDefaultsSchema>

export default AccountSchema;
