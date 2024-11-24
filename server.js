const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Route Imports
const healthRoutes = require('./src/routes/health');
const terminalRoutes = require('./src/routes/terminal');
const authRoutes = require('./src/routes/auth');
const trackingRoutes = require('./src/routes/tracking');
const { handleWebSocket } = require('./src/websocket/terminal');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/symplytrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api', healthRoutes);
app.use('/api/terminal', terminalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', trackingRoutes);

// WebSocket Handler
handleWebSocket(wss);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});