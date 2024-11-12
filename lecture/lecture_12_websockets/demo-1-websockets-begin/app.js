import express from 'express';
import enableWs from 'express-ws';

const app = express();
enableWs(app);

// to track all the sockets and send messages to all of them 
let allSockets = [];
let socketCounter = 0;

app.ws('/chatSocket', (ws, req) => {
    try {
        // "ws" now has the connection info
        let mySocketNum = socketCounter;
        socketCounter++;
        console.log(`User ${mySocketNum} connected via websocket`);
        allSockets.push(ws);

        ws.on('message', chat => {
            try {
                console.log(`msg (user ${mySocketNum}): ${chat}`);
                allSockets.forEach(socket => {
                    socket.send(chat);
                });
                // ws.send(chat);
            } catch (err) {
                console.error(`Error handling message from user ${mySocketNum}:`, err);
            }
        });

        ws.on('error', err => {
            console.error(`WebSocket error for user ${mySocketNum}:`, err);
        });

        ws.on('close', () => {
            console.log(`User ${mySocketNum} disconnected`);
            allSockets = allSockets.filter(socket => socket !== ws); // delete the connection from the list of connected websockets
        });
    } catch (err) {
        console.error('Error in WebSocket connection:', err);
    }
});

app.get('/', (req, res) => {
    try {
        res.sendFile(process.cwd() + "/index.html");
    } catch (err) {
        res.status(500).send('Error serving the index.html file');
        console.error('Error serving the index.html file:', err);
    }
});

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000");
});