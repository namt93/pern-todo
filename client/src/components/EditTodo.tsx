import React, { Fragment, useState } from "react";

type Todo = {
    todo_id: number;
    description: string;
    user_id: number;
}

type TodoProps = {
    todo: Todo,
}

const EditTodo: React.FC<TodoProps> = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    
    const updateDescription = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            const body = { description };

            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
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
            <button 
                type="button" 
                className="btn btn-warning" 
                data-toggle="modal" 
                data-target={`#id${todo.todo_id}`}
            >
            Edit
            </button>

            <div className="modal" id={`id${todo.todo_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={updateDescription}>
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} 
                            onChange={e => setDescription(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className="btn btn-warning">Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EditTodo;