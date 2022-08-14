import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../style/signup.css';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    const formChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const mutationRes = await addUser({
                variables: { username: formState.username, email: formState.email, password: formState.password },
            });
            const token = mutationRes.data.addUser.token;
            Auth.login(token);
        }
        catch(err) {
            console.log(err);
        }
    };

    return (
        <section class="Signup">
            <form
                id='signup-form'
                className='signup-form'
                onSubmit={formSubmitHandler}
            >
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    className='form-input'
                    onChange={formChangeHandler}
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    name='email'
                    className='form-input'
                    onChange={formChangeHandler}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='text'
                    name='password'
                    className='form-input'
                    onChange={formChangeHandler}
                />
                <br />
                {error ? (
                    <p className='err-txt'>Login failed</p>
                ) : null}
                <button
                    type='submit'
                    className='form-btn'
                    onClick={formSubmitHandler}
                >Sign Up
                </button>
            </form>
        </section>
    );
};

export default Signup;