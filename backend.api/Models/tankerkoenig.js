import pool from '../database.js';

export async function saveTankerData(stationData) {

    const checkStation = `
        SELECT id FROM fuelstation WHERE tankerId = ?
    `;

    const insertStation = `
        INSERT INTO fuelstation (tankerId, name, lat, lng)
        VALUES (?, ?, ?, ?);
    `;

    const insertPrice = `
        INSERT INTO fuelprice (fuelStationId, price)
        VALUES (?, ?);
    `;

    for (const station of stationData) {
        const { id, name, lat, lng, price } = station;

        let [rows] = await pool.query(checkStation, [id]);
        if (rows.length === 0) {
            await pool.query(insertStation, [id, name, lat, lng]);
            [rows] = await pool.query(checkStation, [id]);
        }
        const fuelStationId = rows[0].id;
        await pool.query(insertPrice, [fuelStationId, price]);
    }
}
