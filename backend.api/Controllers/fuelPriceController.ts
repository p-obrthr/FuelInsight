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
        const name: string = station[0].name;
        const data_to_python = {
            stationData: station,
            mean: undefined,
            name: name
        }
    
        const spawner = require('child_process').spawn;
        const pythonProcess = spawner('python', ['py/data.py', JSON.stringify(data_to_python)]);
        pythonProcess.stdout.on('data', (data: JSON) => {
            try {
                const dataString = data.toString();
                const jsonData = JSON.parse(dataString);
    
                console.log('Data received from Python script:', jsonData);
                res.json(jsonData);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).json({ error: 'Failed to parse JSON data from Python script' });
            }
        });
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