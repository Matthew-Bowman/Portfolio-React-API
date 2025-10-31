// controllers/contactController.js

const { createGynoReview, getGynoReviews } = require('../services/reviewService');
const { successResponse, errorResponse } = require('../utils/responseHelper');
const { validateRating } = require('../utils/validationHelper');

const createGynoReviewHandler = async (req, res) => {
    const { name, message, rating, honeypot } = req?.body ?? null;

    const ratingValid = validateRating(rating);

    if (!name || !message || !rating || !ratingValid) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (honeypot && honeypot !== '') {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const reviewCreated = await createGynoReview(name, message, rating);

        if (!reviewCreated || reviewCreated.length === 0) {
            return res.status(404).json(errorResponse('Enquiry not made'));
        }

        return res.json(successResponse());
    } catch (err) {
        console.error('Error in createReviewHandler:', err);
        return res.status(500).json(errorResponse('Internal server error'));
    }
};

const getGynoReviewsHandler = async (req, res) => {
    const { limit, offset } = req?.body ?? null;

    if (!limit || !offset) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const gynoReviews = await getGynoReviews(limit, offset);

        if (!gynoReviews || gynoReviews.length === 0) {
            return res.status(404).json(errorResponse('No reviews found'));
        }

        return res.json(successResponse(gynoReviews));
    } catch (err) {
        console.error('Error in createEnquiryHandler:', err);
        return res.status(500).json(errorResponse('Internal server error'));
    }
}

module.exports = {
    createGynoReview: createGynoReviewHandler,
    getGynoReviews: getGynoReviewsHandler,
};
