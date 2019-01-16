//Utilise socket.io pour un conversation directe et continue entre client et serveur
var http = require('http');  //Inclut la bibliothèque http(pour la création du serveur web)
var fs = require('fs'); //Inclut la bibliothèque fs qui permet de gérer les fichier (fs short for filestream?)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

//Quand le client se connecte, un pop up apparait sur le navigateur
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !'); //Broadcast à tous les clients

    socket.on('petit_nouveau', function(pseudo) { //Quand petit_nouveau est envoyé par le client
        socket.pseudo = pseudo; //On sauvegarde le pseudo dans la variable de session
    });

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message); //On a modifié la fonction pour qu'elle affiche le pseudo à la place de quelqu'un
    });	
});

server.listen(8080);
//#region v_1 Connexion avec socket.io
/*
//On ne s'attend qu'à un type de message 
var http = require('http');  //Inclut la bibliothèque http(pour la création du serveur web)
var fs = require('fs'); //Inclut la bibliothèque fs qui permet de gérer les fichier (fs short for filestream?)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_2 Réception client Envoi serveur
/*
var http = require('http');  //Inclut la bibliothèque http(pour la création du serveur web)
var fs = require('fs'); //Inclut la bibliothèque fs qui permet de gérer les fichier (fs short for filestream?)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

//Quand le client se connecte, un pop up apparait sur le navigateur
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');
});

server.listen(8080);
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_3 Réception serveur Envoi client
/*
var http = require('http');  //Inclut la bibliothèque http(pour la création du serveur web)
var fs = require('fs'); //Inclut la bibliothèque fs qui permet de gérer les fichier (fs short for filestream?)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

//Quand le client se connecte, un pop up apparait sur le navigateur
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });	
});
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_4 Plusieurs clients : broadcast et variables de session
/*
//Il est conseillé d'utiliser session.socket.io pour gérer les variables de session. On ne le fait pas ici
var http = require('http');  //Inclut la bibliothèque http(pour la création du serveur web)
var fs = require('fs'); //Inclut la bibliothèque fs qui permet de gérer les fichier (fs short for filestream?)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

//Quand le client se connecte, un pop up apparait sur le navigateur
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !'); //Broadcast à tous les clients

    io.socket.on('petit_nouveau', function(pseudo) { //Quand petit_nouveau est envoyé par le client
        socket.pseudo = pseudo; //On sauvegarde le pseudo dans la variable de session
    });

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message); //On a modifié la fonction pour qu'elle affiche le pseudo à la place de quelqu'un
    });	
});

server.listen(8080);
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_1 Connexion avec socket.io
/*

*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
