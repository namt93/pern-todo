import InputTodo from '../../components/InputTodo';
import ListTodos from '../../components/ListTodos';

import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/v1.1/auth/verify-user', {
            method: "GET",
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                navigate('/login');
                return;
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
            navigate('/login');
        });
    }, []);

    return (
        <Fragment>
            <div className="bg-dark text-white h-100 w-50 pt-5 m-auto">
                <InputTodo />
                <ListTodos />
            </div>
        </Fragment>
    );
}

export default Home;