import React, { Component } from 'react';
import './Login.css';
import logo from '../codeeditorlogo.jpg';
import Fetcher from '../helpers/Fetcher';
// import axios from 'axios';

class NewRoom extends Component {
	constructor(){
		super()

    this.CreateRoomId=this.CreateRoomId.bind(this);


	}

  CreateRoomId(){

      let { username, roomname } = this.refs;
      // var username =  document.getElementById('username').value;
      // var roomname = document.getElementById('room').value;
      var str = roomname;
      var randomstr = str.trim().substr(0,3);
      var roomid=randomstr+""+Math.ceil(Math.random()*10000);
     // alert(randomstr+""+Math.ceil(Math.random()*10000));

      let response = Fetcher( "GET", 'http://localhost:8000/api/createroom', { user:username, room:roomid, roomname:roomname })
      if(response.data !== '0')
         window.location="/CodeEditor?room="+roomid;



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
          <input type="text" name="username" id="username" ref = 'username'/>
          <br/>
          <label>Room Name: </label>
          <input type="text" name="room" id="room" ref = 'roomname'/>
          <button className="loginbutton" onClick={this.CreateRoomId} >Create Room</button> 
          <br/>
        </div>
      </div>
    );
  }
}

export default NewRoom;
