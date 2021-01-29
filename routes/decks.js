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
  let createNewUrl = `https://api.magicthegathering.io/v1/cards?multiverseid=${req.query.cardMultiId}`;
  axios.get(createNewUrl).then(result =>{
  // db.card.findOrCreate({
  //   where: {
  //     multiverseId: req.query.cardMultiId
  //   }
    db.card.findOrCreate({
      where: {
        multiverseId: result.data.cards[0].multiverseid
      },
      defaults: {
        name: result.data.cards[0].name,
        manaCost: result.data.cards[0].manaCost,
        cmc : result.data.cards[0].cmc,
        colorIdentity: result.data.cards[0].colorIdentity.forEach(item => item),
        rarity: result.data.cards[0].rarity,
        blockset: result.data.cards[0].set,
        blocksetname: result.data.cards[0].setName,
        imageUrl: result.data.cards[0].imageUrl
      }
    }).then(([card, created]) => {
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
  
  let createNewUrl = `https://api.magicthegathering.io/v1/cards?multiverseid=${req.params.id}`;
  axios.get(createNewUrl).then(result =>{
  // db.card.findOrCreate({
  //   where: {
  //     multiverseId: req.query.cardMultiId
  //   }
    db.card.findOrCreate({
      where: {
        multiverseId: result.data.cards[0].multiverseid
      },
      defaults: {
        name: result.data.cards[0].name,
        manaCost: result.data.cards[0].manaCost,
        cmc : result.data.cards[0].cmc,
        colorIdentity: result.data.cards[0].colorIdentity.forEach(item => item),
        rarity: result.data.cards[0].rarity,
        blockset: result.data.cards[0].set,
        blocksetname: result.data.cards[0].setName,
        imageUrl: result.data.cards[0].imageUrl
      }
    }).then(([card, created]) =>{
      db.deck.findAll({
        where: {
          creator: req.user.id,
        }
      }).then((decks) =>{

        res.render('./decks/editAdd', {card: card, decks: decks})
      })
    })
  })
});

// Add existing card Database Crud and redirect
router.get('/cardAdding', isLoggedIn, (req, res) => {
  db.deck.findOne({
    where: {
      id: req.query.select
    }
  }).then((deck) =>{
    db.card.findOne({
      where: {
        id: req.query.cardId
      }
    }).then((card) =>{
      card.addDeck(deck).then(relation => {
        let updateAmount = { amount: req.query.number };
        db.deck_cards.update(updateAmount, {
          where: {
            deckId: deck.id,
            cardId: card.id
          }
        }).then((results) => {
          console.log(results);
          res.redirect(`./edit/${deck.id}`);
        }) 
      })
    })
  })
});

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