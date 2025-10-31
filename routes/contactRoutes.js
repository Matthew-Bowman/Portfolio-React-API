// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/reviewController');

// POST /
router.post('/', contactController.createEnquiry);

module.exports = router;
