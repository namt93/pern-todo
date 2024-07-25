import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import { useAddTodo } from "../hooks/useTodoMutation";

interface InputTodoProps {
    initialDescription?: string;
}

const InputTodo: React.FC<InputTodoProps> = ({ initialDescription = "" }) => {
    const [description, setDescription] = useState<string>(initialDescription);
    const addTodoMutation = useAddTodo();

    const updateDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (description.trim()) {
                const body = { description };
    
                addTodoMutation.mutate(body);
                setDescription('');
            }
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