import express, { Application } from 'express';
import cors from 'cors';
console.log('Backend App Loading...'); // Force Restart Trigger
import menuRoutes from './routes/menu.routes';
import authRoutes from './routes/auth.routes';
import uploadRoutes from './routes/upload.routes';
import restaurantRoutes from './routes/restaurant.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';

import orderRoutes from './routes/order.routes';

const app: Application = express();

// Middlewares Globales
app.use(cors()); // Habilitar CORS para permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON bodies

// Rutas
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/files', uploadRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/health', (_req, res) => {
    res.send('API is running OK');
});

export default app;

