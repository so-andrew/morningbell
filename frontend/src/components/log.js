import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Log = ({data}) =>{
    return(
        <div>
            <h4 style={{
                color: 'white',
                padding: '5% 0% 2%', textAlign: 'center'
            }}>Event Log</h4>
            <div style={{
                overflowY: 'auto',
                height: 'inherit'
            }}>
                <ListGroup>
                    { data.map(element => {
                        return(
                            <ListGroup.Item variant="dark" style={{
                                color: 'white',
                                backgroundColor: '#202830',
                                outlineColor: '#212529',
                                textAlign: 'left'
                            }}>{new Date(element.timestamp).toLocaleTimeString('en-us', { hour12: false })} : {element.content}</ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </div>
        </div>
        
    )
}

export default Log;