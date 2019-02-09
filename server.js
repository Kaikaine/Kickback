const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

const users = require('./routes/api/users')
const messages = require('./routes/api/messages')
const events = require('./routes/api/events')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// USE routes
app.use('/api/users', users)
app.use('/api/messages', messages)
app.use('/api/events', events)

const db = require('./config/keys').mongoURI

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

const port = process.env.PORT || 5000;

app.get('/', (req,res) => (
    res.send('Hello')
))

app.listen(port, () => {
    console.log("App is running on port " + port);
});