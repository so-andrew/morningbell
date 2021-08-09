import { Container, Row, Col } from 'react-bootstrap';
import Footer from './footer';
import CreateRoomButton from './createroombutton';
import JoinRoomButton from './joinroombutton';

function Landing(){
    return(
        <div style={{
            height: "100vh",
        }}>
            <Container fluid="sm" style={{
                height: '100%'
            }}>
                <Row className="d-flex align-items-center" style={{
                    height: '100vh'
                }}>
                    <Col className="d-flex align-items-center" xs={12} sm={12} md={12} lg={6} style={{
                        height: '50vh'
                    }}>
                        <div className="splash">
                            <h1 style={{
                                color: "white",
                                textAlign: "center",
                                margin: '0em 2em 0em'
                            }}>
                            A buzzer app for the masses.
                            </h1>
                            <h5 style={{
                                color: "white",
                                textAlign: "center",
                                margin: '1em 2em 0em'
                            }}>Create private lobbies for your friends to join, or join an existing lobby with the provided room code.</h5>
                        </div>
                    </Col>
                    {/* <Col lg='align-items-center'>
                        <div className='d-grid gap-2' style={{
                            margin: '0% 5% 0%'
                        }}>
                            <CreateRoomButton/>
                            <JoinRoomButton/>
                        </div>
                    </Col> */}

                    <Col xs={12} sm={12} md={12} lg={6} style={{
                        height: '50vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Row style={{
                                paddingTop: '0%',
                                paddingBottom: '5%',
                                paddingLeft: '25%',
                                paddingRight: '25%'
                            }}>
                                <CreateRoomButton/>
                            </Row>
                            <Row style={{
                                paddingTop: '0%',
                                paddingBottom: '0%',
                                paddingLeft: '25%',
                                paddingRight: '25%'
                            }}>
                                <JoinRoomButton/>
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