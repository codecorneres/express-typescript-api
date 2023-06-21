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

const authRouter = express.Router();

authRouter.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
     try {
        const user = await createUser(req.body.user);
        res.json({ user });
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await login(req.body.user);
        res.json({ user });
    } catch (error) {
        next(error);
    }
    // const {email, password} = req.body;
    // // validation
    // const encryptedPassword = await bcrypt.hash(password, 10);
    // const user = await prisma.user.findUnique({
    //     where: {
    //         email: email
    //     }, include: {
    //         role: true
    //     }
    // });
    // if (!user) {
    //     res.status(401).json({error: "Invalid email or password"});
    // }
    // if (encryptedPassword !== user?.password) {
    //     res.status(401).json({error: "Invalid email or password"});
    // }
    // // generate token
    // const token = user ? generateToken(user) : null;
    // // send token
    // res.json({token});
});

authRouter.post("/logout", async (req: Request, res: Response, next: NextFunction) => {
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