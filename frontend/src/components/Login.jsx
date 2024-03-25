import { useState } from 'react'
import validateEmail from '../utils/validateEmail';
import validatePassword from '../utils/validatePassword';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);
        if (emailIsValid && passwordIsValid) {
            try {
                const res = await axios.post(
                    'http://localhost:5002/login',
                    {
                        email: email,
                        password: password
                    },
                    { withCredentials: true }

                );
                if (res.data) {
                    document.cookie = `token=${res.data.token}`;
                    document.cookie = `id=${res.data.id}`;
                    setError(''); // Clear the error state
                    console.log('Reached navigate');

                    navigate('/home');

                }
            } catch (error) {
                setError('Error while logging in');
            }
        } else {
            setError('Email or Password is not valid.');
        }
    }
    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }
    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }
    return (
        <div className="login-form-container">
            <p>{error}</p>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <label className="label" htmlFor="email">Email</label>
                <input className="input" type="email" placeholder="youremail@gmail.com" id="email" name="email" value={email} onChange={(e) => handleEmail(e)} />
                <label className="label" htmlFor="password">Password</label>
                <input className="input" type="password" placeholder="**********" id="password" name="password" value={password} onChange={(e) => handlePassword(e)} />
                <button className="button">Log In</button>
            </form>

        </div>
    )
}
Login.propTypes = {
}
export default Login;

