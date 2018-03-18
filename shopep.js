const {Client} = require('pg');
const client = new Client({
    connectionString: PORT,
    ssl: true,
});

client.connect();

function items(req, res) {
    var itemarray = new Array();

client.query('SELECT * FROM public.items;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    itemarray.push(row)
  }
  client.end();
});
    
    var postageData = {"data": itemarray};
    
    res.render('pages/result', postageData);
}

function users(req, res) {
    //var item = req.query.item;
var userarray = new Array();

client.query('SELECT * FROM public.users;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    userarray.push(row)
  }
  client.end();
});
    
    var postageData = {"data": userarray};
    
    res.render('pages/result', postageData);
    
    
}

module.exports = {users: users, items: items};