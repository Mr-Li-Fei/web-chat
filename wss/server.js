const ws = require('ws');
const https = require('https');
const fs = require('fs');

const server = https.createServer({
    cert: fs.readFileSync('certs/certificate.pem'),
    key: fs.readFileSync('certs/private.pem'),
});
const wss = new ws.WebSocketServer({server});

wss.on('connection', (ws) => {
    ws.on('error', console.error);
    ws.on('message', (data) => {
        console.log(data);
    })

    ws.send('ok!');
})

server.listen(8080);


