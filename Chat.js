var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); /* Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP) permet de 
    transformer les caractères spéciaux/réservés en code chiffré pour l'affichage et éviter de coder accidentellemnt
    Ex : < devient &lt*/

// Chargement de la page index.html
app.get('/', function (req, res) { //Renvoie la page Chat qui contient le html
  res.sendFile(__dirname + '/Chat.html');
});

// Erreur 404 si la page n'est pas trouvée
app.use(function(req, res, next){
    res.render('E404.ejs');
});

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo); //Récupère le pseudo et encode les caractères spéciaux si besoin
        socket.pseudo = pseudo; //Enregistre le pseudo comme variable de session
        socket.broadcast.emit('nouveau_client', pseudo); //Envoie à tous le monde l'info que qq'un s'est connecté
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message); //Récupère le message et encode les caractères spéciaux si besoin
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message}); /*Envoie le message à tous le 
        monde avec le pseudo de la personne qui l'a écrit*/
    }); 

    //Ajout 1 : message lors de la déconnexion
    socket.on('disconnect', function () { //Quand quelqu'un se déconnecte
        socket.broadcast.emit('deconnexion', socket.pseudo); /*Envoie le pseudo à tout le monde*/
    }); 
//Ne fonctionne pas
    //Ajout 2 : Changement de pseudo en cours de session
    socket.on('pseudo', function (pseudo) {
        pseudo0 = socket.pseudo; //Enregistre l'ancien pseudo
        pseudo = ent.encode(pseudo); //Récupère le pseudo et encode les caractères spéciaux si besoin tout en le changeant
        socket.broadcast.emit('pseudo', {pseudo: pseudo0, pseudo2: pseudo}); //Envoie les pseudos à tout le monde
    }); 
});

server.listen(8081);
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region Version "simple" qui fonctionne
/*
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'); /* Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP) permet de 
    transformer les caractères spéciaux/réservés en code chiffré pour l'affichage et éviter de coder accidentellemnt
    Ex : < devient &lt//

// Chargement de la page index.html
app.get('/', function (req, res) { //Renvoie la page Chat qui contient le html
    res.sendFile(__dirname + '/views/Chat.html');
  });
  
  // Erreur 404 si la page n'est pas trouvée
  app.use(function(req, res, next){
      res.render('E404.ejs');
  });
  
  io.sockets.on('connection', function (socket, pseudo) {
      // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
      socket.on('nouveau_client', function(pseudo) {
          pseudo = ent.encode(pseudo); //Récupère le pseudo et encode les caractères spéciaux si besoin
          socket.pseudo = pseudo; //Enregistre le pseudo comme variable de session
          socket.broadcast.emit('nouveau_client', pseudo); //Envoie à tous le monde l'info que qq'un s'est connecté
      });
  
      // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
      socket.on('message', function (message) {
          message = ent.encode(message); //Récupère le message et encode les caractères spéciaux si besoin
          socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message}); /*Envoie le message à tous le 
          monde avec le pseudo de la personne qui l'a écrit//
      });
  });
  
  server.listen(8080);
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
