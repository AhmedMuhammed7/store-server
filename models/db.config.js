const mongoose = require('mongoose')


const dataBaseName = 'woodie'
const URL = `mongodb://localhost:27017/${dataBaseName}`

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => console.log(err))

