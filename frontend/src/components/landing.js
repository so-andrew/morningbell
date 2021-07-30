import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Footer from './footer';
import CreateRoomButton from './createroombutton';
import JoinRoomButton from './joinroombutton';
const axios = require('axios').default;

function Landing(props){
    return(
        <div style={{
            height: "100vh",
        }}>
            <Container fluid="sm" style={{
                height: '100%'
            }}>
                <Row className="justify-content-sm-center">
                    <Col lg>
                        <div className="splash">
                            <h1 style={{
                                color: "white",
                                textAlign: "center",
                                margin: '10% 5% 10%'
                            }}>
                            A buzzer app for the masses.
                            </h1>
                            <h5 style={{
                                color: "white",
                                textAlign: "center",
                                margin: '2% 5% 10%'
                            }}>Create private lobbies for your friends to join, or join an existing lobby with the provided room code.</h5>
                        </div>
                    </Col>
                    <Col lg='align-items-center'>
                        <Row style={{
                            paddingTop: '2%',
                            paddingBottom: '1%',
                        }}>
                            <div className="text-center">
                                <CreateRoomButton/>
                            </div>
                        </Row>
                        <Row style={{
                            paddingTop: '1%',
                            paddingBottom: '2%'
                        }}>
                            <div className="text-center">
                                <JoinRoomButton/>
                            </div>
                        </Row>
                    </Col>
                </Row>
                {/* <Row className="justify-content-center" style={{
                    paddingTop: '2%',
                    paddingBottom: '1%',
                    }}>
                    <Col className="justify-content-center">
                        <div className="text-center">
                            <Button variant="primary" size="lg">
                                Create Room
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center" style={{
                    paddingTop: '1%',
                    paddingBottom: '2%'
                    }}>
                    <Col>
                        <div className="text-center">
                            <Button variant="secondary" size="lg">
                                Join Room
                            </Button>
                        </div>
                    </Col>
                </Row> */}
            </Container>
        </div>
    )
}

export default Landing;