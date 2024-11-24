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

// Original Terminal Endpoint (für bestehende Projekte)
app.post('/api/terminal/execute', (req, res) => {
  const { command } = req.body;
  
  if (!command) {
    return res.status(400).json({ error: 'Kein Befehl angegeben' });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ 
        error: error.message,
        stderr: stderr
      });
    }
    
    res.json({
      stdout: stdout,
      stderr: stderr
    });
  });
});

// Original Health Check (für bestehende Projekte)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      api: true,
      websocket: true
    }
  });
});

// Neue Routen für SymplyTrack
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