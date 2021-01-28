const express = require('express');
const axios = require('axios');
const router = express.Router();
const mtgSDK = require('mtgsdk');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');

router.get('user/collection/:id', (req, res) => {
  db.user.findOne({
    where: { id: req.params.id},
    include: [db.card, db.user_collections]
  }).then((collection) => {
    console.log(collection);
    res.render('user/collection')
  })
})