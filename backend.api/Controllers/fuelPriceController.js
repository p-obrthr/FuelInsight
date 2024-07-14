import { getAllFuelDataDb, getFuelDataFromStationIdDb } from '../Models/fuelPrices.js';

export const getAllFuelData = async (req, res) => {
    try {
        const stations = await getAllFuelDataDb();
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getFuelDataFromStation = async (req, res) => {
    try {
        const station = await getFuelDataFromStationIdDb(req.params.id);
        if (!station) 
            return res.status(404).json({ message: 'Fuel station not found' });
        res.json(station);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createFuelDataStation = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newStation = await createFuelDataStationDb(name, price);
        res.status(201).json(newStation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getFuelNames = async (req, res) => {
    try {
        const names = await getNamesDb();
        res.json(names);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
