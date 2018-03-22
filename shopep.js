const { Client } = require('pg');
const express = require('express')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();


//This goes into controllers
function items(req, res, next) {
    var itemarray = new Array();
    console.log("items");
    
    getItems("person", (err, item) => {
        res.json(item);
    });
}


//This goes in models
function getItems(person, callBack) {
    client.query('SELECT * FROM public.items;', (err, res) => {
        if (err) {
            console.log(err);
        }
        itemData = {"data": res.rows};
        console.log(itemData);
        //response.render('pages/result', itemData);
        callBack(null, itemData)
        client.end();
    });
}


function users(req, response) {
    //var item = req.query.item;
var userarray = new Array();
    console.log("user");
    client.query('SELECT username FROM public.users;', (err, res) => {
        if (err) {
            console.log(err);
        }
        var userData = {"data": res.rows};
        console.log(userData);
        //response.render('pages/result', userData);
        response.json(userData);
        client.end();
    });
    
}

module.exports = {users: users, items: items};