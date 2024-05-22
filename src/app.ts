import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/products/product.routes';
import { orderRouters } from './modules/orders/order.routes';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRouters);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
