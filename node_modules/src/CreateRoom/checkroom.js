var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url="mongodb://localhost:27017";


MongoClient.connect(url,function(err,db){
	if(err) throw err;
	dbo =db.db("rl_code_editor");
});

app.use(function(req,res,next){ // For Cross Allowing Cross Origin Transfers (Among different ports)
	res.append('Access-Control-Allow-Origin', ['*']);
   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.append('Access-Control-Allow-Headers', 'Content-Type');
   next();
})

app.get('/CreateRoom/checkroom/',function(req,res){
	var roomid = req.query.room;
	var username = req.query.user;
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
    dbo.collection("main").findOne({roomid:roomid}).then(function(result){
    	if(result!==null)
    	{
    		res.send(result);
    		var data = {users:username,roomid:roomid}
    		/*dbo.collection("main").insertOne(data,function(err,res){
    			console.log("Document Added"+data);
    		});*/
    	}
    	else
    		res.send("0");
    });

    
    
});

app.listen(8080,function(){
	console.log("Listening...");
});