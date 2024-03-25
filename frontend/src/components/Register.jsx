
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import validateEmail from '../utils/validateEmail'
import validatePassword from '../utils/validatePassword'
import matchPassword from '../utils/matchPassword'
import axios from 'axios'

import './Register.css'



const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();

        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);
        const isMatch = matchPassword(password, rePassword);
        if (emailIsValid && passwordIsValid && isMatch) {

            const data = {
                email: email,
                password: password,
                rePassword: rePassword
            };


            const postRegister = async () => {
                try {

                    const res = await axios.post('http://localhost:5002/register', data)

                    if (res.status === 200) {
                        if (res.data) {
                            setMessage('Registration success:', res.data.message)
                            navigate('/login')
                        } else {
                            throw new Error('Registration failed:', res.data.message);
                        }

                    }


                } catch (err) {
                    setError('Error while registering:', err);
                }
            }
            postRegister()

        } else {
            let errorMessage = '';

            if (!emailIsValid) {
                errorMessage = 'Email is not valid';
            } else if (!passwordIsValid) {
                errorMessage = 'Password is not valid';
            } else if (!isMatch) {
                errorMessage = 'Passwords do not match';
            }


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
    const handleRePassword = (e) => {
        const value = e.target.value;
        setRePassword(value);

    }

    return (
        <div className="register-form-container">
            <div>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <form className="register-form" onSubmit={(e) => handleSubmit(e)}>


                    <label className='label ' htmlFor="email">Email</label>
                    <input className='input' type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => handleEmail(e)} />
                    <label className='label ' htmlFor="password">Password</label>
                    <input className='input' type="password" id="password" name="password" placeholder="**********" value={password} onChange={(e) => handlePassword(e)} />
                    <label className='label ' htmlFor="confirmPassword">Confirm Password</label>
                    <input className='input' type="password" id="confirmPassword" name="confirmPassword" placeholder="**********" value={rePassword} onChange={(e) => handleRePassword(e)} />
                    <button className='button' type="submit">Register</button>
                </form>

            </div>
        </div>
    )
}

Register.propTypes = {

}

export default Register