import axiosClient from "./axiosClient";


export type Todo = {
    id: number;
    description: string;
    userId: number;
}

export type TodoAdd = {
    description: string;
}

export type TodoUpdate = {
    id: number,
    description: string,
}

export const todoApi = {
    getAllTodos: async (): Promise<Todo[]> => {
        return await axiosClient.get('/v1.1/todos', { withCredentials: true });
    },
    addTodo: async (newTodo: TodoAdd): Promise<Todo> => {
        return await axiosClient.post('/v1.1/todos', newTodo, { withCredentials: true });
    },
    updateTodo: async (data: TodoUpdate) => {
        const { id, description } = data
        return await axiosClient.patch(`/v1.1/todos/${id}`, { description }, { withCredentials: true });
    },
    deleteTodo: async (id: number) => {
        return await axiosClient.delete(`/v1.1/todos/${id}`, { withCredentials: true })
    }
};
