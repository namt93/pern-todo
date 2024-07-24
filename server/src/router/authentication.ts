import express from 'express';

import { 
    login, 
    register, 
    verifyUser 
} from '../controllers/authentication';
import { 
    loginORM, 
    registerORM, 
    verifyUserORM
} from '../controllers/orm/authenticationController';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/verify-user', isAuthenticated, verifyUser);

    router.post('/v1.1/auth/register', registerORM);
    router.post('/v1.1/auth/login', loginORM);
    router.get('/v1.1/auth/verify-user', isAuthenticated, verifyUserORM);
}