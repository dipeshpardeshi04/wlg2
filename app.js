const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    res.render("index");
})

app.post('/landingpage',function(req,res){
    res.render("landing_page");
})

app.listen(3000);