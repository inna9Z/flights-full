// FlightForm.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FlightForm = () => {
    const [newFlight, setNewFlight] = useState({
        flight_number: '',
        airline: '',
        departure_city: '',
        departure_airport: '',
        arrival_city: '',
        arrival_airport: '',
        departure_time: '',
        arrival_time: '',
        duration: 0,
        price: 0
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFlight((prevFlight) => ({
            ...prevFlight,
            [name]: value,
        }));
    };

    const handleAddFlight = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending data:', newFlight);
            const res = await axios.post('http://localhost:5002/', newFlight, {
                withCredentials: true
            });

            console.log('Response:', res);
            if (res.data.success) {
                setMessage('Flight added successfully');
                navigate('/')
                setNewFlight({
                    flight_number: '',
                    airline: '',
                    departure_city: '',
                    departure_airport: '',
                    arrival_city: '',
                    arrival_airport: '',
                    departure_time: '',
                    arrival_time: '',
                    duration: 0,
                    price: 0
                });
            } else {
                throw new Error(`Failed to add flight: ${res.data.error}`);
            }
        } catch (error) {
            setError(`Error adding flight: ${error.message}`);
        }
    };


    return (
        <div>
            <h2>Add New Flight</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <form>
                <label>Flight Number:</label>
                <input type="text" name="flight_number" value={newFlight.flight_number} onChange={handleChange} />
                <label>Airline:</label>
                <input type="text" name="airline" value={newFlight.airline} onChange={handleChange} />
                <label>Departure City:</label>
                <input type="text" name="departure_city" value={newFlight.departure_city} onChange={handleChange} />
                <label>Departure Airport:</label>
                <input type="text" name="departure_airport" value={newFlight.departure_airport} onChange={handleChange} />
                <label>Arrival City:</label>
                <input type="text" name="arrival_city" value={newFlight.arrival_city} onChange={handleChange} />
                <label>Arrival Airport:</label>
                <input type="text" name="arrival_airport" value={newFlight.arrival_airport} onChange={handleChange} />
                <label>Departure Time:</label>
                <input type="datetime-local" name="departure_time" value={newFlight.departure_time} onChange={handleChange} />
                <label>Arrival Time:</label>
                <input type="datetime-local" name="arrival_time" value={newFlight.arrival_time} onChange={handleChange} />
                <label>Duration (hours):</label>
                <input type="number" name="duration" value={newFlight.duration} onChange={handleChange} />
                <label>Price:</label>
                <input type="number" name="price" value={newFlight.price} onChange={handleChange} />
                <button type="submit" onClick={handleAddFlight}>Add Flight</button>

            </form>
        </div>
    );
}

export default FlightForm;


