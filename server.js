const express = require("express");
require ('dotenv').config ();
const path = require("path");
const port = process.env.PORT || 2233;
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
	socket.on("newuser",function(username){
		socket.broadcast.emit("update", username + " joined the conversation");
	});
	socket.on("exituser",function(username){
		socket.broadcast.emit("update", username + " left the conversation");
	});
	socket.on("chat",function(message){
		socket.broadcast.emit("chat", message);
	});
});

server.listen(port, (req, res) => {
    console.log("hi")
});