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

client.query('SELECT * FROM public.users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/shop'))
  .get('/shop/items', shopep.items)
  .get('/shop/users', shopep.users)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))




//.get('/shop/:items', rateCalc.calculate)
//User req.params.items to use the /shop/items sort of thing
//to parse a body with express we do .use(express.json()) and .use(express.urlencoded({extended:true}))

//const express = require('express')
//const router = express.Router()
//const path = require('path')
//const PORT = process.env.PORT || 5000
//
//const pg = require('pg')
//

//const pool = new pg.Pool(config)
//
//express()
//  .use(express.static(path.join(__dirname, 'public')))
//  .set('views', path.join(__dirname, 'views'))
//  .set('view engine', 'ejs')
//  .get('/getPerson', getPerson) 
//  .get('/', (req, res) => res.render('pages/index'))
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
//
//function getPerson(req, res, next) {
//    console.log('in the function')
//    pool.connect(function (err, client, done){
//        if (err) {
//            return console.log("Error fetching from pool")
//        }
//        console.log('connected to db')
//        client.query('SELECT * FROM person', function(err, result){
//            done()
//            if (err){
//                return console.error('error running the query', err)
//            }
//            res.send(result)
//        })
//    })
//    pool.end()
//}