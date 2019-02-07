const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

const users = require('./routes/api/users')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// USE routes
app.use('/api/users', users)

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