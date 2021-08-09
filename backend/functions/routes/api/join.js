const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");

const database = admin.database();
const ref = database.ref('/rooms');

function addUserToRoom(room, username){
    const usersRef = room.child(`users`);
    const newUserRef = usersRef.child(`${username}`);
    newUserRef.set({
        active: true,
        buzzedIn: false
    });

    const newLogRef = room.child('logs').push();
    newLogRef.set({
        content: `${username} joined the room.`,
        timestamp: Date.now()
    });

    var updates = {};
    updates[`/buzzes/${username}`] = 0;
    room.update(updates);
}

router.post('/', async (req, res) =>{
    // Receive username, room code
    const username = req.body.user;
    const roomCode = req.body.code;
    let roomExists = true;
    let duplicateUser = false;
    let roomObject;
    let roomRef;

    // Check if code is valid (room exists)
    ref.once('value', (snapshot) => {
        const roomList = snapshot.val();
        if(roomList && roomCode in roomList){
            roomObject = roomList[roomCode];

            // Check if name is taken
            roomRef = ref.child(`${roomCode}`);
            
            if(roomObject.host === username){
                return res.status('403').send("User with that name already exists");
            }

            if(!roomObject.users){
                // Room is empty, adding user
                //console.log('Room is empty, adding user');
                addUserToRoom(roomRef, username);
                return res.send(`Hello ${username}!`);
            }
            else{
                // Room is not empty, checking for dupe
                if(roomObject.users[username]){
                    console.log('User exists');
                    duplicateUser = true;
                    return res.status('403').send("User with that name already exists");
                }
                else{
                    res.send(`Hello ${username}!`);
                    addUserToRoom(roomRef, username);
                }
            } 
        }
        else{
            roomExists = false;
            return res.status('404').send("Room does not exist");
        }
        // Send response
        // if(!roomExists){
        //     
        // }
        // else if(roomExists && duplicateUser){
        //     return res.status('403').send("User with that name already exists");
        // }
        // else{
        //     return res.send(`Hello ${req.body.user}!`);
        // }

    }, (errorObject) => {
        console.log('Uh-oh: ' + errorObject.name);
    });
    
});

module.exports = router;