import pool from '../database.js';

export async function getAllFuelDataDb() {
    const [rows] = await pool.query("Select * FROM fuelprice;");
    return rows;
}

export async function getFuelDataFromStationIdDb(id) {
    const [rows] = await pool.query(`
        SELECT name, price, fuelprice.created
        FROM fuelprice
        JOIN fuelstation ON fuelprice.fuelStationId = fuelstation.id
        WHERE fuelstation.id = ?
        `, [id]);
    return rows;
}

// export async function createFuelDataStationDb(name, price) {
//     const result = await pool.query(`
//         INSERT INTO fuelstation (name, price)
//         VALUES (?, ?)
//         `, [name, price]);

//     const id = result.insertId;
//     return getFuelStation(id);
// }

// export async function getNamesDb() {
//     const [rows] = await pool.query("SELECT DISTINCT id, name, created FROM fuelstation;");
//     return rows;
// }