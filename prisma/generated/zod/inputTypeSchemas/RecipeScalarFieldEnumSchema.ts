import { z } from 'zod';

export const RecipeScalarFieldEnumSchema = z.enum(['id','createdAt','name','calories','fat','carbs','protein','isGluetenFree','isVegan','isVegetarian','isScalable','size','unit','isDeleted','flield1','flield2','flield3']);

export default RecipeScalarFieldEnumSchema;
