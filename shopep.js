const { Client } = require('pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const express = require('express')

function userItems(req, res) {
    console.log("userItems\n************\n");
    getItemsForUser("1", (err, items) => {
       res.json(items); 
    });
}

function getItemsForUser(user, callBack) {
        pool.query('SELECT name FROM public.items JOIN public.cartItems ON public.items.id = public.cartItems.itemId JOIN public.users ON public.cartItems.userId = public.users.id WHERE public.users.id = $1::text;', [user], (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        itemData = {"data": res.rows};
        console.log(itemData);
        //response.render('pages/result', itemData);
        callBack(null, itemData);
        client.end();
    });
}


//This goes into controllers
function items(req, res) {
    console.log("items");
    getItems((err, item) => {
        res.json(item);
    });
}


//This goes in models
function getItems(callBack) {
    //this is an example of binding values
   // pool.query('SELECT * FROM public.items WHERE name = $1::text;', ["item1"], (err, res) => {
    pool.query('SELECT * FROM public.items', (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        itemData = {"data": res.rows};
        console.log(itemData);
        //response.render('pages/result', itemData);
        callBack(null, itemData);
        client.end();
    });
}


function users(req, res) {
    //var item = req.query.item; this gets item from the GET ?=
var userarray = new Array();
    console.log("user");
    getUser("name","pass", (err, data) => {
        res.json(data);
    })
}

function getUser(name, pass, callBack) {
    pool.query('SELECT username FROM public.users;', (err, res) => {
        if (err) {
            console.log(err);
        }
        var userData = {"data": res.rows};
        callBack(null, userData);
        client.end();
    });
}

module.exports = {users: users, items: items, userItems: userItems};