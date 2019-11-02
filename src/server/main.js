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
		console.log("Joined room"+data)
		socket.join(data);
		if(history.length>0)
		socket.emit('output',history);//displaying the old code to the newly joined user
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
	});	
}); //End of io connection 


app.use(function(req,res,next){ // For Cross Allowing Cross Origin Transfers (Among different ports)
	res.append('Access-Control-Allow-Origin', ['*']);
   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.append('Access-Control-Allow-Headers', 'Content-Type');
   next();
})

app.get('/api/checkroom/',async function(req,res){
	try{
		var roomid = req.query.room;
		var username = req.query.user;
		let response = await dbo.collection("main").findOne({roomid:roomid})
		if(_.isEmpty(response))
			return response
		return false
	}catch(err){
		throw err;
	}
});


app.get('/api/createroom/',async function(req,res){

	try{
		var roomid = req.query.room;
		var username = req.query.user;
		var roomname = req.query.roomname;
		
		await dbo.collection("main").insertOne({user:username,roomid:roomid});
		return await dbo.collection("room").insertOne({roomid:roomid,roomname:roomname});
	}catch(err){
		throw err
	}
	
});

http.listen(8000,function(){
	console.log("Listening (main)....");
});

