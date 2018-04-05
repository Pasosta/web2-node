const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 5000;
var shopep = require('./shopep.js');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({extended: true}))
  .use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
   }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/login'))
  .post('/login', login)
  .post('/registerNew', shopep.registerNew)
  .post('/viewCart', shopep.userItems)
  .get('/createAccount', (req, res) => res.render('pages/createAccount'))
  .get('/shop', verifyLogin, (req, res) => res.render('pages/shop'))
  .get('/shop/items', shopep.items)
  .get('/shop/users', shopep.users)
  .get('/shop/userItems', shopep.userItems)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function registerNew(req, res) {
    console.log("made to register");
    console.log(req.body.username);
    console.log(req.body.password);
    shopep.registerNew(req, res);
    res.redirect('/');
}

function login(req, res) {
    console.log("made to middle\n");
    shopep.auth(req, res);
    
    //TODO: finish this compare and login will be done
//    if (req.body.username == 'admin' && req.body.password == 'password' ) {
//        req.session.username = req.body.username;
//        console.log(req.session.username);
//        req.session.loggedIn = true;
//        res.json({success: true});
//    } else {
//        req.session.loggedIn = false;
//        res.json({success: false});
//    }
}

function verifyLogin(req, res, next) {
    if (!req.session.username) {
        console.log('redirected');
        res.redirect('/');
    } else {
        next();
    }
}