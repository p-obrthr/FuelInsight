import { Request, Response } from 'express';
import { getAllFuelDataDb, getFuelDataFromStationIdDb, getNamesDb } from '../Models/fuelPrices';

export const getAllFuelData = async (req: Request, res: Response): Promise<void> => {
    try {
        const stations = await getAllFuelDataDb();
        res.json(stations);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getFuelDataFromStation = async (req: Request, res: Response): Promise<void> => {
    try {
        const station = await getFuelDataFromStationIdDb(Number(req.params.id));
        if (!station || station.length === 0) {
            res.status(404).json({ message: 'Fuel station not found' });
        }
        res.json(station);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// export const createFuelDataStation = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { name, price } = req.body;
//         const newStation = await createFuelDataStationDb(name, price);
//         res.status(201).json(newStation);
//     } catch (err: any) {
//         res.status(500).json({ message: err.message });
//     }
// };

export const getFuelNames = async (req: Request, res: Response): Promise<void> => {
     try {
         const names = await getNamesDb();
         res.json(names);
     } catch (err: any) {
         res.status(500).json({ message: err.message });
     }
};