import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import fuelPricesRoutes from './Routes/fuelPrice.js'; 
import fuelStationRoutes from './Routes/fuelStation.js'; 
import tankerKoenigRoutes from './Routes/tankerKoenig.js'; 

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
