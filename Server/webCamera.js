var express = require('express');
var app = express();

var http = require('http');
var io = require('socket.io');

var server = http.createServer(app);
io = io.listen(server);

var port = 3051;


io.on('connection', function (socket){
    socket.on('clientCamera', function(data){
        //console.log("Image from clientCamera received");
        var imageToSend = "<img src='" + data["text"] + "'/>";
        io.sockets.emit('imageServer', imageToSend);
    });

    socket.on('clientCameraStart', function(){
        console.log('Data transferring was begun');
    });
    socket.on('clientCameraStop', function(){
        console.log('Data transferring was stopped');
    });
});

server.listen(port, function(){
    console.log("server ready on port " + port);
});