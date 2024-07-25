import { User } from '../models/user';
import { Todo } from '../models/todo';

export const getTodosByAuthUserORM = async (userId: number) => {
    return await Todo.findAll({
        include: {
            model: User,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'email']
            }
        },
        where: { userId },
        attributes: {
            exclude: ['userId']
        }
    });
};

export const createTodoByAuthUserORM = async ( data: { userId: number, description: string }) => {
    return await Todo.create(data);
};

export const updateTodoORM = async (id: number,  userId: number, data: { description: string }) => {
    const todo = await Todo.findOne({
        where: {
            id,
            userId
        }
    });
    if (todo) {
        return await todo.update(data);
    }
    return null;
};

export const deleteTodoORM = async (id: number,  userId: number) => {
    const todo = await Todo.findOne({
        where: {
            id,
            userId
        }
    });
    if (todo) {
        await todo.destroy();
        return true;
    }
    return false;
};