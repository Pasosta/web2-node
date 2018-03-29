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
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/login'))
  .get('/login', login)
  .get('/shop/items', verifyLogin, shopep.items)
  .get('/shop/users', shopep.users)
  .get('/shop/userItems', shopep.userItems)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function login(req, res) {
    if (req.body.username == 'admin' && req.body.password == 'password' ) {
        req.session.loggedIn = true;
        res.json({success: true});
        res.redirect('/shop/items');
    } else {
        req.session.loggedIn = false;
        res.json({success: false});
        res.redirect('/');
    }
}

function verifyLogin(req, res, next) {
    if (!req.session.username) {
        res.redirect('/');
    } else {
        next();
    }
}