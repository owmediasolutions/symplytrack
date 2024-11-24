const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.post('/execute', (req, res) => {
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

module.exports = router;