const express = require('express');
const app = express();

const WebSocketServer = require('websocket').server;

// middleware que maneja archivos estaticos => para poder enviar el 
//index.html de la carpeta public
app.use( express.static('public'));

//este es para el servidor http, y sirve para el handshake para poder usar websockets
let server = app.listen(3000, () => console.log('Server on port 3000'));

//este es para el servidor de websocket
let webSocketServer = new WebSocketServer({
    httpServer: server //necesita un servidor http para el handshake
});

//este arreglo es para guardar todas las conexiones existentes
let connections = [];

//el protocolo websocket esta basado en eventos
webSocketServer.on('request', function(request){
    console.log('Tenemos Visitas'); //este evento se debe de lanzar cuando se intente
    //iniciar una conexion websocket con nuestro servidor websocket

    //esto es para decir que si se acepta el upgrade a websocket
    let connection = request.accept('echo-protocol', request.origin);
    connections.push(connection); //agregar cada conexion nueva al arreglo

    //esto es para leer los mensajes del cliente
    connection.on('message', function(message){
        if(message.type == "utf8")
            broadcast(message.utf8Data); //cada mensaje nuevo hace llamado a la funcion broadcast
    });

    function broadcast(message){
        connections.forEach( c => {
            c.sendUTF(message);
        })
    }

    //esto es para enviar mensajes al cliente
    connection.sendUTF('Bienvenido');


});