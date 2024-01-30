import { z } from 'zod'

export const WeekScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'name',
  'isTemplate',
  'isDeleted',
  'userId',
  'trainerId',
  'blockId',
  'flield1',
  'flield2',
  'flield3',
  'flield4',
  'flield5',
])
