const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     username: {
//       type: String,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true,
     
//     },
//     role:{
//       type:Number,
//       required:true
//     }
//   })
  


// name: string;
// username: string;
// password: string;
// _id: number;
// gender: string;
// designation: string;


const userObj = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    designation: {
        type: Number,
        required: true
    }
})


  module.exports = mongoose.model('user', userObj)