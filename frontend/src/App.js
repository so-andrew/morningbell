import logo from './logo.svg';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import MenuBar from './components/navbar';
import Landing from './components/landing';
import Footer from './components/footer';
import CreateRoom from './components/createroom';
import './App.css';



function App(){
	const [id, setId] = useState('');

	function handleChange(newValue){
		setId(newValue);
	}

	return(
    	<Router>
			<MenuBar/>
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
						<CreateRoom id={id}/>
					</Route>
					<Route exact path="/join">
						
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
