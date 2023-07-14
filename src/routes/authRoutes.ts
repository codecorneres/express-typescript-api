import express, { Request, Response, NextFunction } from "express";
import session  from 'express-session';
import { createUser, login, getAllUsers } from "../services/auth.service";
import auth from "../utils/auth";

const authRouter = express.Router();

// Load user profile
// authRouter.get("/me", auth.required, async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await loadUserProfile(req.body);
//         res.json({ user });
//     } catch (error) {
//         next(error);
//     }
// })

// Get all users
authRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers();
        res.json({ users });
    } catch (error) {
        next(error);
    }
})

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