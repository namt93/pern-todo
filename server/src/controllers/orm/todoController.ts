import express from 'express';
import { get } from 'lodash';

import { 
    getTodosByAuthUserORM,
    createTodoByAuthUserORM,
    updateTodoORM,
    deleteTodoORM,
} from '../../services/todoService';


export const createNewTodoUsingORM = async (req: express.Request, res: express.Response) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.sendStatus(400);
        }

        const currentUserId = get(req, 'identity.id');
        
        if (!currentUserId) {
            return res.sendStatus(403);
        }

        const newTodo = await createTodoByAuthUserORM({userId: currentUserId, description});
        
        return res.status(201).json(newTodo).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllTodosUsingORM = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get (req, 'identity.id');
        
        if (!currentUserId) {
            return res.sendStatus(403)
        }

        const todos = await getTodosByAuthUserORM(Number(currentUserId));

        return res.status(200).json(todos).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTodoUsingORM = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.sendStatus(400);
        }

        const currentUserId = get (req, 'identity.id')

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        const { description } = req.body;

        if (!description) {
            return res.sendStatus(400);
        }

        const todo = await updateTodoORM(Number(id), Number(currentUserId), {description});

        return res.status(200).json(todo).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTodoUsingORM = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.sendStatus(400);
        }

        const currentUserId = get (req, 'identity.id')

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        const isDeleted = await deleteTodoORM(Number(id), Number(currentUserId));
        
        if (!isDeleted) {
            return res.sendStatus(404);
        }

        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}