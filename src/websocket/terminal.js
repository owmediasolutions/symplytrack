const { exec } = require('child_process');

const handleWebSocket = (wss) => {
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
};

module.exports = { handleWebSocket };