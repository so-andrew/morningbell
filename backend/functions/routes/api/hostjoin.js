const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");

const database = admin.database();
const ref = database.ref('/rooms');

router.post('/', async(req, res) => {
    const username = req.body.user;
    const code = req.body.code;

    const roomRef = ref.child(`${code}`);
    roomRef.update({
        'host':  username
    });
    const usersRef = roomRef.child(`users`);
    const newUserRef = usersRef.child(`${username}`);
    newUserRef.set({
        active: true,
        buzzedIn: false
    });
    const newLogRef = roomRef.child('logs').push();
    newLogRef.set({
        content: `${username} joined the room as host.`,
        timestamp: Date.now()
    });

    res.status(200).send('Success');

});

module.exports = router;