import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";

import { Todo, todoApi } from '../api';


type UseTodoQueryOptions = Omit<UseQueryOptions<Todo[]>, 'queryKey' | 'queryFn'>;

export const useTodos = (options?: UseTodoQueryOptions) => {
    return useQuery({
        ...options,
        queryKey: ['todos'], 
        queryFn: todoApi.getAllTodos,
    });
}