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
  let custom_popcorn = 'POP CORN';
  let splited_custom_name = req.query.pop_name.split('_');
  if (splited_custom_name.length === 2) {
    custom_popcorn = `${splited_custom_name[0].toUpperCase()} ${splited_custom_name[1].toUpperCase()}`
  }
  res.render('popcorn.ejs', {custom_popcorn, custom_name: req.query.pop_name});
});
app.get('/popbox', function(req, res) {
    res.render('popbox.ejs', {popbox: 'POP BOX'});
});
app.get('/ecran', function(req, res) {
  res.render('ecran.ejs', {});
});
app.use(cors())

module.exports = app
