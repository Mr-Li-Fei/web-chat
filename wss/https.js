const https = require('https');
const fs = require('fs');

const options = {
    cert: fs.readFileSync('./certs/certificate.pem'),
    key: fs.readFileSync('./certs/private.pem'),
}

const server = https.createServer(options, function(req, res) {
    res.end('hello bruce!');
});
server.listen(8083);