const express = require('express');
const Disaster = require('../models/Disaster');
const { fetchDisasterData } = require('../services/femaService'); // Import the FEMA service
const router = express.Router();

// Fetch all disasters (from the database)
router.get('/', async (req, res) => {
    try {
        const disasters = await Disaster.find();
        res.json(disasters);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add a new disaster
router.post('/', async (req, res) => {
    const { type, location, severity } = req.body;

    try {
        const newDisaster = new Disaster({ type, location, severity });
        await newDisaster.save();
        res.status(201).json(newDisaster);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Fetch real-time disaster data from FEMA API
router.get('/fetch-real-time', async (req, res) => {
    try {
        const data = await fetchDisasterData(); // Call the service to get data from FEMA
        res.status(200).json(data); // Return the API data as a response
    } catch (error) {
        console.error('Error fetching real-time data:', error.message);
        res.status(500).json({ message: 'Failed to fetch real-time data' });
    }
});

module.exports = router;
