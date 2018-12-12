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

app.get('/CreateRoom/createroom/',function(req,res){
	var roomid = req.query.room;
	var username = req.query.user;
    var roomname = req.query.roomname;
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


    dbo.collection("main").insertOne({user:username,roomid:roomid});
    dbo.collection("room").insertOne({roomid:roomid,roomname:roomname},function(err,result){

            if(err)
            {
                res.send("0");
            }
            else
            {
                res.send(roomid);
                console.log(roomid)
            }
    });
    

});

app.listen(80,function(){
	console.log("Listening...");
});