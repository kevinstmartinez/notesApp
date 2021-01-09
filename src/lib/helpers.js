const bcrypt = require('bcryptjs')
const helpers = {}
helpers.encryptPassword = async (password) =>{
  const salt = await bcrypt.genSalt(11)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

helpers.match = async (password, savedPassword)=>{
  const matchPass = await bcrypt.compare(password, savedPassword)
  return matchPass
}

helpers.isLogged = (req, res, next)=>{
  if(req.isAuthenticated()) return next()
  return res.redirect('/signin')
}

module.exports = helpers