const axios = require('axios');
const db = require('./models');
/*
Ok figured something out. the way the databases are currently managed will not work in sql achitecture. Must burn it down and remake the models so their are only one relationship between two tables. 

As a stretch goal later i can take the logic ive defined here and store them as nosql databases or a second database. g
*/


// ------ Collection Model Crud Logic -----
      // CREATE
//call multiId from req.query.multiId

let multiId = 479736
let mtgURLdetails = `https://api.magicthegathering.io/v1/cards?multiverseid=${multiId}`;
axios.get(mtgURLdetails).then(result =>{
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
        id: 1 
      }
    }).then(([user, created]) => {
      user.addCard(card).then(relation => {
        console.log(`${card.name} added to ${user.username} favorites`);
        console.log(relation);
      })
    })
  })
}); 




// ------ Collection Model Crud Logic -----

// ------ Collection Model Crud Logic -----
// ------ Collection Model Crud Logic -----