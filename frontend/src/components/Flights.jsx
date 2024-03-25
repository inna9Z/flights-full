import axios from 'axios';

import { useEffect } from 'react';
import { useState } from 'react';
import Flight from './Flight';




const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [flightNumber, setFlightNumber] = useState('');
    const [error, setError] = useState(false);



    useEffect(() => {
        const getFlights = async () => {
            try {
                const res = await axios.get('http://localhost:5002/')

                if (res.status !== 200) {
                    throw new Error(`Failed to fetch with status ${res.status}`)

                } else {
                    setFlights(res.data.flights);
                }
            } catch (err) {
                setError(err.message)
            }
        }
        getFlights();
    }, []);

    useEffect(() => {
        // Filter flights based on the entered flight number
        const filtered = flights.filter(
            (flight) => flight.flight_number.toLowerCase().includes(flightNumber.toLowerCase())
        );
        setFilteredFlights(filtered);
    }, [flightNumber, flights]);




    return (
        <div>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search by Flight Number"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                />

            </div>

            {error && <p className="error">{error}</p>}

            {filteredFlights && filteredFlights.length > 0 ? (
                filteredFlights.map((flight) => (
                    <Flight key={flight.flight_number} flight={flight} setError={setError} />
                ))
            ) : (
                <p>No flights found</p>
            )}
        </div>
    )
}



export default Flights;
