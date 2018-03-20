const { Client } = require('pg');
const { exec } = require('child_process');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


function items(req, res, next) {
    var itemarray = new Array();
    console.log("items");
    var itemData = ["asd"];
    client.query('SELECT * FROM public.items;').exec(function (err, res) {
        if (err) throw err;
        for (let row of res.rows) {
            itemarray.push(row);
        }
        itemData = {"data": itemarray};
        console.log(postageData);
        res.render('pages/result', itemData);
        client.end();
    });
    
}


function users(req, res) {
    //var item = req.query.item;
var userarray = new Array();
    console.log("user");
    client.query('SELECT * FROM public.items;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            userarray.push(JSON.stringify(row));
        }
        client.end();
    });
    
    var userData = {"data": userarray};
    res.render('pages/result', userData);
    
    
}

module.exports = {users: users, items: items};