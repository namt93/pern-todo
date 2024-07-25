import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, todoApi } from '../api/todoApi';

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error: any) => {
        // Handle error (e.g., show a notification)
        console.error('Error adding todo:', error);
    }
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error: any) => {
        // Handle error (e.g., show a notification)
        console.error('Error updating todo:', error);
    }
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['todos']});
    },
    onError: (error: any) => {
        // Handle error (e.g., show a notification)
        console.error('Error deleting todo:', error);
    }
  });
};