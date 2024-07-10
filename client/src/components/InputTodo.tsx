import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";

interface InputTodoProps {
    initialDescription?: string;
}

const InputTodo: React.FC<InputTodoProps> = ({ initialDescription = "" }) => {
    const [description, setDescription] = useState<string>(initialDescription);

    const updateDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const body = { description };

            fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include',
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(data => {
                console.log('Post todos====', data);
                window.location.href = "/";
            })
            .catch(error => {
                console.log(error); 
            });
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <Fragment>
            <h2 className="text-center pt-2">Pern Todo</h2>
            <form className="d-flex mt-5 mx-5" onSubmit={handleSubmitForm}>
                <input
                    type="text" 
                    className="form-control mx-1"
                    placeholder="Enter task"
                    value={description}
                    onChange={updateDescription}
                />
                <button className="btn btn-info text-white mx-1">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;