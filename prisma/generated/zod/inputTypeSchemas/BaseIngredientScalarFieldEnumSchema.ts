import { z } from 'zod';

export const BaseIngredientScalarFieldEnumSchema = z.enum(['id','createdAt','name','calories','fat','carbs','protein','size','unit','isScalable','isGluetenFree','isVegan','isVegetarian','isDeleted','flield1','flield2','flield3']);

export default BaseIngredientScalarFieldEnumSchema;
