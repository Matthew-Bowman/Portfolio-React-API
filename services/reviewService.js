// services/reviewService.js

const db = require('../db');

const createGynoReview = async (pName, pMessage, pRating) => {
    const query = 'INSERT INTO Reviews (Name, Message, Rating) VALUES (?, ?, ?)';
    const values = [pName, pMessage, pRating];

    try {
        const [rows] = await db.execute(query, values);
        return rows;
    } catch (err) {
        console.error('Error creating review:', err);
        throw err;
    }
}

const getGynoReviews = async (pLimit, pOffset) => {
    const query = 'SELECT * FROM Reviews ORDER BY Created DESC LIMIT ? OFFSET ?';
    const values = [pLimit, pOffset];

    try {
        const [rows] = await db.execute(query, values);
        return rows;
    } catch (err) {
        console.error('Error getting reviews:', err);
        throw err;
    }
}

module.exports = {
    createGynoReview,
    getGynoReviews,
};
