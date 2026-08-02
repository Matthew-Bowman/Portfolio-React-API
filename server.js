// server.js
require('dotenv').config();

const http = require('http');

const app = require('./app');
const WebSocketService = require('./websocket/WebSocketService');

const PORT = process.env.PORT;


const server = http.createServer(app);


WebSocketService.initialise(server);


server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});