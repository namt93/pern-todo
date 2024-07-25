import express from 'express';
import { merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';
import { getUserBySessionTokenORM } from '../services/userService';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['PERN-TODO-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticatedORM = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['PERN-TODO-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionTokenORM(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }
        

        merge(req, { identity: existingUser[0].dataValues });

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}