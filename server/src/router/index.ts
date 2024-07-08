import express from 'express';

import todos from './todos';
import authentication from './authentication';

const router = express.Router();

export default(): express.Router => {
    authentication(router);
    todos(router);

    return router;
};