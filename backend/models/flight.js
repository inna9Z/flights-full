import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flight_number: {
        unique: true,
        type: String,
        required: true
    },
    airline: {
        type: String,
        required: true
    },
    departure_city: {
        type: String,
        required: true
    },
    departure_airport: {
        type: String,
        required: true
    },
    arrival_city: {
        type: String,
        required: true
    },
    arrival_airport: {
        type: String,
        required: true
    },
    departure_time: {
        type: Date,
        required: true
    },
    arrival_time: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Flight', flightSchema);
