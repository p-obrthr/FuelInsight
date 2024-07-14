import pool from '../database.js';

export async function getAllFuelStationsDb() {
    const [rows] = await pool.query("Select id, name FROM fuelstation;");
    return rows;
}
