var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017";
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket_id;
var history=[];
var client=[];
var room,dbo;
var i = 0;


//Set up Mondoclient to the required database
MongoClient.connect(url,function(err,db){
	useNewUrlParser: true;
	if(err) throw err;
	dbo =db.db("rl_code_editor");
});



io.set('origins', 'http://localhost:3000'); // Setting for CORS

io.on('connection',function(socket){	
	console.log("Connection Established");

	socket.on("join",function(data){ //joining a particular room for sharing
		room=data;
		// dbo.collection("")
		console.log("Joined room"+room)
		socket.join(data);
		if(history.length>0)
		socket.emit('output',history);//displaying the old code to the newly joined user

		// dbo.collection("main").find({roomid:room}).then(function(result){
		// 	socket.emit('projectname',result.users);
		// 	console.log(result.roomname);
		// });

	});

	socket.on('disconnect',function(){
		socket.leave(room);
		console.log("Connection disconnected");	
	});

	socket.on('message',function(msg){

		history=[];
		history.push(msg.data); 
		console.log("sending to "+msg.room+"=="+msg.data)
			io.to(msg.room).emit('output',msg.data);
			// io.sockets.emit('output', msg);
		});

	
}); //End of io connection 

http.listen(8000,function(){
	console.log("Listening (main)....");
});

