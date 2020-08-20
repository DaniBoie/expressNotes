const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GET all items
router.get('/notes', (req, res) => {
  //READ the database file directory
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    //SEND back json that is the text turned into json
    res.json(JSON.parse(data))
  })
})

// POST one item
router.post('/notes', (req, res) => {

  //Reads the database file and uses the data off of it to create a new object
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    //Creating a varible that is the array of objects in the database file
    let notes = JSON.parse(data)
    //Creating a new item object that takes in request data and adds a unique ID
    let note = {
      id: uuid.v1(),
      title: req.body.title,
      text: req.body.text
    }
    //Pushes the new item into the old items array
    notes.push(note)

    //Overwrites the database information with the newly added to array of objects
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'),
      //stringify is taking data (array "items" in this case) and making it as text.
      JSON.stringify(notes), err => {
        if (err) { console.log(err) }

        //then sends the new item object back as a response to the front-end
        res.json(note)
      })
  })
})

// DELETE one item
router.delete('/notes/:id', (req, res) => {

  // Reads form the database file 
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    // Sets database data into an items variable
    let notes = JSON.parse(data)
    // Filter the array of items and take out the corresponding item ID
    notes = notes.filter(note => note.id !== req.params.id)

    // Overwrites the database file with the stringified version of the items array and sends back status 200
    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router
