import EditTodo from './EditTodo';
import { useTodos } from '../hooks';
import { Todo } from '../api';

import React, { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashCan
} from '@fortawesome/free-solid-svg-icons';
import { useDeleteTodo } from '../hooks/useTodoMutation';

const ListTodos: React.FC = () => {
    const { data: todos, isLoading, error } = useTodos();
    const deleteTodoMutation = useDeleteTodo();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!!error) {
        return <div>Error: {error.message}</div>
    }

    const deleteTodo = async (id: number) => {
        try {
            deleteTodoMutation.mutate(id);

        } catch (error) {
            console.log(error);
            
        }
    }

    return ( 
        <Fragment>
            <div className='container mt-5'>
                {todos?.map((todo: Todo) => (
                    <div className='row bg-secondary rounded-2 my-2 mx-2 p-2' key={todo.id}>
                        <div className='col-9'>{todo.description}</div>
                        <div className='btn-action col-3 text-end'>
                            <EditTodo todo={todo} />
                            <span 
                                className='mx-3' 
                                title='Delete' 
                                style={{cursor: "pointer", color: "#0dcaf0"}}
                                onClick={() => deleteTodo(todo.id)}
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
}

export default ListTodos;