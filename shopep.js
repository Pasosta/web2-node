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
        console.log("Success: " + success);
        if (err) {
            req.session.loggedIn = false;
            console.log("Failed to login");
            res.redirect("/");
        } else {
            req.session.username = req.body.username;
            console.log("success 22");
            req.session.loggedIn = true;
            res.json({success: "Success"});
        }
    });
}

function checkCreds(name, pass, callBack) {
    pool.query('SELECT password FROM public.users WHERE username = $1::text;', [name], (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        console.log("res " + res);
        console.log("pass" + pass);
        console.log("fetched: " + res.rows[0].password);
        bcrypt.compare(pass, res.rows[0].password, function(err, res) {
            if(res) {
                callBack(null, "success");
            } else {
                callBack("failed");
            } 
        });       
    });
}

function registerNew(req, res) {
    console.log("registering");
    addUser(req.body.username, req.body.password, (err, success) => {
       console.log(success + " Success");
        res.redirect('/');
    });
}

function addToCart(req, res) {
    console.log("adding item to cart");
    insertItem(req.body.itemID, req.session.username, (err, success) => {
       console.log(success + " successfully added");
    });
}

function insertItem(itemid, username, callBack) {
    console.log("inserting item");
    console.log("insertion username" + username);
    pool.query('SELECT id from public.users WHERE username = $1::text;',[username], (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        pool.query('INSERT INTO public.cartitems (itemid, userid) VALUES ($1::integer, $2::integer);', [itemid, res.rows[0].id], (err, res) => {
            if (err) {
                console.log(err);
                callBack(err);
            }
            itemData = {"data": res.rows};
            console.log(itemData);
            callBack(null, itemData);
        }); 
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
            callBack(null, itemData);
        });
    });
}

function userItems(req, res) {
    var username = req.session.username;
    console.log("useritems username: " + username);
    pool.query('SELECT id FROM public.users WHERE public.users.username = $1::text;', [username], (err, resp) => {
        console.log("useritems res.rows: " + JSON.stringify(resp.rows[0].id, null, "    "));
        getItemsForUser(resp.rows[0].id, (err, items) => {
            res.json(items); 
        });
    });
}

function getItemsForUser(user, callBack) {
    console.log("user in getitems: " + user);
    pool.query('SELECT name FROM public.items JOIN public.cartItems ON public.items.id = public.cartItems.itemId JOIN public.users ON public.cartItems.userId = public.users.id WHERE public.users.id = $1::integer;', [user], (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        itemData = {"data": res.rows};
        callBack(null, itemData);
    });
}

function checkout(req, res) {
    console.log("checkout username: " + req.session.username);
}

function removeItems(user, callback) {
    
}


//This goes into controllers
function items(req, res) {
    getItems((err, item) => {
        res.json(item);
    });
}


//This goes in models
function getItems(callBack) {
    pool.query('SELECT * FROM public.items', (err, res) => {
        if (err) {
            console.log(err);
            callBack(err);
        }
        itemData = {"data": res.rows};
        callBack(null, itemData);
    });
}


function users(req, res) {
    var userarray = new Array();
    console.log("user");
    getUser("name","pass", (err, data) => {
        res.json(data);
    });
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

module.exports = {users: users, items: items, userItems: userItems, registerNew: registerNew, auth: auth, addToCart: addToCart, checkout: checkout};