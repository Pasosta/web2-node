const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


function items(req, res) {
    var itemarray = new Array();
    console.log("items");
    var postageData = {"data": itemarray};
    
    res.render('pages/result', postageData);
}

function users(req, res) {
    //var item = req.query.item;
var userarray = new Array();
    console.log("user");
    var postageData = {"data": userarray};
    
    res.render('pages/result', postageData);
    
    
}

module.exports = {users: users, items: items};