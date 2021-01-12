const express = require('express')
const router = express.Router()
const pool = require('../database')
const helpers = require('../lib/helpers')

router.get('/insert', helpers.isLogged, (req, res)=>{
  res.render('notes/insert')
})

router.post('/insert', helpers.isLogged, async (req, res) =>{
  const { title, content } = req.body
  const newNote ={
    title,
    content
  }
  await pool.query('INSERT INTO notesT set ?', [newNote])
  res.redirect('/notes')
})

router.get('/', helpers.isLogged, async (req, res) =>{
  const notes = await pool.query('SELECT * FROM notesT')
  res.render('notes/listNotes.hbs', { notes })
})

router.get('/edit/:id', helpers.isLogged, async (req, res) =>{
  const { id } = req.params
  const notes = await pool.query('SELECT * FROM notesT WHERE id=?', [id])
  res.render('notes/edit.hbs', { notes: notes[0]})
})

router.post('/edit/:id', helpers.isLogged, async (req, res) =>{
  const { id } = req.params
  const { title, content } = req.body
  const newNote ={
    title, 
    content
  }
  await pool.query('UPDATE notesT set ? WHERE id=?', [newNote, id])
  res.redirect('/notes')
})

router.get('/delete/:id', helpers.isLogged, async (req, res) =>{
  const { id } = req.params
  await pool.query('DELETE FROM notesT WHERE id = ?', [id])
  res.redirect('/notes')
})


module.exports = router