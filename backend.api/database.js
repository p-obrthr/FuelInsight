import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

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

export async function create(name, price) {
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
