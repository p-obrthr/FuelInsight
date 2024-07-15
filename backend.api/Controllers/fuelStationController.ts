import { Request, Response } from 'express';
import { getAllFuelStationsDb } from '../Models/fuelStations';

export const getAllFuelStations = async (req: Request, res: Response) => {
    try {
        const stations = await getAllFuelStationsDb();
        res.json(stations);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
