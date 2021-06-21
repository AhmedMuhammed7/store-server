const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
//env varaibles
dotenv.config()
const port = process.env.PORT || 4000

//Import routes
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const projectRoute = require('./routes/project')
const cartRoute = require('./routes/cart')
const serviceRoute = require('./routes/service')
const swaggerRouter = require('./routes/swagger')

//database config
require('./models/db.config')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

//routes Middelwars
app.get('/',(req,res)=> res.send('Welcome to our store API'))
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/projects', projectRoute)
app.use('/api/carts', cartRoute)
app.use('/api/services', serviceRoute)
app.use('/api-docs', swaggerRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use((req, res) => {
  return res.status(404).send('Error 404')
})

app.listen(port, () =>
  console.log(`server running : http://localhost:${port}`)
)

