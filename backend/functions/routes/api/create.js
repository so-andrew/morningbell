const express = require('express');
const router = express.Router();
const { customAlphabet } = require('nanoid');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 5);

var admin = require("firebase-admin");
const database = admin.database();
const ref = database.ref('/rooms');

// route post api/create
// Create room
router.post('/', async (req, res) =>{
    const id = generateRoomID();
    const roomRef = ref.child(`${id}`);
    roomRef.set({
        buzzerLocked: false,
        host: null,
        resetTime: Date.now()
    }, (error) => {
        if(error) console.log(error);
    });
    const newLogRef = roomRef.child('logs').push();
    newLogRef.set({
        content: `Room created with ID ${id}.`,
        timestamp: Date.now()
    });
    res.send(id);
});


// Generates a room code
function generateRoomID(){
    return nanoid();
}

module.exports = router;