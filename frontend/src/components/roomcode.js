import React, { Component } from 'react';

class RoomCode extends React.Component{

    render(){
        console.log("Room code render()");
        return <h1 style={{
            color: 'white',
            textAlign: 'center',
            margin: '10% 5% 5%'
        }}>Your room code is {this.props.id}.</h1>
    };
    
}

export default RoomCode;