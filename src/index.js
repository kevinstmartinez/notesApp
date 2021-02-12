const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path')
const session = require('express-session')
const mysqlStore = require('express-mysql-session')
const passport = require('passport')

const { database } = require('./keys')

require('./lib/passport')

const app = express()
const port = process.env.PORT || 3000

/* settings */
app.listen(port, ()=>{
  console.log(`Listen on port ${port}`)
})
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname:'.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

/* middlewares */
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
  secret: 'mysqlnodesession',
  resave: false,
  saveUninitialized: false,
  store: new mysqlStore(database)
}))
app.use(passport.initialize())
app.use(passport.session())

/* globals */
app.use((req, res, next)=>{
  app.locals.user = req.user
  next()
})
/* routes */
app.use(require('./routes'))
app.use(require('./routes/authentication'))
app.use('/notes',require('./routes/notes'))

