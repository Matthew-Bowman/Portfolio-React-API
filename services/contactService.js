// services/arbitrageService.js

const db = require('../db');

const createEnquiry = async (pName, pEmail, pMessage) => {
    const query = 'INSERT INTO Enquiries (Name, Email, Message) VALUES (?, ?, ?)';
    const values = [pName, pEmail, pMessage];

    try {
        const [rows] = await db.execute(query, values);
        return rows;
    } catch (err) {
        console.error('Error creating enquiry:', err);
        throw err;
    }
};

const getGynoReviews = async () => {
    const query = 'SELECT * FROM Enquiries WHERE email="GYNECOLOGIST_REVIEW_1"';
    const values = [];

    try {
        const [rows] = await db.execute(query, values);
        return rows;
    } catch (err) {
        console.error('Error getting reviews:', err);
        throw err;
    }
}

module.exports = {
    createEnquiry,
    getGynoReviews,
};
