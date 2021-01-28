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
    console.log(collection);
    res.render('./user/collection')
  })
})
module.exports = router;