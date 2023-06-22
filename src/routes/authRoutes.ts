//deactivate
//login
//signup
//logout

import express, { Request, Response, NextFunction } from "express";
import session  from 'express-session';
// import bcrypt from "bcryptjs";
// import prisma from "../utils/prisma";
// import generateToken  from "../utils/generateToken.utils";
import { createUser, login } from "../services/auth.service";
import auth from "../utils/auth";

const authRouter = express.Router();

authRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
     try {
        const user = await createUser(req.body);
        res.json({ user });
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await login(req.body);
        res.json({ user });
    } catch (error) {
        next(error);
    }
});

authRouter.post("/logout", auth.required, async (req: Request, res: Response, next: NextFunction) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.send('Logout successful')
            }
        });
    } else {
        res.end()
    }
});

export default authRouter;