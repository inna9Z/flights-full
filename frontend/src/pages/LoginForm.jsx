
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import './LoginForm.css'
import { Link } from 'react-router-dom';
const LoginForm = () => {
    return (
        <div>
            <NavBar />
            <Login />

            <p className='loginForm'>Do not have an account?  <Link to="/register"> Register</Link></p>
        </div>
    )
}
export default LoginForm;
