import express from 'express';
import { get } from 'lodash';

import { createTodoByAuthUser, deleteTodoById, getTodosByAuthUser, updateTodoById } from '../db/todos';

export const createNewTodo = async (req: express.Request, res: express.Response) => {
    try {
        const { description } = req.body;

        if (!description) {
            return res.sendStatus(400);
        }

        const currentUserId = get(req, 'identity.id');
        
        if (!currentUserId) {
            return res.sendStatus(403);
        }

        const newTodo = await createTodoByAuthUser({description, user_id: currentUserId});
        
        return res.status(201).json(newTodo).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllTodos = async (req: express.Request, res: express.Response) => {
    try {
        const currentUserId = get (req, 'identity.id')

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        const todos = await getTodosByAuthUser(currentUserId);

        return res.status(200).json(todos).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateTodo = async (req: express.Request, res: express.Response) => {
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

        const todo = await updateTodoById(Number(id), Number(currentUserId), {description});

        return res.status(200).json(todo).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteTodo = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.sendStatus(400);
        }

        const currentUserId = get (req, 'identity.id')

        if (!currentUserId) {
            return res.sendStatus(403)
        }

        deleteTodoById(Number(id), Number(currentUserId));
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
