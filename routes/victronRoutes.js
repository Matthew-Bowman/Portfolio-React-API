const express = require('express');
const router = express.Router();

const victronController = require('../controllers/victronController');

function verifyApiKey(req, res, next) {
    const key = req.headers['x-api-key'];

    if (!key || key !== process.env.VICTRON_API_KEY) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }

    next();
}

router.post('/', verifyApiKey, victronController.createVictronReading);
router.get('/', victronController.getVictronReadings);

module.exports = router;