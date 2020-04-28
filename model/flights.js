const mongoose = require('mongoose')


// creating flights

const flightObj = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },

});


module.exports = mongoose.model('flight', flightObj)