import EditTodo from './EditTodo';

import React, { Fragment, useEffect, useState } from "react";


type Todo = {
    todo_id: number;
    description: string;
    user_id: number;
}

const ListTodos: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const deleteTodo = async (id: number) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));    
        } catch (error) {
            console.log(error);
            
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos", {
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
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    */}
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{ todo.description }</td>
                            <td><EditTodo todo={todo} /></td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => deleteTodo(todo.todo_id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;