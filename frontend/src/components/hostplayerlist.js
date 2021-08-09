import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';

const HostPlayerList = ({data, username, buzzedUser, setSelectedUser, setModalShow}) =>{

    function handleClick(element){
        setSelectedUser(element);
        setModalShow(true);
    }

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
                        backgroundColor: '#202830',
                        outlineColor: '#212529',
                        textAlign: 'left'
                    }}><b>{username}</b><i style={{
                        color: 'gray'
                    }}> (You)</i></ListGroup.Item> 
                    { buzzedUser && buzzedUser.length > 0 && <ListGroup.Item variant="dark" style={{
                        color: 'white',
                        backgroundColor: '#dc3545',
                        outlineColor: '#212529',
                        textAlign: 'left'
                    }} onClick={() => handleClick(buzzedUser)}><b>{buzzedUser}</b>
                        </ListGroup.Item>
                    }
                    { buzzedUser && buzzedUser.length > 0 && data.filter(e => e !== username && e !== buzzedUser).sort().map(element => {
                        return( 
                            <ListGroup.Item action variant="dark" style={{
                                color: 'white',
                                backgroundColor: '#202830',
                                outlineColor: '#212529',
                                textAlign: 'left'
                            }} onClick={() => handleClick(element)}>
                                <b>{element}</b>
                            </ListGroup.Item>
                        );
                    })}
                    { !buzzedUser && buzzedUser.length === 0 && data.filter(e => e !== username).sort().map(element => {
                        return( 
                            <ListGroup.Item action variant="dark" style={{
                                color: 'white',
                                backgroundColor: '#202830',
                                outlineColor: '#212529',
                                textAlign: 'left'
                            }} onClick={() => handleClick(element)}>
                                <b>{element}</b>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
    );
}

export default HostPlayerList;