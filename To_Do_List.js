
//Liste stockée dans la session utilisateur => 1 par utilisateur

var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false }); //Parse le contenu de la requête en url
//var io = require('socket.io').listen(server)

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'})) //le paramètre sécurise les cookies de la session
/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') { //Pas de todolist
        req.session.todolist = []; //Création d'un tableau
    }
    next(); //Appel à la fonction suivante
}) //JS râle si on tente de parcourir qqch qui n'existe pas

// On affiche la todolist et le formulaire 
.get('/todo', function(req, res) {  //Affichage
    res.render('todo.ejs', {todolist: req.session.todolist}); //Utilisation d'un template
})

// On ajoute un élément à la todolist 
.post('/todo/ajouter/', urlencodedParser, function(req, res) { 
    if (req.body.newtodo != '') { //Si il y a qqch dans le champs nouvel item
        req.session.todolist.push(req.body.newtodo); //On l'ajoute au tableau
    }
    res.redirect('/todo'); //On renvoie à l'affichage avec la liste actualisée
})

// Supprime un élément de la todolist 
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') { //Si l'élément existe
        req.session.todolist.splice(req.params.id, 1); //On enlève l'item de la liste à l'emplacement de son id
    }
    res.redirect('/todo'); //On renvoie à l'affichage avec la liste actualisée
})

// On redirige vers la todolist si la page root
.get('/', function(req, res) {  //Affichage
    res.render('todo.ejs', {todolist: req.session.todolist}); //Utilisation d'un template
})

// Erreur 404 si la page n'est pas trouvée
.use(function(req, res, next){
    res.render('E404.ejs');
})

.listen(8081);



