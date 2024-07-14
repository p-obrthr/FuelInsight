import dotenv from 'dotenv';
import axios from 'axios';
import { saveTankerData } from '../Models/tankerKoenig.js';

dotenv.config();

const keys = process.env.TANKERKOENIG_APIKEY.split(',');
const api_key = keys[Math.floor(Math.random() * keys.length)].trim();

const lat = process.env.TANKERKOENIG_LAT;
const lng = process.env.TANKERKOENIG_LNG;
const rad = process.env.TANKERKOENIG_RAD;

export async function fetchData(req, res) {
    try {
        const url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${rad}&sort=price&type=e5&apikey=${api_key}`;
        const response = await axios.get(url);
        const { stations } = response.data;

        await saveTankerData(stations);
        res.status(200).json(stations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
