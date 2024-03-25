import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleLogout = async (e) => {
        e.preventDefault();

        const userConfirmation = window.confirm('Are you sure you want to log out?');

        if (userConfirmation) {
            try {
                // Send a request to the server to clear cookies
                const res = await axios.post('http://localhost:5002/logout', {}, { withCredentials: true });

                if (res.data.success) {
                    setMessage('Logout successful');
                    navigate('/');
                } else {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error('Error during logout:', error.message);
                // Handle logout failure if needed
            }
        } else {
            setMessage('Logout canceled');
            navigate('/');
        }
    };

    useEffect(() => {
        // Clear the message after 10 seconds
        const timeoutId = setTimeout(() => {
            setMessage('');
        }, 1500);

        // Clean up the timeout when the component is unmounted
        return () => {
            clearTimeout(timeoutId);
        };
    }, [message]);

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
            </ul>
            <div>
                {message && <p className="success-message">{message}</p>}
            </div>
        </nav>
    );
};

export default Navbar;

