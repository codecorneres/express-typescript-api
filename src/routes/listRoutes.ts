import express, { Request, Response, NextFunction} from 'express';
import { Router } from 'express';
import auth from '../utils/auth';
import {  getAllLists, getListById, updateListById, deleteListById, createList, deleteListByProjectId, getListByProjectId } from '../services/list.service';

const listRouter = express.Router();

// Creting a list
listRouter.post('/list', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await createList(req.body);
        res.json(list);
    } catch (error) {
            next(error);
    }
})

// Get all lists
listRouter.get('/lists', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lists = await getAllLists();
        res.json(lists);
    } catch (error) {
        next(error);
    }
})

// Get list by id
listRouter.get('/lists/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await getListById(Number(req.params.id));
        res.json(list);
    } catch (error) {
        next(error);
    }
})

// Get list by project id
listRouter.get('/lists/project/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await getListByProjectId(Number(req.params.id));
        res.json(list);
    } catch (error) {
        next(error);
    }
})

// Delete list by project id
listRouter.delete('/lists/project/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await deleteListByProjectId(Number(req.params.id));
        res.json(list);
    } catch (error) {
        next(error);
    }
})

// Update list by id
listRouter.put('/lists/:id',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await updateListById(Number(req.params.id), req.body);
        res.json(list);
    } catch (error) {
        next(error);
    }
})

// Delete list by id
listRouter.delete('/lists/:id',  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await deleteListById(Number(req.params.id));
        res.json(list);
    } catch (error) {
        next(error);
    }
})

export default listRouter;