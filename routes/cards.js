const express = require('express');
const axios = require('axios');
const router = express.Router();
const mtgSDK = require('mtgsdk');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');

//Routes
// router.get('/search', (req, res) =>{
//   res.render('index');
// });

//results
// primary search tool to whos view /controller make a partial
router.get('/results', (req, res) =>{
  
  // console.log(queryTerm)
  //search query types
  //multiversid
  //name
  //color
  let mtgURL = `https://api.magicthegathering.io/v1/cards?${req.query.select}=${req.query.value}&page=1&pageSize=20`;
  
  
  
  axios.get(mtgURL).then(response => {
        console.log(req.query);
        console.log(req.query.value);
        //results view
        // res.send(response.data);
        // console.log(response.data);
        res.render('./search/cards', {data: response.data})
      }).catch(err =>{
        console.log(err);
      });
    })
    
    //details route
    router.get('/cards/:multiverseId', (req, res) =>{
      console.log(req.params.multiverseId);
      // res.send(req.params.multiverseId);
      let multiIdURL = `https://api.magicthegathering.io/v1/cards?multiverseid=${req.params.multiverseId}`
      
      axios.get(multiIdURL).then(response => {
        // console.log(response.data);
        // res.send(response.data);
        res.render('./search/details', {data: response.data})
      }).catch(err =>{
        console.log(err);
      });
    })
    
    //routes for adds from card details page
    router.get('/cardaction', isLoggedIn, (req, res) =>{
      console.log(req.query.multiId)
      //conditional statements for each of the possible posts 
        // if (req.query.select = "...")
          //Deck
          //Collection
          //Favorites
      let mtgURLdetails = `https://api.magicthegathering.io/v1/cards?multiverseid=${req.query.multiId}`;
      axios.get(mtgURLdetails).then(result =>{

        switch (req.query.select){
          case "Deck":
            //something

            //Database CRUD - card to redirect to deck create
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
              console.log(`👻 ${req.user.username} adding card with multiverse id ${req.query.multiId} to new deck create frorm redirect`);
              res.redirect(`../deck/create/param1=${card.multiverseId}&param2=${req.query.number}`);
            // res.send(`${req.user.username} adding card with multiverse id ${req.query.multiId} to new deck redirect`);
            });
            break;
          case "Collection":
            //data check
              // console.log(`for console log to check data correct
              // name: ${result.data.cards[0].name}
              // manaCost: ${result.data.cards[0].manaCost}
              // cmc : ${result.data.cards[0].cmc}
              // colorIdentity: ${result.data.cards[0].colorIdentity}
              // rarity: ${result.data.cards[0].rarity}
              // blockset: ${result.data.cards[0].set}
              // blocksetname: ${result.data.cards[0].setName}
              // multiverseId: ${result.data.cards[0].multiverseid}
              // imageUrl: ${result.data.cards[0].imageUrl}`);

            //Database CRUD - CREATE collection
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
              // right now for crud test using value, but later must use req.user.id
              db.user.findOrCreate({
                where: {
                  id: req.user.id 
                }
              }).then(([user, created]) => {
                user.addCard(card).then(relation => {
                  console.log(`${card.name} added to ${user.username} collection`);
                  console.log(relation);
                  // use req dot query value from add form
                  let updateAmount = { amount: req.query.number };
                  db.user_collections.update(updateAmount, {
                    where: {
                      userId: user.id,
                      cardId: card.id
                    }
                  }).then((result) =>{
                    console.log(result)
                  })
                })
              })
            });
            //route check stub
            // res.send(`${req.user.username} adding ${req.query.number} card(s) with multiverse id ${req.query.multiId} called ${result.data.cards[0].name} to Collection this will be a redirect`);
            res.redirect(`../user/collection`);
            //something
            break;
  
        }
      })
      // res.send(`${req.user.username} added ${req.query.number} card(s) with multiverse id ${req.query.multiId} to ${req.query.select}`)
    });
    
    module.exports = router;