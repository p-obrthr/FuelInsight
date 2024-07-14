import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import fuelPricesRoutes from './Routes/fuelPrice.js'; 
import fuelStationRoutes from './Routes/fuelStation.js'; 
dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN ,
    methods: 'GET',
    credentials: false, 
}));

app.use('/fuelprices', fuelPricesRoutes);
app.use('/fuelstations', fuelStationRoutes);

const port = 5136;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
