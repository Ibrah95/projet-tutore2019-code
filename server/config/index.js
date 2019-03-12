'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

app.use(express.static(path.join(__dirname, './../../public/')))
app.use('/assets', express.static(path.join(__dirname, './../../public/assets/')))
app.use('/vendor', express.static(path.join(__dirname, './../../vendor')))
app.get('/popcorn', function(req, res) {
    res.render('popcorn.ejs', {});
});
app.get('/popbox', function(req, res) {
    res.render('popbox.ejs', {});
});
app.get('/ecran', function(req, res) {
  res.render('ecran.ejs', {});
});
app.use(cors())

module.exports = app
