import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});
const inventoryValidationSchema = z.object({
  quantity: z.number().int().min(0),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().int().min(0),
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
