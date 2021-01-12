const express = require('express')
const router = express.Router()
const passport = require('passport')
const helpers = require('../lib/helpers')
router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/signin',
  failureRedirect: '/signup'
}))

router.get('/signin',(req, res) =>{
  res.render('auth/signin')

}) 

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin'
}))

res.render('profile')
router.get('/profile', helpers.isLogged, (req, res) => {
})

router.get('/logout', (req, res) =>{
  req.logOut()
  res.redirect('/signin')
})
module.exports = router