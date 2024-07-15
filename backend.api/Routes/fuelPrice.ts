import express from "express";
import { getAllFuelData, getFuelDataFromStation, getFuelNames }  from '../Controllers/fuelPriceController';

const router = express.Router();

router.get('/all', getAllFuelData);
router.get('/:id', getFuelDataFromStation);
// router.post('/', createNewFuelStation);
router.get('/names', getFuelNames);

export default router;

