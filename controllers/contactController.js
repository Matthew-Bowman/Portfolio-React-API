// controllers/contactController.js

const { createEnquiry } = require('../services/contactService');
const { successResponse, errorResponse } = require('../utils/responseHelper');

const createEnquiryHandler = async (req, res) => {
    const name = req?.body?.name ?? null;
    const email = req?.body?.email ?? null;
    const message = req?.body?.message ?? null;
    const honeypot = req?.body?.honeypot ?? null;


    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    if (honeypot && honeypot !== '') {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const enquiryCreated = await createEnquiry(name, email, message);

        if (!enquiryCreated || enquiryCreated.length === 0) {
            return res.status(404).json(errorResponse('Enquiry not made'));
        }

        return res.json(successResponse());
    } catch (err) {
        console.error('Error in createEnquiryHandler:', err);
        return res.status(500).json(errorResponse('Internal server error'));
    }
};

module.exports = {
    createEnquiry: createEnquiryHandler,
};
