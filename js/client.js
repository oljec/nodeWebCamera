var socket = io('http://localhost:3051');


$(document).ready(function (){
    console.log('js connected');

    socket.on('imageServer', function (data) {
        $('.testData').html(data);
        //ctx.drawImage(data, 0, 0);
    });
});
