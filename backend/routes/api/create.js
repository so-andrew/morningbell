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
    console.log(id);

    const roomRef = ref.child(`${id}`);
    roomRef.set({
        buzzerLocked: false
    }, (error) => {
        if(error) console.log(error);
    });

    res.send(id);
});

// Generates a room code
function generateRoomID(){
    return nanoid();
}

module.exports = router;