// Import all routes
import { Router } from 'express';
import authRoutes from './authRoutes';

const routes = Router();
routes.use('/auth', authRoutes);
routes.get('/', (req, res) => {
    res.json({ status: 'Success' });
});

export default routes;