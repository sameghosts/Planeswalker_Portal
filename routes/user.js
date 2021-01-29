const express = require('express');
const axios = require('axios');
const router = express.Router();
const mtgSDK = require('mtgsdk');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');

router.get('/collection', isLoggedIn, (req, res) => {
  db.user.findOne({
    where: { id: req.user.id},
    include: [db.card]
  }).then((collection) => {
    db.user_collections.findAll({
      where: {
        userId: req.user.id
      }
    }).then((amount) =>{ 
      console.log(amount);
      res.render('./user/collection', {collection: collection, amount: amount})
      
    })
  })
})
module.exports = router;