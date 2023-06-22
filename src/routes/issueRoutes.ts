// Issues Crud

import express, { Request, Response, NextFunction} from 'express';
import { Router } from 'express';
import auth from '../utils/auth';
import {  getAllIssues, getIssueById, updateIssue, deleteIssue, createIssue } from '../services/issue.service';

const issueRouter = express.Router();

// Creting a Issue
issueRouter.post('/issue', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issue = await createIssue(req.body);
        res.json(issue);
    } catch (error) {
            next(error);
    }
});


// Get all Issues
issueRouter.get('/issues', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issues = await getAllIssues();
        res.json(issues);
    } catch (error) {
        next(error);
    }
}); 


// Get issue by id
issueRouter.get('/issues/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issue = await getIssueById(Number(req.params.id));
        res.json(issue);
    } catch (error) {
        next(error);
    }
});

// Update issue by id
issueRouter.put('/issues/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issue = await updateIssue(Number(req.params.id), req.body);
        res.json(issue);
    } catch (error) {
        next(error);
    }
});

// Delete project by id
issueRouter.delete('/issues/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const issue = await deleteIssue(Number(req.params.id));
        res.json(issue);
    } catch (error) {
        next(error);
    }
});

export default issueRouter;