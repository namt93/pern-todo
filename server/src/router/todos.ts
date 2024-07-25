import express from 'express';

import { 
    createNewTodo, 
    deleteTodo, 
    getAllTodos, 
    updateTodo
} from '../controllers/todos';
import { 
    getAllTodosUsingORM,
    createNewTodoUsingORM,
    updateTodoUsingORM,
    deleteTodoUsingORM
} from '../controllers/orm/todoController';
import { isAuthenticated, isAuthenticatedORM } from '../middlewares';

export default (router: express.Router) => {
    router.post('/todos', isAuthenticated, createNewTodo);
    router.get('/todos', isAuthenticated, getAllTodos);
    router.patch('/todos/:id', isAuthenticated, updateTodo);
    router.delete('/todos/:id', isAuthenticated, deleteTodo);

    router.post('/v1.1/todos', isAuthenticatedORM, createNewTodoUsingORM);
    router.get('/v1.1/todos', isAuthenticatedORM, getAllTodosUsingORM);
    router.patch('/v1.1/todos/:id', isAuthenticatedORM, updateTodoUsingORM);
    router.delete('/v1.1/todos/:id', isAuthenticatedORM, deleteTodoUsingORM);
};
