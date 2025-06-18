// app.js

const express = require('express');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Enable CORS for all origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Then, register JSON parser for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Other routes
app.use('/contact', contactRoutes);

module.exports = app;