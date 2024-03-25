import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightsDetails.css';

const FlightDetails = ({ defaultFlightNumber }) => {
    const [flightNumber, setFlightNumber] = useState(defaultFlightNumber || '');
    const [flight, setFlight] = useState(null);
    const [error, setError] = useState(null);

    const getFlight = async () => {
        try {
            const res = await axios.get(`http://localhost:5002/${flightNumber}`);
            setFlight(res.data.flight);
        } catch (err) {
            setError('Flight not found');
            setFlight(null);
        }
    };

    useEffect(() => {
        // Fetch flight details when the component mounts
        getFlight();
    }, []); // The empty dependency array ensures that this effect runs only once on mount

    return (
        <div>
            {flight ? (
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
                        <div className="time">
                            <p>Departure Time: {new Date(flight.departure_time).toLocaleString()}</p>
                            <p>Arrival Time: {new Date(flight.arrival_time).toLocaleString()}</p>
                        </div>
                        <p>Duration: {flight.duration} hours</p>
                        <p>Price: ${flight.price.toFixed(2)}</p>
                    </div>
                </div>
            ) : (
                <p>{error || 'Flight details not available.'}</p>
            )}
        </div>
    );
};

export default FlightDetails;
