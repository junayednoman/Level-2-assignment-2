import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string().nonempty(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
});

export default orderValidationSchema;
