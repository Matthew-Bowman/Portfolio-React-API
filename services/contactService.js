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

module.exports = {
    createEnquiry,
};
