const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()

const userroutes = require('./routes/user_routes');
const flightroutes = require('./routes/flight_routes');
const auth = require('./routes/auth_route');

var compression = require('compression');
var helmet = require('helmet');


app.use(cors())
app.use(bodyParser.json());

// SECURITY
app.use(helmet());
app.use(compression());
// SECURITY

// DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => { console.log('connected to database'); console.log(db.name)})
// DB

// Custom Routes
app.use('/users',userroutes);
app.use('/flights',flightroutes);
app.use('/auth',auth);
// Custom ROutes

// RUN APPLICATION
app.listen(3000, () => {
  console.log('Authentication service started on port 3000');
});






