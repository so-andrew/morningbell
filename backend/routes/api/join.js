const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
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
}

router.post('/', async (req, res) =>{
    console.log(req.body);
    // Receive username, room code
    const username = req.body.user;
    const roomCode = req.body.code;
    let roomExists = true;
    let duplicateUser = false;
    let roomObject;

    // Check if code is valid (room exists)
    ref.on('value', (snapshot) =>{
        const roomList = snapshot.val();
        console.log(roomList);
        if(roomCode in roomList){
            console.log("Room exists");
            console.log(roomList[roomCode]);
            roomObject = roomList[roomCode];

            // Check if name is taken
            const roomRef = ref.child(`${roomCode}`);
            if(!roomObject.users){
                // Room is empty, adding user
                //console.log('Room is empty, adding user');
                addUserToRoom(roomRef, username);
            }
            else{
                // Room is not empty, checking for dupe
                console.log('Room is not empty, checking for dupe');
                if(roomObject.users[username]){
                    console.log('User exists');
                    duplicateUser = true;
                }
                else{
                    console.log('New user');
                    addUserToRoom(roomRef, username);
                }
            } 
        }
        else{
            console.log("Room does not exist");
            roomExists = false;
        }
        // Send response
        if(!roomExists){
            return res.status('404').send("Room does not exist");
        }
        else if(roomExists && duplicateUser){
            return res.status('403').send("User with that name already exists");
        }
        else{
            res.send(`Hello ${req.body.user}!`);
        }

    }, (errorObject) => {
        console.log('Uh-oh: ' + errorObject.name);
    });
    
});

module.exports = router;