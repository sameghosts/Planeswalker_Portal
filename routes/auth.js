const express = require('express');
const router = express.Router();
const passport= require('../config/ppConfig');
const db = require('../models');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

//sign up POST route
router.post('/signup', (req, res) =>{
  //findOrCreate a new user based on email
  db.user.findOrCreate({
    where: {
      email: req.body.email
    }, 
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user,created]) =>{
    //If user was created
    if (created) {
      //redirect to homepage or profile
      console.log(`😎 ${user.name} was created`)
      //IIFE authenticate and redirect to the homepage or profile
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Successful account creation'
      })(req, res);
    } else {
      // if user wasn't created -- the is a user at that emaill so they can't sign up
      console.log(`🐸 ${user.name} already exists`)
      req.flash('error', 'Email already exists');
        //redirect to /auth/signup
      res.redirect('/auth/signup');
    }
  }).catch(err =>{
    console.log(`🙃 OOPS there was an error`);
    console.log(err);
    req.flash('error', err.message);
    res.redirect('/auth/signup');
    //if there is an error, its probably a validation error, so we'll return to /auth/signup
  })
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

//make passport do the login stuff
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login',
  successRedirect: '/', 
  failureFlash: 'Invalid Login credentials',
  successFlash: 'Successfully Logged In'
}));

// logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
  req.flash('success', 'Thanks see ya soon!');
})

module.exports = router;
