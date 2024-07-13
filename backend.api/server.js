import express from "express";
const app = express();
import cors from "cors";
import {getFuelStations, getFuelStation, create} from './database.js';

app.use(cors({
    origin: 'http://127.0.0.1:3000',
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

app.post("")

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke.');
});

const port = 5136;
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
