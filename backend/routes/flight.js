import express from 'express';

const router = express.Router();

import flightControllers from '../controllers/flight.js';
import verifyToken from '../middleware/verifyToken.js';

// routes
router.get('/', flightControllers.getFlights);
router.get('/:flight_number', flightControllers.getFlight);
router.post('/', verifyToken, flightControllers.postFlights);
router.put('/:id', verifyToken, flightControllers.updateFlights);
router.delete('/:id', verifyToken, flightControllers.deleteFlights);

export default router;
