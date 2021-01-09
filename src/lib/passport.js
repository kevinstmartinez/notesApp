const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true

}, async (req, username, pass, done) =>{
  const row = await pool.query('SELECT * FROM users WHERE username=?', [username])
  if(row.length > 0){
    const user = row[0]
    const validate = await helpers.match(pass, user.pass)
    if(validate) done(null, user)
    if(!validate) done(null, false)
  }else{
    return done(null, false)
  }
}))
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, pass, done) =>{
  const newUser ={
    username,
    pass
  }
  newUser.pass= await helpers.encryptPassword(pass)
  const result = await pool.query('INSERT INTO users set ?', [newUser])
  newUser.id = result.insertId
  return done(null, newUser)
}))

passport.serializeUser((user, done) =>{
  done(null, user.id)
})
passport.deserializeUser(async (id, done) =>{
  const row = await pool.query('SELECT * FROM users WHERE id=?', [id])
  done(null, row[0])
})

// module.exports = passport