import { getAllFuelStationsDb } from '../Models/fuelStations.js';

export const getAllFuelStations = async (req, res) => {
    try {
        const stations = await getAllFuelStationsDb();
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
