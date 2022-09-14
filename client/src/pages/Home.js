import '../style/home.css';

const Home = () => {
    return (
        <section class="Home">
            <div class="circle">
            </div>
            <div class="inside">
                    <a href="/login" class="link">Login</a>
                    <br />
                    <br />
                    <a href="/signup" class="link">Sign Up</a>
                </div>
        </section>
    );
};

export default Home;