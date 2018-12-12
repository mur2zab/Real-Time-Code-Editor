import React, { Component } from 'react';
import './CodeEditor.css';
//import axios from 'axios';
//import opensocket from 'socket.io-client';
//const socket = opensocket('http://localhost:8080');


class CodeEditor extends Component {
	constructor(){
		super()

	}
  render() {
    return (
      <div>
     <header class="header">
      <h1 class="header__h1">Online Collab Edit</h1>
    </header>
    <div class="doc">
      <div class="doc__background-ribbon"></div>
      <div class="doc__text-editor hidden"></div>
    </div>
    </div>
    );
  }
}

export default CodeEditor;
