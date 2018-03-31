const express = require('express')
const path = require('path')
const session = require('express-session')
const PORT = process.env.PORT || 5000
var shopep = require('./shopep.js')
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
  .post('/registerNew', registerNew)
  .get('/createAccount', (req, res) => res.render('pages/createAccount'))
  .get('/shop', (req, res) => res.render('pages/shop'))
  .get('/shop/items', verifyLogin, shopep.items)
  .get('/shop/users', shopep.users)
  .get('/shop/userItems', shopep.userItems)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function registerNew(req, res) {
    console.log("made to register");
    //Add code to call the insert endpoint here
    res.redirect('/');
}

function login(req, res) {
    console.log("made to middle\n");
    if (req.body.username == 'admin' && req.body.password == 'password' ) {
        req.session.username = req.body.username;
        console.log(req.session.username);
        req.session.loggedIn = true;
        res.json({success: true});
    } else {
        req.session.loggedIn = false;
        res.json({success: false});
    }
}

function verifyLogin(req, res, next) {
    if (!req.session.username) {
        console.log('redirected');
        res.redirect('/');
    } else {
        next();
    }
}