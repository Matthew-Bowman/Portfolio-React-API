const {
    createVictronReading,
    getVictronReadings,
    getLatestVictronReading
} = require('../services/victronService');


const createReading = async (req, res) => {

    try {

        const reading = req.body;

        if (!reading) {
            return res.status(400).json({
                error: 'No reading supplied'
            });
        }

        const result = await createVictronReading(reading);

        return res.json({
            success: true,
            id: result.insertId
        });

    } catch (err) {

        console.error('Error creating Victron reading:', err);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getReadings = async (req, res) => {

    try {

        const limit = Number(req.query.limit) || 100;

        const readings = await getVictronReadings(limit);

        return res.json(readings);

    } catch (err) {

        console.error('Error getting Victron readings:', err);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


const getLatestReading = async (req, res) => {

    try {

        const reading = await getLatestVictronReading();

        return res.json(reading);

    } catch (err) {

        console.error('Error getting latest Victron reading:', err);

        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};


module.exports = {
    createReading,
    getReadings,
    getLatestReading
};