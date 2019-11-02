import React, { Component } from 'react';
import './Login.css';
import logo from '../codeeditorlogo.jpg';
import Fetcher from '../helpers/Fetcher';
// import axios from 'axios';

class Login extends Component {
	constructor(){
		super()
    this.state = {
      username: '',
      roomId:  ''
    }
    this.EnterRoom =this.EnterRoom.bind(this);
    this.CreateRoom =this.CreateRoom.bind(this);

	}

  async EnterRoom(){
    try{
      var roomid= this.state.roomId;
      var username= this.state.username;
      let respone = await Fetcher('GET', 'http://localhost:8000/api/checkroom', { username: username, room: roomid } );
      if(!response)
        alert('No such room id found');
    }catch(err){
      alert("Some Error Occured")
    }
}



  CreateRoom(){
    window.location="/NewRoom";

  }



  render() {
    return (
     <div className="Login">
        <header className="Login-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">RT Code Editor</h1>
        </header>
        <br/><br/><br/>
     
      <div className="formbackground">
        <label>Username: </label>
        <input type="text" name="username" id="username" onChange = {(text)=> this.setState({"username" : text})} />
        <br/>
        <label>Room Id: </label>
        <input type="text" name="room" id="room" onChange = {(text)=> this.setState({"roomId" : text})} />
        <button className="loginbutton" onClick={this.EnterRoom} >Login</button> 
        <br/>
       
        <label> Dont have a room?  </label>

        <button className="createroombtn" onClick={this.CreateRoom} >Create One</button>
        </div>
      </div>
    );
  }
}

export default Login;
