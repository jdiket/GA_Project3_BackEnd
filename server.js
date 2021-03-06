// Dependencies
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const db = mongoose.connection;
const axios = require('axios');

console.log(process.env.MONGODB_URI);
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


// CONFIG
const app = express();

//Middleware
app.use(express.json()) // use .json(), not .urlencoded()

// CORS
const whitelist = ['http://localhost:3000', 'mongodb://localhost:27017/tasks','https://task-project3-frontend.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))

//Database Error/Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//Database Connection
mongoose.connect(MONGODB_URI ,  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => {
    console.log('connected to mongoose...')
})

app.get('/affirmations', (req, res) => {
    axios.get('https://www.affirmations.dev/')
        .then((data) => {
            res.send(data.data)
        })
})

//Controllers/Routes
const tasksController = require('./controllers/task_controller.js')
app.use('/tasks', tasksController)

// LISTENER
app.listen(PORT, () => { console.log('five by five on ', PORT) });