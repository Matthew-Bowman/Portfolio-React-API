const express = require('express');
const router = express.Router();

const victronController = require('../controllers/victronController');


router.post('/', victronController.createReading);

router.get('/', victronController.getReadings);

router.get('/latest', victronController.getLatestReading);


module.exports = router;