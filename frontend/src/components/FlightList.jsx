import { useState, useEffect } from 'react';
import axios from 'axios';
import Flight from './Flight';
import { useNavigate } from 'react-router-dom';

const FlightsList = () => {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    // Fetch the list of flights from the server
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5002/flights');
                setFlights(response.data.flights);
            } catch (error) {
                console.error('Error fetching flights:', error.message);
            }
        };

        fetchFlights();
    }, []);  // Run this effect only once on component mount

    const handleDelete = async (flightId) => {
        try {
            // Send a DELETE request to the server to delete the flight
            const response = await axios.delete(`http://localhost:5002/flights/${flightId}`);
            if (response.data.success) {
                // Remove the deleted flight from the state
                setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== flightId));
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error('Error deleting flight:', error.message);
        }
    };

    const handleUpdate = (flightId) => {
        navigate(`/flights/${flightId}/update`);
    };

    return (
        <div>
            <h1>Flights List</h1>
            <ul>
                {flights.map((flight) => (
                    <Flight key={flight._id} flight={flight} onDelete={handleDelete} onUpdate={handleUpdate} />
                ))}
            </ul>
        </div>
    );
};

export default FlightsList;



