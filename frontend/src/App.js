import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import app from './firebase'
import { getAuth, signInAnonymously } from 'firebase/auth';

import MenuBar from './components/navbar';
import Landing from './components/landing';
import CreateRoom from './components/createroom';
import JoinRoom from './components/joinroom';
import PlayerRoom from './components/playerroom';
import HostRoom from './components/hostroom';
import NotFound from './components/notfound';
import './App.css';

function App(){
	const [id, setID] = useState('');
	const [username, setUsername] = useState('');
	//const [user, setUser] = useState()
	const [invalidID, setInvalidID] = useState(true);

	const auth = getAuth(app);
	signInAnonymously(auth).catch((error) => {
		console.log(error.code, error.message)
	})

	useEffect(() => {
		if(JSON.parse(window.localStorage.getItem('username'))){
			setUsername(JSON.parse(window.localStorage.getItem('username')));
		}
		// if(JSON.parse(window.localStorage.getItem('id'))){
		// 	setID(JSON.parse(window.localStorage.getItem('id')));
		// }
		if(JSON.parse(window.localStorage.getItem('invalidID'))){
			setInvalidID(JSON.parse(window.localStorage.getItem('invalidID')));
		}
		//console.log(invalidID);
		//console.log(JSON.parse(window.localStorage.getItem('invalidID')));
	}, []);

	useEffect(() => {
		document.body.style.backgroundColor = '#212529';
	}, []);

	useEffect(() => {
		window.localStorage.setItem('username', JSON.stringify(username));
		window.localStorage.setItem('id', JSON.stringify(id));
		window.localStorage.setItem('invalidID', JSON.stringify(invalidID));
	}, [username, id, invalidID]);

	function handleChange(newValue){
		setID(newValue);
	}

	return(
    	<Router>
			<MenuBar id={id} invalidID={invalidID}/>
			<div className="Content" 
				style={{
					backgroundColor: '#212529',
					height: '100vh'
					}}>
				<Switch>
					<Route exact path="/">
						<Landing id={id} onChange={handleChange}/>
					</Route> 
					<Route exact path="/create">
						<CreateRoom username={username} setUsername={setUsername} id={id} setID={setID} invalidID={invalidID} setInvalidID={setInvalidID}/>
					</Route>
					<Route exact path="/join">
						<JoinRoom username={username} setUsername={setUsername} id={id} setID={setID} invalidID={invalidID} setInvalidID={setInvalidID}/>
					</Route>
					<Route path="/room/:id">
						<PlayerRoom username={username} setID={setID} setInvalidID={setInvalidID}/>
					</Route>
					<Route path="/host/:id">
						<HostRoom username={username} setID={setID} setInvalidID={setInvalidID}/>
					</Route>
					<Route exact path="/404">
						<NotFound/>
					</Route>
				</Switch>
			</div>
    	</Router>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
