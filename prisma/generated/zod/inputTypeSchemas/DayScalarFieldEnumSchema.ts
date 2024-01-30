import { z } from 'zod';

export const DayScalarFieldEnumSchema = z.enum(['id','createdAt','name','userId','trainerId','isTemplate','isRestDay','weekId','warmupTemplateId','energyRating','isComplete','flield1','flield2','flield3','flield4','flield5']);

export default DayScalarFieldEnumSchema;
