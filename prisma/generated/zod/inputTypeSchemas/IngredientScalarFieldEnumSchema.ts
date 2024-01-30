import { z } from 'zod';

export const IngredientScalarFieldEnumSchema = z.enum(['id','createdAt','baseIngredientId','recipeId','size','unit','isScalable','isDeleted','flield1','flield2','flield3']);

export default IngredientScalarFieldEnumSchema;
