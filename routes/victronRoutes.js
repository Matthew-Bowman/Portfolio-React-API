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

router.post('/', verifyApiKey, victronController.createReading);
router.get('/', victronController.getReadings);
router.get('/latest', victronController.getLatestReading);

module.exports = router;