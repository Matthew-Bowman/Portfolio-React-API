// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createEnquiry);
router.get('/', reviewController.createEnquiry);

module.exports = router;