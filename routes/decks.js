const express = require('express');
const axios = require('axios');
const router = express.Router();
const mtgSDK = require('mtgsdk');
const isLoggedIn = require('../middleware/isLoggedIn');
const url= require('url');
const querystring = require('querystring');
const db = require('../models');
const deck = require('../models/deck');

//push to form for create deck route from details form with card params
router.get('/create/:id', isLoggedIn, (req, res) =>{
  let query = `${req.params.id}` 
  let parsedQuery = querystring.parse(query);
  // res.send('creating the deck')
  console.log(parsedQuery)
  res.render('./decks/create', { parsedQuery: parsedQuery });
})

// Create Deck Route (from details)
router.get('/createFromCard/new', isLoggedIn, (req, res) => {
  db.card.findOne({
    where: {
      multiverseId: req.query.cardMultiId
    }
  }).then((card) => {
    db.deck.findOrCreate({
      where: {
        name: req.query.deckName,
        creator: req.user.id
      },
      defaults: {
        format: req.query.deckFormat,
        description: req.query.deckDescription,
        author: req.query.deckAuthor
      }
    }).then(([deck, created]) => {
      card.addDeck(deck).then(relation => {
        let updateAmount = { amount: req.query.cardAmount};
        db.deck_cards.update(updateAmount, {
          where:{
            deckId: deck.id,
            cardId: card.id
          } 
        }).then((result) => {
          // res.send('deck edit params id');
          res.redirect(`/deck/edit/${deck.id}`)
        })
      })
    })
  })
});

router.get('/edit/:id', isLoggedIn, (req, res) =>{
  db.deck.findOne({
    where: {
      id: req.params.id
    }, 
    include: [db.card]
  }).then((deckEdit) => {
    db.deck_cards.findAll({
      where: {
        deckId: deckEdit.id
      }
    }).then((amount) => {
      console.log(deckEdit.cards);
      res.render('./decks/edit', {deck: deckEdit, amount: amount})
    })
  })
})

router.get('/addCard/:id', isLoggedIn, (req, res) =>{
  
})

router.get('/edit/delete/:id', isLoggedIn, (req, res) => {
  let query = `${req.params.id}` 
  let parsedQuery = querystring.parse(query);
  db.card.findOne({
    where: {
      multiverseId: parsedQuery.paramDeckCard
    },
    include: [db.deck]
  }).then((card) =>{
    db.deck_cards.destroy({
      where: {
        deckId: parsedQuery.paramDeckId,
        cardId: card.id
      }
    }).then(rowDeleted => {
      console.log(`Deleting card with multiId ${card.multiverseId}, named ${card.name} for user ${req.user.id} ${req.user.username} from Deck named ${card.decks.name}`);
      res.redirect(`/deck/edit/${parsedQuery.paramDeckId}`);
    })
  })
})
module.exports = router;