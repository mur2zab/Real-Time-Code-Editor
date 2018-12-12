import React, { Component } from 'react';
import './Login.css';
import logo from '../codeeditorlogo.jpg';
import axios from 'axios';

class Login extends Component {
	constructor(){
		super()

    this.EnterRoom =this.EnterRoom.bind(this);
    this.CreateRoom =this.CreateRoom.bind(this);

	}

  EnterRoom(){
    var roomid=document.getElementById('room').value;
    var username =document.getElementById('username').value
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
              window.location="/CodeEditor?room="+response.data.roomid;
            }
            else
            {
              console.log("room does not exist");
            }
           });
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
        <input type="text" name="username" id="username"/>
        <br/>
        <label>Room Id: </label>
        <input type="text" name="room" id="room"/>
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
