// Dependencies
const express = require('express');
const mongoose = require('mongoose')
<<<<<<< HEAD
const db = mongoose.connection;

=======
const cors = require('cors')
>>>>>>> f825755e3c3e6486bce379320462e10dfa9dac32

// CONFIG
const app = express();
const PORT = 3003;
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json()) // use .json(), not .urlencoded()

const whitelist = ['http://localhost:3003', 'https://fathomless-sierra-68956.herokuapp.com']
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
mongoose.connect('mongodb://localhost:27017/tasks', {               
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
 })
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...')
})

//Controllers/Routes
const tasksController = require('./controllers/task_controller.js')
app.use('/tasks', tasksController)

// LISTENER
app.listen(PORT, () => { console.log('five by five on ', PORT) });