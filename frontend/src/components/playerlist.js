import React from 'react';
import { ListGroup } from 'react-bootstrap';

const PlayerList = ({data, username, host, buzzedUser}) =>{
    return(
        <div>
            <h4 style={{
                color: 'white',
                padding: '0% 0% 2%'
            }}>Players</h4>

            <div style={{
                overflowY: 'auto',
                height: '20vh'
            }}>
                <ListGroup>
                    <ListGroup.Item variant="dark" style={{
                        color: 'white',
                        backgroundColor: username === buzzedUser ? '#dc3545' : '#1787FF',
                        outlineColor: '#212529',
                        textAlign: 'left'
                    }}><b>{username}</b></ListGroup.Item>
                    { buzzedUser && buzzedUser.length > 0 && buzzedUser !== username && <ListGroup.Item variant="dark" style={{
                        color: 'white',
                        backgroundColor: '#dc3545',
                        outlineColor: '#212529',
                        textAlign: 'left'
                    }}><b>{buzzedUser}</b>
                        </ListGroup.Item>
                    }
                    { buzzedUser && buzzedUser.length > 0 && data.filter(e => e !== username && e !== buzzedUser).sort().map(element => {
                        return( 
                            <ListGroup.Item action variant="dark" style={{
                                color: 'white',
                                backgroundColor: '#202830',
                                outlineColor: '#212529',
                                textAlign: 'left'
                            }}>
                                <b>{element}</b>
                            </ListGroup.Item>
                        );
                    })}
                    { !buzzedUser && buzzedUser.length === 0 && data.filter(e => e !== username).sort().map(element => {
                        return <ListGroup.Item variant="dark" style={{
                            color: 'white',
                            backgroundColor:'#202830',
                            outlineColor: '#212529',
                            textAlign: 'left'
                        }}><b>{element}</b>{element === host && <i style={{
                            color: 'gray'
                        }}> (Host)</i>}</ListGroup.Item>
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default PlayerList;