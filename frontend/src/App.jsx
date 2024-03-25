import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import FlightUpdate from './components/FlightUpdate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/flightUpdate" element={<FlightUpdate />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )

}

export default App;
