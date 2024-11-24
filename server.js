const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/symplytrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  openaiKey: { type: String }
});

const supplementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  dosage: String,
  frequency: String,
  createdAt: { type: Date, default: Date.now }
});

const symptomSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  severity: Number,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Supplement = mongoose.model('Supplement', supplementSchema);
const Symptom = mongoose.model('Symptom', symptomSchema);

// Middleware für Authentifizierung
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Nicht authentifiziert' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token ungültig' });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Keine Administratorrechte' });
  }
  next();
};

// Bestehende Endpunkte
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

// Neue Auth Endpunkte
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      email,
      password: hashedPassword,
      role: 'user'
    });
    
    await user.save();
    res.status(201).json({ message: 'Benutzer erstellt' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Ungültige Anmeldedaten' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin Endpunkte
app.post('/api/admin/openai-key', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { apiKey } = req.body;
    await User.findByIdAndUpdate(req.user.id, { openaiKey: apiKey });
    res.json({ message: 'API Key gespeichert' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Endpunkte
app.post('/api/supplements', authenticateToken, async (req, res) => {
  try {
    const supplement = new Supplement({
      userId: req.user.id,
      ...req.body
    });
    await supplement.save();
    res.status(201).json(supplement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/supplements', authenticateToken, async (req, res) => {
  try {
    const supplements = await Supplement.find({ userId: req.user.id });
    res.json(supplements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/symptoms', authenticateToken, async (req, res) => {
  try {
    const symptom = new Symptom({
      userId: req.user.id,
      ...req.body
    });
    await symptom.save();
    res.status(201).json(symptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/symptoms', authenticateToken, async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.user.id });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bestehender WebSocket Handler
wss.on('connection', (ws) => {
  console.log('Client verbunden');
  
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    switch(data.type) {
      case 'execute':
        exec(data.command, (error, stdout, stderr) => {
          ws.send(JSON.stringify({
            type: 'result',
            stdout: stdout,
            stderr: stderr,
            error: error ? error.message : null
          }));
        });
        break;
      
      case 'ping':
        ws.send(JSON.stringify({ type: 'pong' }));
        break;
    }
  });

  ws.on('close', () => {
    console.log('Client getrennt');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
