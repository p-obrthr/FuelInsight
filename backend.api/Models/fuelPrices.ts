import { RowDataPacket } from 'mysql2';
import pool from '../database';

interface FuelPrice extends RowDataPacket {
    id: number;
    fuelStationId: number;
    price: number;
    created: Date;
}

export async function getAllFuelDataDb(): Promise<FuelPrice[]> {
    const [rows] = await pool.query<FuelPrice[]>("SELECT * FROM fuelprice;");
    return rows;
}

export async function getFuelDataFromStationIdDb(id: number): Promise<FuelPrice[]> {
    const [rows] = await pool.query<FuelPrice[]>(`
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

 export async function getNamesDb() {
     const [rows] = await pool.query("SELECT DISTINCT id, name, created FROM fuelstation;");
     return rows;
 }