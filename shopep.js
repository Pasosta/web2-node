const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


function items(req, result, next) {
    var itemarray = new Array();
    console.log("items");
    var itemData = ["asd"];
    client.query('SELECT * FROM public.items;', (err, res, result) => {
        if (err) throw err;
        for (let row of res.rows) {
            itemarray.push(row);
        }
        itemData = {"data": itemarray};
        console.log(itemData);
        result.send('pages/result', itemData)
        client.end();
    })(result);
    
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