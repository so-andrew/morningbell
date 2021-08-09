import React, { useState, useEffect } from "react";
import { Form, FormGroup, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const axios = require('axios').default;
axios.defaults.baseURL = 'https://us-central1-buzzer-app-a1303.cloudfunctions.net/app';

const JoinRoom = (params) =>{
    const history = useHistory();

    const [usernameTaken, setUsernameTaken] = useState(false);
    const [roomCodeErrorDisplay, setRoomCodeErrorDisplay] = useState(false);
    const [emptyUsernameErrorDisplay, setEmptyUsernameErrorDisplay] = useState(false);
    const [success, setSuccess] = useState(false);
    params.setInvalidID(true);

    async function handleSubmit(event){
        event.preventDefault();
        setSuccess(false);
        if(params.username.length > 0){
            joinRoomAPI();
        }
        else setEmptyUsernameErrorDisplay(true);
    }

    useEffect(() => {
        if(success){
            history.push(`room/${params.id}`);
        }
    }, [success]);

    async function joinRoomAPI(){
        axios.post('/api/join', {
            user: params.username,
            code: params.id
        })
        .then((res) => {
            // Handle the success case
            console.log(res);
            setSuccess(true);
            params.setInvalidID(false);
        })
        .catch((err) => {
            if(err.response.status === 403){
                // Show "Username is taken" error
                console.log("Uh-oh, this name is already taken");
                setUsernameTaken(true);
            } 
            else if(err.response.status === 404){
                // Show "Room does not exist" error
                console.log("Uh-oh, this room does not exist");
                params.setInvalidID(true);
                setRoomCodeErrorDisplay(true);
            }
            else console.log("Why are we here?");
        })
    }

    function handleUsernameChange(event){
        params.setUsername(event.target.value);
        setUsernameTaken(false);
        setEmptyUsernameErrorDisplay(false);
    }

    function handleRoomCodeChange(event){
        params.setID(event.target.value.toUpperCase());
        params.setInvalidID(true);
        setRoomCodeErrorDisplay(false);
    }

    return(
        <div>
            <Container fluid="sm">
                <Row>
                    <Col>
                        <h1 style={{
                            color: 'white',
                            textAlign: 'center',
                            margin: '10% 0em 1em'
                        }}>Welcome to Morningbell.</h1>
                        <h5 style={{
                            color: 'white',
                            textAlign: 'center',
                            margin: '1em 2em 1em'
                        }}>Please choose a unique username.</h5>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={true} sm={true} md={5} lg={4} style={{
                        margin: '0% 5% 0%'
                    }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className="mb-3" controlId="formGroupUsername">
                                <Form.Label style={{
                                    color: 'white'
                                }}>
                                    Username
                                </Form.Label>
                                <Form.Control type="text" placeholder="Enter username" autoComplete="off" autoCorrect="off" onChange={handleUsernameChange}></Form.Control>
                                {usernameTaken && <Alert variant="danger" style={{
                                    margin: '5% 0% 0%'
                                }}>This username has been taken.</Alert>}
                                {emptyUsernameErrorDisplay && <Alert variant="danger" style={{
                                    margin: '5% 0% 0%'
                                }}>Please enter a username.</Alert>}
                            </FormGroup>
                            <FormGroup className="mb-3" controlId="formGroupId">
                                <Form.Label style={{
                                    color: 'white'
                                }}>
                                    Room Code
                                </Form.Label>
                                <Form.Control type="text" placeholder="Enter room code" autoComplete="off" autoCorrect="off" autoCapitalize="on" onChange={handleRoomCodeChange}/>
                                {roomCodeErrorDisplay && <Alert variant="danger" style={{
                                    margin: '5% 0% 0%'
                                }}>No such room exists.</Alert>}
                            </FormGroup>
                            <div className="text-center">
                                <Button as='input' type="submit" value="Submit"/>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default JoinRoom;