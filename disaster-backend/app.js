const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const disasterRoutes = require('./routes/disasterRoutes');
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocket.Server({ server });

// Handle WebSocket Connections
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.send('Welcome to the WebSocket server!');
});

// Function to fetch new disasters and emit via WebSocket
const fetchAndEmitDisasters = async () => {
    try {
        const response = await axios.get('https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries');
        const newDisasters = response.data.DisasterDeclarationsSummaries;

        // Emit the data to connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(newDisasters));
            }
        });
    } catch (error) {
        console.error('Error fetching disasters:', error);
    }
};

// Emit mock disaster data every 5 seconds
setInterval(() => {
    const mockDisasterData = {
        type: "Earthquake",
        location: "California",
        severity: "High",
        timestamp: new Date().toISOString(),
    };
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(mockDisasterData));
        }
    });
}, 5000);

// Fetch and emit new disasters every minute
setInterval(() => {
    fetchAndEmitDisasters(); // Fetch and broadcast every minute
}, 60000); // 60 seconds

// Start the Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use('/api/disasters', disasterRoutes);

module.exports = app;