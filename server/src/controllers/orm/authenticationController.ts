import express from 'express';
import { get } from 'lodash';

import { authentication, random } from '../../helpers';
import { 
    createUserORM,
    getUserByIdORM,
    getUserByEmailORM ,
    getUserAuthenticationByEmailORM,
} from '../../services/userService';
import { 
    createAuthenticationORM,
    partialUpdateSessionTokenOfAuthenticationORM
} from '../../services/authenticationService';


export const loginORM = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserAuthenticationByEmailORM(email);

        if (!user) {
            return res.sendStatus(400);
        }
        
        const expectedHashPassword = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHashPassword) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user.id.toString());
        partialUpdateSessionTokenOfAuthenticationORM(user.id, user.authentication.sessionToken);
        
        res.cookie('PERN-TODO-AUTH', user.authentication.sessionToken);

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const registerORM = async (req: express.Request, res: express.Response) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmailORM(email);
        
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = random();
        const hashedPassword = authentication(salt, password);
        const user = await createUserORM({
            email,
            username,
        })
        await createAuthenticationORM({
            userId: user.id,
            password: hashedPassword,
            salt
        })

        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const verifyUserORM = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get(req, 'identity.id');
        
        if (!currentUserId) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserByIdORM(currentUserId);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        return res.status(200).json(existingUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}