import express from 'express';

import { createNewTodo, deleteTodo, getAllTodos, updateTodo } from '../controllers/todos';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
    router.post('/todos', isAuthenticated, createNewTodo);
    router.get('/todos', isAuthenticated, getAllTodos);
    router.patch('/todos/:id', isAuthenticated, updateTodo);
    router.delete('/todos/:id', isAuthenticated, deleteTodo);
};
