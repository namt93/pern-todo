import EditTodo from './EditTodo';

import React, { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashCan
} from '@fortawesome/free-solid-svg-icons';

type Todo = {
    todo_id: number;
    description: string;
    user_id: number;
}

type TodoORM = {
    id: number;
    description: string;
    userId: number;
}

const ListTodos: React.FC = () => {
    const [todos, setTodos] = useState<TodoORM[]>([]);

    const deleteTodo = async (id: number) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/v1.1/todos/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            setTodos(todos.filter(todo => todo.id !== id));    
        } catch (error) {
            console.log(error);
            
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/v1.1/todos", {
                method: "GET",
                credentials: "include",
            })
            const jsonData = await response.json();
            console.log(jsonData);
            setTodos(jsonData);
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return ( 
        <Fragment>
            <div className='container mt-5'>
                {todos.map(todo => (
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