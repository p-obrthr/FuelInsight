import express from "express";
const app = express();
import cors from "cors";
import {getFuelStations, getFuelStation, getNames, create} from './database.js';
import dotenv from 'dotenv'
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN ,
    methods: 'GET',
    credentials: false, 
}));

app.get("/fuelstations", async (req, res) => {
    const fuelstations = await getFuelStations();
    res.json(fuelstations);
});

app.get("/fuelstations/:id", async (req, res) => {
    const id = req.params.id;
    const fuelstation = await getFuelStation(id);
    res.json(fuelstation);
});

app.get("/all", async (req, res) => {
    const names = await getNames();
    res.json(names);
});

app.post("")

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke.');
});

const port = 5136;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
