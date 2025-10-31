// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createGynoReview);
router.get('/', reviewController.getGynoReviews);

module.exports = router;