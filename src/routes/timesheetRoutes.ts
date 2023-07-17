// TimeSheet Crud

import express, { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import auth from '../utils/auth';
import { getAllTimesheets, getTimesheetById, updateTimesheet, deleteTimesheet, createTimesheet } from '../services/timesheet.service';

const timesheetRouter = express.Router();

// Creating a timesheet
timesheetRouter.post('/timesheet', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timesheet = await createTimesheet(req.body);
        res.json(timesheet);
    } catch (error) {
        next(error);
    }
});

// Get all timesheets
timesheetRouter.get('/timesheets', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timesheets = await getAllTimesheets();
        res.json(timesheets);
    } catch (error) {
        next(error);
    }
});

// Get timesheet by id
timesheetRouter.get('/timesheets/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timesheet = await getTimesheetById(Number(req.params.id));
        res.json(timesheet);
    } catch (error) {
        next(error);
    }
});

// Update timesheet by id
timesheetRouter.put('/timesheets/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timesheet = await updateTimesheet(Number(req.params.id), req.body);
        res.json(timesheet);
    } catch (error) {
        next(error);
    }
});

// Delete timesheet by id
timesheetRouter.delete('/timesheets/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const timesheet = await deleteTimesheet(Number(req.params.id));
        res.json(timesheet);
    } catch (error) {
        next(error);
    }
});

export default timesheetRouter;