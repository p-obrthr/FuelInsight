import pool from '../database.js';

// export async function saveTankerData(stationData) {
//     const query = `
//         INSERT INTO fuelstation (name, price)
//         VALUES (?, ?)
//         ON DUPLICATE KEY UPDATE price = VALUES(price);
//     `;

//     for (const station of stationData) {
//         const { name, price } = station;
//         await pool.query(query, [name, price]);
//     }
// }
