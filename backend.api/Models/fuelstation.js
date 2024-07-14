import pool from '../database.js';

export async function getFuelStations() {
    const [rows] = await pool.query("Select * FROM fuelstation;");
    return rows;
}

export async function getFuelStation(id) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM fuelstation
        WHERE id = ?;
        `, [id]);
    return rows[0];
}

export async function createFuelStation(name, price) {
    const result = await pool.query(`
        INSERT INTO fuelstation (name, price)
        VALUES (?, ?)
        `, [name, price]);

    const id = result.insertId;
    return getFuelStation(id);
}

export async function getNames() {
    const [rows] = await pool.query("SELECT DISTINCT id, name, created FROM fuelstation;");
    return rows;
}