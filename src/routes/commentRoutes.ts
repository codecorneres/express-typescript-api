// Comments Crud

import express, { Request, Response, NextFunction} from 'express';
import { Router } from 'express';
import auth from '../utils/auth';
import {  getAllComments, getCommentById, updateComment, deleteComment, createComment } from "../services/comment.service"

const commentRouter = express.Router();

// Creting a Comment
commentRouter.post('/comment', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await createComment(req.body);
        res.json({comment});
    } catch (error) {
            next(error);
    }
});

// Get all Comments
commentRouter.get('/comments', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await getAllComments();
        res.json({comments});
    } catch (error) {
        next(error);
    }
});

// Get comment by id
commentRouter.get('/comments/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await getCommentById(Number(req.params.id));
        res.json({comment});
    } catch (error) {
        next(error);
    }
})

// Update comment by id
commentRouter.put('/comments/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await updateComment(Number(req.params.id), req.body);
        res.json({comment});
    } catch (error) {
        next(error);
    }
})

// Delete comment by id
commentRouter.delete('/comments/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comment = await deleteComment(Number(req.params.id));
        res.json({comment});
    } catch (error) {
        next(error);
    }
})

export default commentRouter;