import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, child, serverTimestamp, onValue, update, set } from "firebase/database";
import app from "../firebase"
import PlayerList from './playerlist';
import Log from './log';


const PlayerRoom = (params) => {
    const { id } = useParams();

    // Database references
    const database = getDatabase(app);
    const roomRef = ref(database, `rooms/${id}`);
    const usersRef = child(roomRef,'users');
    const logRef = child(roomRef, 'logs');
    const buzzesRef = child(roomRef, 'buzzes');

    // State
    const [buzzerLocked, setBuzzerLocked] = useState(false);
    const [userList, setUserList] = useState([]);
    const [host, setHost] = useState('');
    const [buzz, setBuzz] = useState("");
    const [log, setLog] = useState([]);
    //let audio = new Audio("/bell.mp3");
    const [audio] = useState(new Audio("/bell.mp3"));
    const history = useHistory();

    // useEffect(() => {
    //     roomRef.once('value', (snapshot) => {
    //         const room = snapshot.val();
    //         setBuzzerLocked(room.buzzerLocked);
    //         console.log(room);
    //     });
    // }, []);

    // Checks for valid room ID
    // If ID is invalid, unsubscribe from listeners, show 404 screen
    useEffect(() => {
        let unsubscribeAllRooms = onValue(ref(database, 'rooms'), (snapshot) => {
            const rooms = snapshot.val();
            if(rooms && Object.keys(rooms).includes(id)){
                params.setID(id);
                params.setInvalidID(false);
            }
            else{
                params.setInvalidID(true);
                unsubscribeAllRooms()
                //unsubscribeLog()
                //unsubscribeUsers()
                //ref(database,'rooms').off('value');
                history.push('/404');
            }
        })
    })

    // Update the log client-side when the database changes
    useEffect(() => {
        let unsubscribeLog = onValue(logRef, (snapshot) => {
            const logList = snapshot.val();
            if(logList) setLog(Object.values(logList));
        });

        return () => {
            //logRef.off('value');
            unsubscribeLog()
        }
    }, []);

    // Set the host of the room (only runs once)
    useEffect(() => {
        onValue(roomRef, (snapshot) => {
            const room = snapshot.val();
            setHost(room.host);
        }, { onlyOnce: true });
    }, []);

    // Function to compare buzzer timestamps
    function compareBuzzTime(user1, user2){
        if(user1[1] < user2[1]) return -1;
        if(user1[1] > user2[1]) return 1;
        return 0;
    }

    // Displays the state of the buzzer, which player buzzed
    useEffect(() => {
        let unsubscribeBuzzerCheck = onValue(roomRef, (snapshot) => {
            const room = snapshot.val();
            if(room) setBuzzerLocked(room.buzzerLocked);
            if(room && room.buzzes){
                let usersThatBuzzed = Object.entries(room.buzzes).filter(element => element[1] >= room.resetTime);
                //console.log("before: " + usersThatBuzzed);
                usersThatBuzzed.sort(compareBuzzTime);
                //console.log("after: " + usersThatBuzzed);
                //console.log(usersThatBuzzed[0]);
                if(usersThatBuzzed.length > 0){
                    setBuzz(usersThatBuzzed[0][0]);
                }
            }
        });

        return () => {
            unsubscribeBuzzerCheck()
        }
    }, [])

    // When buzzerLocked changes, run:
    // If the buzzer is no longer locked, clear the previous buzz
    useEffect(() => {
        if(!buzzerLocked) setBuzz("");
    }, [buzzerLocked])


    // Update the player list
    // Handle player getting kicked
    useEffect(() => {
        let unsubscribeUsers = onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            if(users){
                let currentUsers = Object.keys(users);
                setUserList(currentUsers);
                if(!currentUsers.includes(params.username)){
                    history.push("/404");
                }
            }
        });

        return () => {
           //usersRef.off('value');
           unsubscribeUsers()
        }
    }, []);

    // Handle buzzing
    function handleClick(){
        if(buzzerLocked){
            //console.log("Buzzer is locked, doing nothing");
        }
        else{
            //console.log("Buzzer is not locked, do something");
            audio.play();
            setBuzzerLocked(true);
            
            // Update
            let updates = {}
            updates['buzzerLocked'] = true;
            updates[`buzzes/${params.username}`] = serverTimestamp();
            updates[`users/${params.username}/buzzedIn`] = true;
            update(roomRef, updates);

        }
    }

    return(
        <div>
            <Container>
                <Row className="d-flex align-items-center" style={{
                    height: '50%'
                }}>
                    <Col xs={12} sm={12} md={12} lg={8} style={{
                        height: '50%'
                    }}>
                        <div className="text-center" style={{
                            padding: '20% 0% 10%'
                        }}>
                            <Button variant={buzzerLocked ? 'danger' : 'primary'} style={{
                                height: '25vh',
                                width: '25vh',
                                borderRadius: '50%',
                                fontSize: 'xx-large'
                            }} onClick={handleClick}>
                                { buzzerLocked ? 'Locked' : 'Buzz' }
                            </Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4} style={{
                        overflowY: 'auto',
                        height: '50%'
                    }}>
                        <div className="text-center" style={{
                                padding: '5% 5% 5%'
                        }}>
                            <PlayerList data={userList} username={params.username}  buzzedUser={buzz} host={host}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{
                    height: '25%'
                }}>
                    <div className="text-center" style={{
                            padding: '0% 8% 5%'
                        }}>
                        <Log data={log}></Log>
                    </div>
                </Row>
            </Container>
        </div>
    );

}

export default PlayerRoom;