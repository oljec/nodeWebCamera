var socket = io('http://localhost:3051');


$(document).ready(function (){
    console.log('js connected');
    var canSendData = false;

    var video = document.querySelector("#vid"),
        canvas = document.querySelector('#canvas'),
        ctx = canvas.getContext('2d'),
        localMediaStream = null,
        onCameraFail = function (e) {
            console.log('Camera did not work.', e); // Исключение на случай, если камера не работает
        };
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia({video: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
    }, onCameraFail);

    cameraInterval = setInterval(function(){ snapshot();}, 100);
    function snapshot(){
        //console.log(123);
        if(localMediaStream){
            ctx.drawImage(video, 0, 0, 420, 300);
        }

        console.log(ctx.canvas.toDataURL("image/jpeg", 0.5).length);

        if (canSendData) {
            var dataToSend = {
                p: "new",
                text: ctx.canvas.toDataURL("image/jpeg", 0.5)
                //text: "test"
            };

            socket.emit('clientCamera', dataToSend);
        }
    }

    $('#startStream').click(function(){
        //startBroadcasting();
        canSendData = true;
        console.log('Data transferring is beginning');
        socket.emit('clientCameraStart');
    });
    $('#stopStream').click(function(){
        //stopBroadcasting();
        canSendData = false;
        console.log('Data transferring stopped');
        socket.emit('clientCameraStop');
    });

});