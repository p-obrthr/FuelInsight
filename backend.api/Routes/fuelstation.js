import express from "express";
import {getAllFuelStations, getSingleFuelStation, getFuelStationNames}  from '../Controllers/fuelstation.js';

const router = express.Router();

router.get('/all', getAllFuelStations);
router.get('/:id', getSingleFuelStation);
// router.post('/', createNewFuelStation);
router.get('/names', getFuelStationNames);

export default router;

