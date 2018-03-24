const express = require('express')
const path = require('path')
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
  .get('/', (req, res) => res.render('pages/shop'))
  .get('/shop/items', shopep.items)
  .get('/shop/users', shopep.users)
  .get('/shop/userItems', shopep.userItems)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))