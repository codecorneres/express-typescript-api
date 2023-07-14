// Projects Crud

import express, { Request, Response, NextFunction} from 'express';
import { Router } from 'express';
import auth from '../utils/auth';
import {  getAllProjects, getProjectById, updateProjectById, deleteProjectById, createProject } from '../services/project.service';

const projectRouter = express.Router();

// Creting a project
projectRouter.post('/project', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await createProject(req.body);
    res.json({project});
  } catch (error) {
        next(error);
  }
});

// Get all projects
projectRouter.get('/projects', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await getAllProjects();
        res.json({projects});
    } catch (error) {
        next(error);
    }
});

// Get project by id
projectRouter.get('/projects/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await getProjectById(Number(req.params.id));
        res.json({project});
    } catch (error) {
        next(error);
    }
});

// Update project by id
projectRouter.put('/projects/:id',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await updateProjectById(Number(req.params.id), req.body);
        res.json({project});
    } catch (error) {
        next(error);
    }
});

// Delete project by id
projectRouter.delete('/projects/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const project = await deleteProjectById(Number(req.params.id));
        res.json({project});
    } catch (error) {
        next(error);
    }
});

export default projectRouter;