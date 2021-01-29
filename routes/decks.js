const express = require('express');
const axios = require('axios');
const router = express.Router();
const mtgSDK = require('mtgsdk');
const isLoggedIn = require('../middleware/isLoggedIn');
const url= require('url');
const querystring = require('querystring');
const db = require('../models');
//create deck route from details form
router.get('/create/:id', isLoggedIn, (req, res) =>{
  let query = `${req.params.id}` 
  let parsedQuery = querystring.parse(query);
  // res.send('creating the deck')
  console.log(parsedQuery)
  res.render('./decks/create', { parsedQuery: parsedQuery });
})
module.exports = router;