import React, { useState, useEffect } from "react";
import { Form, FormGroup, Container, Row, Col, Button } from "react-bootstrap";
import RoomCode from './roomcode';
import { firebase } from 'firebase/app';
import "firebase/database";
const path = require('path');
require('dotenv').config();
const axios = require('axios').default;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAbOap5gMiSzggGlbRTxE0_4USyqDRPmY",
    authDomain: "buzzer-app-a1303.firebaseapp.com",
    databaseURL: "https://buzzer-app-a1303-default-rtdb.firebaseio.com",
    projectId: "buzzer-app-a1303",
    storageBucket: "buzzer-app-a1303.appspot.com",
    messagingSenderId: "616565277813",
    appId: "1:616565277813:web:3a02c5f85c59c4a642a43c",
    measurementId: "G-W3590EGGHE"
  };


class CreateRoom extends React.Component{
    
    constructor(props){
        super(props);
        this.state = { id: "" };
    }

    getRoomIDFromAPI(){
        axios.post('http://localhost:3001/api/create')
            .then((res) => {
                console.log(res);
                this.setState({ id: res.data })
                //return res.data;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount(){
        this.getRoomIDFromAPI();
    }

    render(){
        return(
            <div>
                <Container fluid="sm">
                    <Row>
                        <Col>
                            <RoomCode id={this.state.id}></RoomCode>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs={true} sm={true} md={4} lg={4}>
                            <Form>
                                <FormGroup className= "mb-3" controlId="formGroupUsername">
                                    <Form.Label style={{
                                        color: 'white'
                                    }}>
                                        Username
                                    </Form.Label>
                                    <Form.Control type="text" placeholder="Enter username"/>
                                </FormGroup>
                            </Form>
                            <div className="text-center">
                                <Button variant="primary" type="submit">Submit</Button>
                            </div>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }
}

export default CreateRoom;