import React, { Component } from 'react';
import logo from './codeeditorlogo.jpg';
import './App.css';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Route,Redirect,Link,BrowserRouter as Router } from 'react-router-dom';
import { CodeEditor } from '/CodeEditor/CodeEditor'
//do something...
//import opensocket from 'socket.io-client';
//const socket = opensocket('http://localhost:8080');
export const history = createBrowserHistory();

class App extends React.Component {
	constructor(){
		super()

		this.EnterRoom =this.EnterRoom.bind(this);
		this.CreateRoom =this.CreateRoom.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);

		
		this.state = {
        	redirect: false
     	}
	}


	EnterRoom(){
		var roomid=document.getElementById('room').value;
		var username =document.getElementById('username').value
		var logindata = {userid:username,roomid:roomid}
		console.log(logindata);
		axios({
  				method: 'get',
    			url: 'http://localhost:8080/CreateRoom/checkroom',
    			params:{
    				user:username,
    				room:roomid
    			},
    				}).then(response=>{
    				console.log(response);
    				if(response.data!==0 )
    				{

    					//window.open("http://localhost:3000/CodeEditor/CodeEditor.js")
    					//browserHistory.push('/CodeEditor/CodeEditor')
    					this.handleRedirect();
    					//this.props.history.push("/CodeEditor/CodeEditor"+response.data.roomid);
    					//this.props.history.push('./index?'+response.data.roomid);

    					//window.location.href="http://localhost/CodeEditor/Cod"
    				}
    				else
    				{
    					console.log("room does not exist");
    				}
    			 });
	}



	CreateRoom(){

	}


	handleRedirect(){
		
		<CodeEditor />
		//this.setState({ redirect: true })
	}


  render() {

  	// const { from } = this.props.location.state || { from: { pathname: '/' } }
      /*const { redirect } = this.state;
  
      if (redirect) {
        return (
          <Redirect to={CodeEditor} />
        )

        <Router>
        <Route path="/CodeEditor/CodeEditor" component={CodeEditor} />
      </div>
      </Router>
      }*/


    return (
    	
    	<Router>
      <div className="App">
        <header className="App-header">
          	<img src={logo} className="App-logo" alt="logo" />
          	<h1 className="App-title">RT Code Editor</h1>
        </header>
       	<br/><br/><br/>
     
     	<div className="formbackground">
       	<label>Username: </label>
       	<input type="text" name="username" id="username"/>
       	<br/>
       	<label>Room Id: </label>
       	<input type="text" name="room" id="room"/>
       	<button className="loginbutton" onClick={this.EnterRoom} >Login</button> 
       	<br/>
       
       	<label> Dont have a room?  </label>

       	<button className="createroombtn" onClick={this.CreateRoom} >Create One</button>
       	</div>
       	<Route path="/CodeEditor" component={CodeEditor} />
       	<Route history={history} />
       	</div>
       	</Router>
    );
  }
}

export default App;
