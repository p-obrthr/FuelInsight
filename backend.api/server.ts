import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fuelPricesRoutes from './Routes/fuelPrice';
import fuelStationRoutes from './Routes/fuelstation';
import tankerKoenigRoutes from './Routes/tankerKoenig';
import authenticationRoutes from './Routes/authentication';

dotenv.config();

const app: Express = express();

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST'],
  credentials: false,
}));

app.use(express.json());

app.use('/fuelprices', fuelPricesRoutes);
app.use('/fuelstations', fuelStationRoutes);
app.use('/tanker', tankerKoenigRoutes);
app.use('/auth', authenticationRoutes);

const port = 5136;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
