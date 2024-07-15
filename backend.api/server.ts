import express, {Express, Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv'
import fuelPricesRoutes from './Routes/fuelPrice'; 
import fuelStationRoutes from './Routes/fuelstation'; 
import tankerKoenigRoutes from './Routes/tankerKoenig'; 

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN ,
    methods: 'GET',
    credentials: false, 
}));

app.use('/fuelprices', fuelPricesRoutes);
app.use('/fuelstations', fuelStationRoutes);
app.use('/tanker', tankerKoenigRoutes);

const port = 5136;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
