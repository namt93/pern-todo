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
            <h1 className="text-center mt-5">Pern Todo</h1>
            <form className="d-flex mt-5" onSubmit={handleSubmitForm}>
                <input
                    type="text" 
                    className="form-control" 
                    value={description}
                    onChange={updateDescription}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;