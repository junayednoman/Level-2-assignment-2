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

// show error if route not found
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
  // next();
});

// middleware for common errors
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

export default app;
