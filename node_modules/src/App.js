import React, { Component } from 'react';
import './App.css';
import { Route,Redirect,Link,BrowserRouter as Router } from 'react-router-dom';
import Login from './Components/Login'
import CodeEditor from './Components/CodeEditor' 
import NewRoom from './Components/NewRoom'

class App extends React.Component {
	constructor(){
		super()

	}

  render() {

    return (
    	<Router>
    		<div>
    		<Route exact path="/" component={Login} />
    		<Route exact path="/CodeEditor" component={CodeEditor} />
    		<Route exact path="/NewRoom" component={NewRoom} />
       		</div>
       	</Router>
    );
  }
}

export default App;
