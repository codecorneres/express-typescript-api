// Attachments crud

import express, { Request, Response, NextFunction} from 'express';
import { Router } from 'express';
import auth from '../utils/auth';
import {  getAllAttachments, getAttachmentById, updateAttachment, deleteAttachment, createAttachment } from '../services/attachment.service';

const attachmentRouter = express.Router();

// Creting a Attachment
attachmentRouter.post('/attachment', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const attachment = await createAttachment(req.body);
        res.json({attachment});
    } catch (error) {
            next(error);
    }
});

// Get all Attachments
attachmentRouter.get('/attachments', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const attachments = await getAllAttachments();
        res.json({attachments});
    } catch (error) {
        next(error);
    }
});

// Get attachment by id
attachmentRouter.get('/attachments/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const attachment = await getAttachmentById(Number(req.params.id));
        res.json({attachment});
    } catch (error) {
        next(error);
    }
});

// Update attachment by id
attachmentRouter.put('/attachments/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const attachment = await updateAttachment(Number(req.params.id), req.body);
        res.json({attachment});
    } catch (error) {
        next(error);
    }
});

// Delete attachment by id
attachmentRouter.delete('/attachments/:id', auth.required, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const attachment = await deleteAttachment(Number(req.params.id));
        res.json({attachment});
    } catch (error) {
        next(error);
    }
});

export default attachmentRouter;