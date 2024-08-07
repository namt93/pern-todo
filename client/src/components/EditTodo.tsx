import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPen
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

type TodoProps = {
    todo: TodoORM,
}

const EditTodo: React.FC<TodoProps> = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    
    const updateDescription = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const body = { description };

            const response = await fetch(`http://localhost:5000/v1.1/todos/${todo.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });

            window.location.href = "/";
        } catch (error) {
            console.log(error);
            
        }
    }

    return ( 
        <Fragment>
            <span 
            data-bs-toggle="modal"
            data-bs-target={`#id${todo.id}`}
            title="Edit"
            style={{cursor: "pointer", color: "#0dcaf0"}}
            >
                <FontAwesomeIcon icon={faPen} />
            </span>

            <div className="modal" id={`id${todo.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content bg-dark">
                        <form onSubmit={updateDescription}>
                            <div className="modal-header">
                                <h4 className="modal-title">Edit Todo</h4>
                                <button 
                                    type="button" 
                                    className="close bg-dark border-0 text-white" 
                                    data-bs-dismiss="modal"
                                    onClick={() => setDescription(todo.description)}
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="modal-body">
                                <input type="text" className="form-control bg-secondary border-0 text-white" value={description} 
                                onChange={e => setDescription(e.target.value)}/>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-info text-white">Edit</button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    data-bs-dismiss="modal"
                                    onClick={() => setDescription(todo.description)}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;