import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const body = { email, password };

            fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: 'include',
            })
            .then(response => {
                if (response.ok) {
                    navigate('/');
                    return;
                }
                throw new Error('Network response was not ok');
            })
            .catch(error => {
                console.log(error); 
            });
        } catch (error) {
            console.log(error); 
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-secondary p-3 rounded w-25">
                <h2>Signin</h2>
                <form onSubmit={handleSubmitForm}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" name="email" placeholder="Enter email"
                            className="form-control rounded-0" value={email} onChange={handleInputChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" name="password" placeholder="Enter password"
                            className="form-control rounded-0" value={password} onChange={handleInputChange} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none" role="button">Register</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;