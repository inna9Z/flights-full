import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


import { useParams } from 'react-router-dom';

const FlightUpdateForm = ({ onUpdate }) => {
    const { _id } = useParams();

    const [formData, setFormData] = useState({
        flight_number: '',
        airline: '',
        departure_city: '',
        departure_airport: '',
        arrival_city: '',
        arrival_airport: '',
        departure_time: '',
        arrival_time: '',
        duration: 0,
        price: 0,
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchFlightData = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/${_id}`);
                const flightData = response.data.flight;

                setFormData({
                    flight_number: flightData.flight_number,
                    airline: flightData.airline,
                    departure_city: flightData.departure_city,
                    departure_airport: flightData.departure_airport,
                    arrival_city: flightData.arrival_city,
                    arrival_airport: flightData.arrival_airport,
                    departure_time: flightData.departure_time,
                    arrival_time: flightData.arrival_time,
                    duration: flightData.duration,
                    price: flightData.price,
                });
            } catch (err) {
                setError(err.message || 'Error fetching flight data');
            }
        };

        fetchFlightData();
    }, [_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:5002/${_id}`, formData);
            if (response.data.success) {
                setMessage('Flight updated successfully');
                onUpdate(); // Call the onUpdate callback if needed
            } else {
                setError('Error while updating flight');
            }
        } catch (err) {
            setError(err.message || 'Internal Server Error');
        }
    };

    return (
        <div>
            <h2>Update Flight</h2>
            <form>
                <label htmlFor="airline">Airline</label>
                <input
                    type="text"
                    id="flightData.flight_number"
                    name="airline"
                    value={formData.airline}
                    onChange={handleChange}
                />

                <label htmlFor="departure_city">Departure City</label>
                <input
                    type="text"
                    id="departure_city"
                    name="departure_city"
                    value={formData.departure_city}
                    onChange={handleChange}
                />

                <label htmlFor="departure_airport">Departure Airport</label>
                <input
                    type="text"
                    id="departure_airport"
                    name="departure_airport"
                    value={formData.departure_airport}
                    onChange={handleChange}
                />

                <label htmlFor="arrival_city">Arrival City</label>
                <input
                    type="text"
                    id="arrival_city"
                    name="arrival_city"
                    value={formData.arrival_city}
                    onChange={handleChange}
                />

                <label htmlFor="arrival_airport">Arrival Airport</label>
                <input
                    type="text"
                    id="arrival_airport"
                    name="arrival_airport"
                    value={formData.arrival_airport}
                    onChange={handleChange}
                />

                <label htmlFor="departure_time">Departure Time</label>
                <input
                    type="text"
                    id="departure_time"
                    name="departure_time"
                    value={formData.departure_time}
                    onChange={handleChange}
                />

                <label htmlFor="arrival_time">Arrival Time</label>
                <input
                    type="text"
                    id="arrival_time"
                    name="arrival_time"
                    value={formData.arrival_time}
                    onChange={handleChange}
                />

                <label htmlFor="duration">Duration</label>
                <input
                    type="number"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <button type="button" onClick={updateSubmit}>
                    Update Flight
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
};

FlightUpdateForm.propTypes = {
    flight: PropTypes.string,
    onUpdate: PropTypes.func.isRequired,
};

export default FlightUpdateForm;

