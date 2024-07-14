import { getFuelStations, getFuelStation, getNames } from '../Models/fuelstation.js';

export const getAllFuelStations = async (req, res) => {
    try {
        const stations = await getFuelStations();
        res.json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getSingleFuelStation = async (req, res) => {
    try {
        const station = await getFuelStation(req.params.id);
        if (!station) 
            return res.status(404).json({ message: 'Fuel station not found' });
        res.json(station);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newStation = await createFuelStation(name, price);
        res.status(201).json(newStation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getFuelStationNames = async (req, res) => {
    try {
        const names = await getNames();
        res.json(names);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
