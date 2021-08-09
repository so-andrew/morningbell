import React from 'react'

const NotFound = () => {
    return(
        <div style={{
            color: 'white', 
            textAlign: 'center', 
            padding: '0% 5% 0%',
            display: "flex",
            flexDirection: "column",
            alignItems: 'center'
        }}>
            <h1 style={{
                padding: '5% 0% 2%'
            }}>😢</h1>
            <h1 style={{
                padding: '0% 0% 2%'
            }}>Something went wrong!</h1>
            <p>The room you are trying to access could not be found. Click <a href='/'>here</a> to go back home.</p>
        </div>
    );
}

export default NotFound;