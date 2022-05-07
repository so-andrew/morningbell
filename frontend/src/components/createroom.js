import React, { useState, useEffect } from "react";
import { Form, FormGroup, Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import RoomCode from './roomcode';
const axios = require('axios').default;
axios.defaults.baseURL = 'https://us-central1-buzzer-app-a1303.cloudfunctions.net/app';

/*class CreateRoom extends React.Component{

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
                                <Button variant="primary" type="submit"> onClick={() => this.handleClick(`room/${this.state.id}`)}>Submit</Button>
                            </div>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }
}*/

function CreateRoom(params){
    //const [id, setID] = useState("");
    //const [username, setUsername] = useState("");
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    function handleSubmit(event){
        event.preventDefault();
        hostJoinAPI();
    }

    async function hostJoinAPI(){
        axios.post('/api/hostjoin', {
            user: params.username,
            code: params.id
        })
        .then((res) => {
            console.log(res);
            setSuccess(true);
        })
        .catch((err) => {
            console.log(err);
            setSuccess(false);
        });
    } 
        
    function getRoomIDFromAPI(){
        axios.post('/api/create')
        .then((res) => {
            //console.log(res);
            params.setID(res.data);
            params.setInvalidID(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }


    function handleUsernameChange(event){
        params.setUsername(event.target.value);
    }

    useEffect(() => {
        (() => {
            getRoomIDFromAPI();
        })()
    }, []);

    useEffect(() => {
        if(success){
            history.push(`host/${params.id}`);
        }
    }, [success]);


    return(
        <div>
            <Container fluid="sm">
                <Row>
                    <Col>
                        <RoomCode id={params.id}></RoomCode>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={true} sm={true} md={4} lg={4} style={{
                        margin: '0% 5% 0%'
                    }}>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup className= "mb-3" controlId="formGroupUsername">
                                <Form.Label style={{
                                    color: 'white'
                                }}>
                                    Username
                                </Form.Label>
                                <Form.Control type="text" placeholder="Enter username" autoComplete="off" autoCorrect="off" onChange={handleUsernameChange}/>
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

export default CreateRoom;