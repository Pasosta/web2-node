const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


function items(req, res) {
    var itemarray = new Array();
    console.log("items");
    
    client.query('SELECT * FROM public.items;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            itemarray.push(row);
        }
        client.end();
    });
    var postageData = {"data": itemarray};
    console.log(postageData);
    res.render('pages/result', postageData);
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
    
    var postageData = {"data": userarray};
    res.render('pages/result', postageData);
    
    
}

module.exports = {users: users, items: items};