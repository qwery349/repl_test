const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.get('/log', (req, res) => {
    const { ip } = req;
    const logEntry = `IP: ${ip}, User-Agent: ${req.headers['user-agent']}, Time: ${new Date().toISOString()}
`;

    fs.appendFile('log.txt', logEntry, (err) => {
        if (err) {
            console.error('Failed to log request:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.sendFile(path.join(__dirname, 'pixel.png'));
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
