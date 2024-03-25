import Flight from '../models/flight.js';

const flightControllers = {
    getFlights: async (req, res) => {
        try {
            const result = await Flight.find();

            return res.status(200).json({
                success: true,
                flights: result
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message
            });
        }
    },
    getFlight: async (req, res) => {
        try {
            const { flight_number } = req.params;
            const result = await Flight.findOne({
                flight_number: flight_number
            });

            if (result) {
                return res.status(200).json({
                    success: true,
                    flight: result
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: 'Flight not found'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message || 'Error while getting the flight'
            });
        }
    },

    postFlights: async (req, res) => {
        try {
            // Extract flight data from the request body
            const {
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            } = req.body;

            if (!flight_number || !airline) {
                return res.status(400).json({
                    success: false,
                    err: 'Please provide the required data'
                });
            }

            const result = await Flight.create({
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            });

            return res.status(201).json({
                success: true,
                flight: result
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message || 'Error while adding the flight'
            });
        }
    },
    updateFlights: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            } = req.body;

            if (!flight_number || !airline) {
                return res.status(400).json({
                    success: false,
                    error: 'Please add the recipes data'
                });
            }

            const result = await Flight.updateOne(
                {
                    _id: id
                },
                {
                    flight_number,
                    airline,
                    departure_city,
                    departure_airport,
                    arrival_city,
                    arrival_airport,
                    departure_time,
                    arrival_time,
                    duration,
                    price
                }
            );
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Flight updated successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    err: 'Error while updating flight'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message || 'Internal Server Error'
            });
        }
    },
    deleteFlights: async (req, res) => {
        // Implement logic to delete a flight by ID
        try {
            const { id } = req.params;
            const result = await Flight.deleteOne({ _id: id });

            if (result.deletedCount > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'Flight deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    error: 'Flight not found for deleting'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Internal Server Error'
            });
        }
    }
};

export default flightControllers;
