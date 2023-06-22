// Import all routes
import { Router } from 'express';
import authRoutes from './authRoutes';
import projectRoutes from './projectRoutes';
import issueRoutes from './issueRoutes';
import commentRouter from './commentRoutes';
import timesheetRouter from './timesheetRoutes';
import attachmentRouter from './attachmentRoutes';

const routes = Router();
routes.use('/auth', authRoutes);
routes.use('/projects', projectRoutes);
routes.use('/issues', issueRoutes);
routes.use('/comments', commentRouter);
routes.use('/timesheets', timesheetRouter);
routes.use('/attachments', attachmentRouter);
routes.get('/', (req, res) => {
    res.json({ status: 'Success' });
});

export default routes;