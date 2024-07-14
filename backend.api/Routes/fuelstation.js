import express from "express";
import { getAllFuelStations }  from '../Controllers/fuelStationController.js';

const router = express.Router();

router.get('/all', getAllFuelStations);

export default router;