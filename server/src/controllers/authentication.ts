import express from 'express';

import { createUser, getUserAuthenticationByEmail, getUserByEmail, partialUpdateSessionTokenOfAuthentication } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserAuthenticationByEmail(email);

        if (!user) {
            return res.sendStatus(400);
        }
        
        const expectedHashPassword = authentication(user.salt, password);

        if (user.password !== expectedHashPassword) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.session_token = authentication(salt, user.id.toString());
        partialUpdateSessionTokenOfAuthentication(user.id, user.session_token);
        
        res.cookie('PERN-TODO-AUTH', user.session_token, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const hashedPassword = authentication(salt, password);
        const user = await createUser({
            email,
            username,
            salt,
            password: hashedPassword
        })

        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}