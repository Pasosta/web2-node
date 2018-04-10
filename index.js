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
  .get('/logout', logout, (req, res) => res.render('pages/login'))
  .post('/checkout', checkout, logout, (req, res) => res.render('pages/login'))
  .get('/viewCart', verifyLogin, (req, res) => res.render('pages/viewCart'))
  .get('/createAccount', (req, res) => res.render('pages/createAccount'))
  .get('/shop', verifyLogin, (req, res) => res.render('pages/shop'))
  .get('/shop/items', shopep.items)
  .post('/shop/addToCart', verifyLogin, shopep.addToCart)
  .get('/shop/users', shopep.users)
  .post('/shop/userItems', shopep.userItems)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function registerNew(req, res) {
    console.log("made to register");
    shopep.registerNew(req, res);
    res.redirect('/');
}

function login(req, res) {
    shopep.auth(req, res);
}

function logout(req, res, next) {
    console.log("logged out");
    req.session.loggedIn = false;
    req.sessoin.username = "";
    next();
}

function checkout(req, res, next) {
    console.log("middleCheckout");
    shopep.checkout(req,res);
    next();
}

function verifyLogin(req, res, next) {
    if (!req.session.username) {
        console.log('redirected');
        res.redirect('/');
    } else {
        next();
    }
}