import axios from 'axios';
import InputTodo from '../../components/InputTodo';
import ListTodos from '../../components/ListTodos';

import React, { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .get('/v1.1/auth/verify-user', { withCredentials: true })
        .then(response => {
            if (response.statusText !== 'OK') {
                navigate('/login');
                return
            }
            return response.data;
        })
        .catch(error => {
            console.log(error);
            navigate('/login');
        })
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