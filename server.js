const express = require('express')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

//connecting database
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))

//Define Routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))

//Server static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
