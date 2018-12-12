import React, { Component } from 'react';
import './Login.css';
import logo from '../codeeditorlogo.jpg';
import axios from 'axios';

class NewRoom extends Component {
	constructor(){
		super()

    this.CreateRoomId=this.CreateRoomId.bind(this);


	}

  CreateRoomId(){

      var username = document.getElementById('username').value;
      var roomname = document.getElementById('room').value;
      var str = document.getElementById('room').value;
      var randomstr = str.trim().substr(0,3);
      var roomid=randomstr+""+Math.ceil(Math.random()*10000);
     // alert(randomstr+""+Math.ceil(Math.random()*10000));

      axios({
          method: 'get',
          url: 'http://localhost:80/CreateRoom/createroom',
          params:{
            user:username,
            room:roomid,
            roomname:roomname
          },
            }).then(response=>{
            console.log(response);
            if(response.data!=="0")
            {
              window.location="/CodeEditor?room="+roomid;
            }
            else
            {
              console.log("Error in creating room");
            }
           });



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
        <label>Room Name: </label>
        <input type="text" name="room" id="room"/>
        <button className="loginbutton" onClick={this.CreateRoomId} >Create Room</button> 
        <br/>
        </div>
      </div>
    );
  }
}

export default NewRoom;
