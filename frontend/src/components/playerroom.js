import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import firebase from "../firebase"
import PlayerList from './playerlist';
import Log from './log';


const PlayerRoom = (params) => {
    const { id } = useParams();
    const roomRef = firebase.database.ref('/rooms').child(`${id}`);
    const usersRef = roomRef.child('users');
    const logRef = roomRef.child('logs');
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

    useEffect(() => {
        firebase.database.ref('/rooms').on('value', (snapshot) => {
            const rooms = snapshot.val();
            if(rooms && Object.keys(rooms).includes(id)){
                params.setID(id);
                params.setInvalidID(false);
            }
            else{
                params.setInvalidID(true);
                logRef.off('value');
                roomRef.off('value');
                usersRef.off('value');
                firebase.database.ref('/rooms').off('value');
                history.push('/404');
            }
        })
    })

    useEffect(() => {
        logRef.on('value', (snapshot) => {
            const logList = snapshot.val();
            if(logList) setLog(Object.values(logList));
        });

        return () => {
            logRef.off('value');
        }
    }, []);

    useEffect(() => {
        roomRef.once('value', (snapshot) => {
            const room = snapshot.val();
            setHost(room.host);
        });
    }, []);

    function compareBuzzTime(user1, user2){
        if(user1[1] < user2[1]) return -1;
        if(user1[1] > user2[1]) return 1;
        return 0;
    }

    useEffect(() => {
        roomRef.on('value', (snapshot) => {
            const room = snapshot.val();
            if(room)setBuzzerLocked(room.buzzerLocked);
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
            roomRef.off('value');
        }
    }, [])

    useEffect(() => {
        if(!buzzerLocked) setBuzz("");
    }, [buzzerLocked])

    useEffect(() => {
        usersRef.on('value', (snapshot) => {
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
            usersRef.off('value');
        }
    }, []);

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
            updates[`buzzes/${params.username}`] = Date.now();
            updates[`users/${params.username}/buzzedIn`] = true;
            roomRef.update(updates);
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