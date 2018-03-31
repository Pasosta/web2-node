const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const express = require('express');

function auth(req, res) {
    console.log("authorizing");
    console.log(req.body.username);
    checkCreds(req.body.username, req.body.password, (err, success) => {
        if(err) {
            req.session.loggedIn = false;
            console.log("Failed to login");
            res.redirect("/");
        } else {
            req.session.username = req.body.username;
            console.log("success");
            req.session.loggedIn = true;
            res.redirect("/shop");
        }
    });
}

function checkCreds(name, pass, callBack) {
    pool.query('SELECT password FROM public.users WHERE username = $1::text);', [name], (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        console.log("res" + res);
//        bcrypt.compare(res.rows[0], hash, function(err, res) {
//            if(res) {
//                callBack(null, "success");
//            } else {
//                callBack("failed");
//            } 
//        });       
    });
}

function registerNew(req, res) {
    console.log("registering");
    addUser(req.body.username, req.body.password, (err, success) => {
       console.log(success + "Success");
        res.redirect('/');
    });
}

function addUser(user, pass, callBack) {
    bcrypt.hash(pass, 10, function(err, hash) {
        pool.query('INSERT INTO public.users (username, password) VALUES ($1::text, $2::text);', [user, hash], (err, res) => {
            if (err) {
                console.log(err);
                callBack(err);
            }
            itemData = {"data": res.rows};
            console.log(itemData);
            //response.render('pages/result', itemData);
            callBack(null, itemData);
        });
    });
}

function userItems(req, res) {
    console.log("userItems\n************\n");
    var userId = req.query.userId;
    console.log(userId);
    getItemsForUser(userId, (err, items) => {
       res.json(items); 
    });
}

function getItemsForUser(user, callBack) {
        pool.query('SELECT name FROM public.items JOIN public.cartItems ON public.items.id = public.cartItems.itemId JOIN public.users ON public.cartItems.userId = public.users.id WHERE public.users.id = $1::integer;', [user], (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        itemData = {"data": res.rows};
        console.log(itemData);
        //response.render('pages/result', itemData);
        callBack(null, itemData);
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
    });
}

module.exports = {users: users, items: items, userItems: userItems, registerNew: registerNew, auth: auth};