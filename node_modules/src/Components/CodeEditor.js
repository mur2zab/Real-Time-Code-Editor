import React, { Component } from 'react';
import './CodeEditor.css';
import axios from 'axios';
import opensocket from 'socket.io-client';
var str = window.location.href;
var room = str.split("=");
var projectName;
const socket = opensocket("http://localhost:8000");
class CodeEditor extends Component {

	constructor(){
		super()

    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.shareRoomid = this.shareRoomid.bind(this);

    socket.emit('join',room[1]);
     socket.on('output',function(data){
      document.getElementById('my_text').value=data;
    });

     // socket.on('users',function(data){
     //    console.log(data);
     //    document.getElementsByClassName("box").innerHTML ="<div>"+data+"</div><br />";
     // });

     socket.on('projectname',function(data){
      projectName=data;
        // document.getElementById('projname').value=data;
     });
	}

  handleChange(){
    var data = document.getElementById("my_text").value;
    socket.emit("message",{room:room[1],data:data});

    socket.on('output',function(data){

      if(data=="<" || data==">")
      {
        document.getElementById('my_text').innerHTML=data;
      }
      else
      {
        document.getElementById('my_text').style.color="red";
        document.getElementById('my_text').innerHTML = data;
      }
    });
  }

  shareRoomid(){
    document.getElementById('myModal').style.display="block";
  }

  closeModal(){
    document.getElementById('myModal').style.display="none";
  }


  render() {
    return (
    <div>
      <div className="firstdiv">
        <header class="header">
        <h1 class="header__h1" id="projname">Enjoy Coding!!!</h1>
        <button onClick={this.shareRoomid} id="share_btn">Share</button>
        </header>
        <textarea class="text_edit" id="my_text" onChange={this.handleChange} >
        </textarea>
        <div class="chat-box">
          <div class="open">Connected Users
            <div class="box">
              <br />
              <br />
            </div>
              </div>
        </div>
      </div>
      <div id="myModal" class="modal">
        <div class="modal-content">
        <span class="close" onClick={this.closeModal}>&times;</span>
        <p id="link">{str}<br/></p>
        <p>Copy the link and send it to your friends</p>
      </div>

    </div>

    </div>
    );
  }
}

export default CodeEditor;
