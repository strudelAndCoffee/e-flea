import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const mutationRes = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationRes.data.login.token;
            Auth.login(token);
        }
        catch(err) {
            console.log(err);
        }
    };

    const formChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    return (
        <>
            <form onSubmit={formSubmitHandler}>
                <label htmlFor='email'>
                    Email
                </label>
                <input 
                    name='email'
                    type='email'
                    id='email'
                    onChange={formChangeHandler}
                />
                <label htmlFor='pw'>
                    Password
                </label>
                <input 
                    name='password'
                    type='password'
                    id='password'
                    onChange={formChangeHandler}
                />
                {error ? (
                    <p className='err-txt'>Login failed</p>
                ) : null}
                <button type='submit'>Login</button>
            </form>
        </>
    );
}

export default Login;