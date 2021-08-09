import React from 'react';

const RoomCode = ({id}) =>{
    return(
        <h1 style={{
            color: 'white',
            textAlign: 'center',
            margin: '10% 5% 5%'
        }}>{id.length > 0 ? `Your room code is ${id}.` : "Loading..."}</h1>
    )
}

export default RoomCode;