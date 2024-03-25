// Flight.jsx
import PropTypes from 'prop-types';
import './Flight.css';
import axios from 'axios';

const Flight = ({ flight, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:5002/flights/${flight._id}`);
            if (response.data.success) {
                onDelete(flight._id);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error('Error deleting flight:', error.message);
        }
    };

    return (
        <div className="flight-container">
            <div className="flight-header">
                <h2>{flight.flight_number}</h2>
                <p>Price: ${flight.price.toFixed(2)}</p>
            </div>
            <div className="flight-details">
                <div className="departure-arrival">
                    <p>Departure: {flight.departure_city} ({flight.departure_airport})</p>
                    <p>Arrival: {flight.arrival_city} ({flight.arrival_airport})</p>
                </div>
                <div className='time'>
                    <p>Departure Time: {new Date(flight.departure_time).toLocaleString()}</p>
                    <p>Arrival Time: {new Date(flight.arrival_time).toLocaleString()}</p>
                </div>
                <p>Duration: {flight.duration} hours</p>

            </div>
        </div>
    );
};

Flight.propTypes = {
    flight: PropTypes.shape({
        _id: PropTypes.string,
        flight_number: PropTypes.string.isRequired,
        airline: PropTypes.string.isRequired,
        departure_city: PropTypes.string.isRequired,
        departure_airport: PropTypes.string.isRequired,
        arrival_city: PropTypes.string.isRequired,
        arrival_airport: PropTypes.string.isRequired,
        departure_time: PropTypes.string.isRequired,
        arrival_time: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Flight;

