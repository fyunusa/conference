// const express = require('express');
// const fetch = require('node-fetch');
// const conferencesData = require('./conference.json');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get('/process-conferences', async (req, res) => {
//     try {
//         // Process the conferences and update geolocation
//         for (const conference of conferencesData.conferences) {
//             try {
//                 const geocode = await getGeocode(conference.address);
//                 conference.lat = geocode.lat;
//                 conference.lon = geocode.lon;
//             } catch (error) {
//                 console.error(`Error fetching geocode for conference '${conference.name}':`, error);
//             }
//         }

//         res.status(200).json(conferencesData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred' });
//     }
// });

// // Function to fetch the geocode (latitude and longitude) for an address
// async function getGeocode(address) {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.length > 0) {
//         return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
//     } else {
//         throw new Error('Address not found.');
//     }
// }

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

await getGeocode("19 Wilson Street, Pittsburgh, PA 15223").then((data) => {
    console.log(data);
});

async function getGeocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } else {
            throw new Error('Address not found.');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

