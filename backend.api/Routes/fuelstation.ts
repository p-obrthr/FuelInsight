import express from "express";
import { getAllFuelStations }  from '../Controllers/fuelStationController';

const router = express.Router();

router.get('/all', getAllFuelStations);

export default router;