import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory, useParams } from 'react-router-dom';
import { getDatabase, ref, child, serverTimestamp, onValue, update } from "firebase/database";
import app from "../firebase";
import HostPlayerList from "./hostplayerlist";
import Log from "./log";
import KickModal from "./kickmodal";

const HostRoom = (params) => {
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
    const [buzz, setBuzz] = useState("");
    const [log, setLog] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [kickUsername, setKickUsername] = useState('');
    const history = useHistory();

    // Reset the buzzer
    function handleClick(){
        if(buzzerLocked){
            setBuzzerLocked(false);
            let updates = {};
            updates['buzzerLocked'] = false;
            updates['resetTime'] = serverTimestamp();
            // Reset players' last buzzed time
            update(roomRef, updates);
            setBuzz("");
        }
    }

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

    // useEffect(() => {
    //     logRef.on('child_added', (data) =>{
    //         console.log(data.val());
    //         let newLogList = log;
    //         newLogList.push(data.val());
    //         setLog(newLogList);
    //     });
    // }, []);

    // Function to compare buzzer timestamps
    function compareBuzzTime(user1, user2){
        if(user1[1] < user2[1]) return -1;
        if(user1[1] > user2[1]) return 1;
        return 0;
    }

    // Displays the state of the buzzer, which player buzzed
    useEffect(() => {
        let unsubscribeBuzzCheck = onValue(roomRef, (snapshot) => {
            const room = snapshot.val();
            if(room) setBuzzerLocked(room.buzzerLocked);
            if(room && room.buzzes){
                let usersThatBuzzed = Object.entries(room.buzzes).filter(element => element[1] >= room.resetTime);
                usersThatBuzzed.sort(compareBuzzTime);
                if(usersThatBuzzed.length > 0){
                    setBuzz(usersThatBuzzed[0][0]);
                }
            }
        });

        return () => {
            unsubscribeBuzzCheck();
        }
    }, []);

    // Update the player list
    useEffect(() => {
        let unsubscribeUsers = onValue(usersRef, (snapshot) => {
            const users = snapshot.val();
            if(users) setUserList(Object.keys(users));
        });

        return () => {
            unsubscribeUsers();
        }
    }, []);


    // Kick players
    useEffect(() => {
        if(kickUsername && kickUsername.length > 0){
            let kickUserRef = usersRef.child(`${kickUsername}`);
            kickUserRef.remove();
        }
    }, [kickUsername]);

    return(
        <div>
            {modalShow && <KickModal selectedUser={selectedUser} setKickUsername={setKickUsername} modalShow={modalShow} onHide={() => setModalShow(false)}/>}
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
                                {buzzerLocked ? 'Reset' : 'Unlocked'}
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
                            <HostPlayerList data={userList} username={params.username} buzzedUser={buzz} setSelectedUser={setSelectedUser} setKickUsername={setKickUsername} setModalShow={setModalShow}/>
                        </div>
                    </Col>
                </Row>
                <Row style={{
                    height: "25%"
                }}>
                    <div className="text-center" style={{
                            padding: '0% 8% 5%'
                        }}>
                        <Log data={log}></Log>
                    </div>
                </Row>
            </Container>
        </div>
    )

}

export default HostRoom;