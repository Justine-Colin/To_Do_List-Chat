//Crée un serveur http

var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon

var app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.use(function(req, res){ // Répond enfin
    res.send('Hello');
});

app.listen(8080);

//#region v_1 Création d'un serveur basique qui renvoie un message unique peut importe la requête
/* 
var http = require('http'); //Inclut la bibliothèque http(pour la création du serveur web)

var server = http.createServer(function(req, res) { //crée le serveur avec en paramètre la fonction qui réagit à la connexion au serveur (callback)
    //req = requete du client (url, info envoyées,...)          res = réponse du serveur (souvent page html)
  res.writeHead(200); //renvoie le code 200 (ok)
  res.end('Salut tout le monde !'); //finit la réponse en envoyant un message de notre choix
});
server.listen(8080); //Lance le serveur sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_2 Affichage avec pseudo-html
/* 
var http = require('http'); //Inclut la biblithèque http(pour la création du serveur web)

var server = http.createServer(function(req, res) { 
  res.writeHead(200, {"Content-Type":"text/html"});     //prévient que ce sera du html
  res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>'); //renvoie une "page html"
});
server.listen(8080); //Lance le serveur sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_3 Affichage d'une vraie page html
/* 
var http = require('http'); //Inclut la biblithèque http(pour la création du serveur web)

var server = http.createServer(function(req, res) { //crée le serveur avec en paramètre la fonction qui réagit à la connexion au serveur (callback)
    res.writeHead(200, {"Content-Type": "text/html"}); //prévient que ce sera du html
    res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Ma page Node.js !</title>'+
'    </head>'+ 
'    <body>'+
'     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
'    </body>'+
'</html>'); //Renvoie une vraie page html
    res.end();
});
server.listen(8080); //Lance le serveur sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_4 Utilisation d'urls
/* 
var http = require('http'); //Inclut la biblithèque http(pour la création du serveur web)
var url = require('url'); //Inclut la bibliothèsue pour manipuler les urls

function(req, res) { //crée le serveur avec en paramètre la fonction qui réagit à la connexion au serveur (callback)
  var page = url.parse(req.url).pathname; //Permet d'obtenir la page recherchée
  console.log(page); //Ecrit dans la console la page demandée
  res.writeHead(200, {"Content-Type":"text/html"});
  res.write('Bien le bonjour !'); //Affichage de la page
  res.end();
});
server.listen(8080); //Lance le serveur sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_5 Utilisation d'urls différentes et "routage"
/* 
var http = require('http'); //Inclut la biblithèque http(pour la création du serveur web)
var url = require('url'); //Inclut la bibliothèsue pour manipuler les urls

var server = http.createServer(function(req, res) { //crée le serveur avec en paramètre la fonction qui réagit à la connexion au serveur (callback)
  var page = url.parse(req.url).pathname; //Permet d'obtenir la page recherchée
  console.log(page); //Ecrit dans la console la page demandée
  res.writeHead(200, {"Content-Type":"text/html"});
  if (page == '/') {
    res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
}
else if (page == '/sous-sol') {
    res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
}
else if (page == '/etage/1/chambre') {
    res.write('Hé ho, c\'est privé ici !');
} //Affichage des pages selon l'url
else{
    res.writeHead(404, {"Content-Type":"text/html"}); //Renvoit du code 404
    res.write('Error 404 : page not found');
} //Si c'est pas une page référencée : 404
  res.end();
});
server.listen(8080); //Lance le serveur sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_6 Utilisation de paramètres (pas de routages)
/*
var http = require('http'); //Inclut la biblithèque http(pour la création du serveur web)
var url = require('url'); //Inclut la bibliothèsue pour manipuler les urls
//http://localhost:8080/page?prenom=Robert&nom=Dupont
var querystring = require('querystring'); //Inclut la bibliothèque pour récupérer des arguments

var server = http.createServer(function(req, res) { //crée le serveur avec en paramètre la fonction qui réagit à la connexion au serveur (callback)
    var page = url.parse(req.url).pathname; //Permet d'obtenir la page recherchée
    console.log(page); //Ecrit dans la console la page demandée
    var params = querystring.parse(url.parse(req.url).query); //Permet de récupérer les arguments/paramètres et les mettre dans un tableau
    res.writeHead(200, {"Content-Type": "text/plain"});  //prévient que ce sera du texte sans mise en page
    if ('prenom' in params && 'nom' in params) { //Si on retouve bien 2 paramètres
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']); //On les utilise pour afficher le message
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?'); //Sinon on demande les paramètres
    }
    res.end();
});
server.listen(8080); //Lance le serveur sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_7 Intro aux events
/* 
var http = require('http'); //Inclut la biblithèque http(pour la création du serveur web)

var server = http.createServer(function(req, res) { //crée le serveur avec en paramètre la fonction qui réagit à la connexion au serveur (callback)
  res.writeHead(200); //renvoie le code 200 (ok)
  res.end('Salut tout le monde !'); //finit la réponse en envoyant un message de notre choix (html ou string)
});

server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !'); //Ecrit au revoir dans la console
})

server.listen(8080); // Démarre le serveur

server.close(); // Arrête le serveur. Déclenche l'évènement close
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_8 Créer des events
/* 
var EventEmitter = require('events').EventEmitter; //Inclut la biblithèque pour créer des events

var jeu = new EventEmitter(); //Crée l'objet qui gère l'event

jeu.on('gameover', function(message){ //Quand le jeu s'allume on récupère le message de l'event et on l'affiche
    console.log(message);
});

jeu.emit('gameover', 'Vous avez perdu !'); //On envoie l'event avec le message'
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_9 Création de modules + utilisation de npm
/* 
var monmodule = require('Exemple_modules'); //Appelle le module créé dans node_modules (si pas de dossier node_modules, il faut mettre le path relatif)
//Chemin de Exemple_modules : G:\IS3\Billen\Projets\To_Do_List-Chat\node_modules\Exemple_modules

monmodule.direBonjour(); //Appelle une fonction du module
monmodule.direByeBye(); //Appelle une autre fonction du module

//NPM
//  npm search postgresql
//  Dans le dossier du projet : 
//  npm install nomdumodule 
//  npm install markdown -g : installation globale du module, ce qui permet de rajouter des commandes dans cmd
//  On doit toujours utiliser npm install markdown pour l'ajouter au projet
//  npm update : mise à jour de tous les modules
//  npm publish : publie le module créé
//  Pour le code ci-dessous, on a fait "npm install markdown"

var markdown = require('markdown').markdown; //Ajout de la bibliothèque Markdown qui convertit le Markdown en html, installée dans node_modules

console.log(markdown.toHTML('Un paragraphe en **markdown** !')); //Ecriture en Markdown qui va donner du html dans la console
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region JSON
/* 
Fichier .json : permet de lister les packages utilisés dans le projet avec leur version exacte => compatibilité
name : nom de l'application reliée
version : version de l'app (pour pouvoir reconnaitre à l'install) 3 chiffres : version majeure, version mineure, patch
dependencies : tableau avec les modules requit par le programme

"dependencies": {
    "markdown": "0.3.5" // Version 0.3.5 uniquement
}

"dependencies": {
    "markdown": "~0.3.5" // OK pour les versions 0.3.5, 0.3.6, 0.3.7, etc. jusqu'à la version 0.4.0 non incluse => mise à jour patch seulement
}

"dependencies": {
    "markdown": "~0.3" // OK pour les versions 0.3.X, 0.4.X, 0.5.X jusqu'à la version 1.0.0 non incluse => mise à jour versions mineures seulement
}
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_10 Framework Express.js : routage
/* 
var express = require('express'); //Inclut le framework express pour la vraie gestion des routes

var app = express(); //Initialise l'objet app

//Routage (mêmes routes que dans la v_5)
app.get('/', function(req, res) { 
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hé ho, c\'est privé ici !');
});

app.get('/etage/:etagenum/chambre', function(req, res) { //Route dynamique => variable dans la route /!\ Il faut vérifier la validité du paramètre nous même (ici mettre une erreur si c'est pas un nombre)
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080); //Lance l'app sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_11 Framework Express.js : templates (ejs et views)
/* 
//npm install ejs (moteur de template)
//Il faut un sous-dossier view dans lequel seront nos templates

var express = require('express'); //Inclut le framework express pour la vraie gestion des routes et des templates

var app = express(); //Initialise l'objet app

//Routage (mêmes routes que dans la v_5)
app.get('/', function(req, res) { 
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hé ho, c\'est privé ici !');
});

//Routes rajoutées
app.get('/etage/:etagenum/chambre', function(req, res) { //Route dynamique => variable dans la route /!\ Il faut vérifier la validité du paramètre nous même (ici mettre une erreur si c'est pas un nombre)
    res.render('chambre.ejs', {etage: req.params.etagenum}); //Utilisation d'un template pour l'affichage de la page
});

//404 page not found, toujours après toutes les autres routes
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080); //Lance l'app sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_12 Framework Express.js : templates avec tableau en paramètre
/* 
var express = require('express'); //Inclut le framework express pour la vraie gestion des routes et des templates

var app = express(); //Initialise l'objet app

//Routage (mêmes routes que dans la v_5)
app.get('/', function(req, res) { 
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hé ho, c\'est privé ici !');
});

//Routes rajoutées
app.get('/etage/:etagenum/chambre', function(req, res) { //Route dynamique => variable dans la route /!\ Il faut vérifier la validité du paramètre nous même (ici mettre une erreur si c'est pas un nombre)
    res.render('chambre.ejs', {etage: req.params.etagenum}); //Utilisation d'un template pour l'affichage de la page
});

app.get('/compter/:nombre', function(req, res) { //Utilisation d'un tableau dans les templates
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
});

//404 page not found, toujours après toutes les autres routes
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080); //Lance l'app sur le port 8080
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//#region v_13 Middlewares
/* 
//Un middleware est un mini programme qui propose une (et une seule) fonctionnalité

var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon

var app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.use(function(req, res){ // Répond enfin
    res.send('Hello');
});

app.listen(8080);
*/
//#endregion
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
