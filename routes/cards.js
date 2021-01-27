const express = require('express');
const axios = require('axios');
const router = express.Router();
const mtgSDK = require('mtgsdk');


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
    // axios.get(mtgURLmultiverseid).then(response => {
      //lol quickchange
      let valueSel;
      // let getOption =  () => {
        //   // selectElement= document.querySelector('#selectpick');
        //   valueSel = selectElement.options[selectElement.selectedIdex].value
        // };
        // getOption();
        // console.log(req.body.select);
        console.log(req.query);
        console.log(req.query.value);
        // console.log(response);
        // console.log(response.data);
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
        //lol quickchange
        // console.log(response);
        // console.log(response.data);
        // res.send(response.data);
        res.render('./search/details', {data: response.data})
      }).catch(err =>{
        console.log(err);
      });
    })
    
    //routes for adds from card details page
    router.get('/cardaction', (req, res) =>{
      console.log(req.query.multiId)
      res.send(`add ${req.query.number} card(s) with multiverse id ${req.query.multiId} to ${req.query.select}`)
    });
    
    module.exports = router;