import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

// multiple key handling
const keys = process.env.TANKERKOENIG_APIKEY.split(',');
const api_key = keys[Math.floor(Math.random() * keys.length)].trim();
// Key für den Zugriff auf die freie Tankerkönig-Spritpreis-API
// Für eigenen Key bitte hier https://creativecommons.tankerkoenig.de
// registrieren.

const lat = process.env.TANKERKOENIG_LAT;
const lng = process.env.TANKERKOENIG_LNG;
const rad = process.env.TANKERKOENIG_RAD;

export async function getCurrentData() {
    //
}

