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

router.get('/collection/delete/:id', isLoggedIn, (req,res ) =>{
  db.card.findOne({
    where: {
      multiverseId: req.params.id
    }
  }).then((card) => {
    db.user_collections.destroy({
      where: {
        userId: req.user.id,
        cardId: card.id
      }
    }).then(rowDeleted => {
      console.log(`Deleting card with multiId ${req.params.id}, named ${card.name} for user ${req.user.id} ${req.user.username}`);
      res.redirect('/user/collection');
    })
  })
  // res.send(`Deleting card ${req.params.id} for user ${req.user.id}`)
})

//Post merge master with databaseRewrite
module.exports = router;