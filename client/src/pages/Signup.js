const Signup = () => {

    const formSubmitHandler = (e) => {};

    return (
        <section class="Signup">
            <form
                id='signup-form'
                className='signup-form'
                onSubmit={formSubmitHandler}
            >
                <label htmlFor='username' className='signup-form'>Username</label>
                <input
                    type='text'
                    name='username'
                    className='form-input'
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    name='email'
                    className='form-input'
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='text'
                    name='password'
                    className='form-input'
                />
                <br />
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