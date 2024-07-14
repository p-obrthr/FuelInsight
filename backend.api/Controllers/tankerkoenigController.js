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
    try {
        var url = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}rad=${rad}&sort=price&type=e5&apikey=${api_key}`;
        const response = await axios.get('url');
        const { stations } = response.data; 

        await saveTankerData(stations);
        res.status(200).json({ message: 'fuel data fetched' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
