//crud user


const express = require('express')
const router = express.Router()
const user = require('../model/users')
// const role = require('../models/roles')
// const middle = require('../middleware/authguard')
const middlewr = require('../middleware/auth')



// Get all subscribers
router.get('/' , async (req, res) => {
   try {
       const users = await user.find();
       res.json(users);
    //    Object.values(users);
   } catch (error) {
       
   }
})

// Get one subscriber
router.get('/:id', async (req, res) => {

// id me milega username
// console.log id
//get by id {username} agar username bhej re h 

console.log('PARAMS-',req.params)
try {
    var userx = await user.findOne({username:req.params.id});
    if(userx){
        res.status(200).json(userx)
    } else {
        res.status(404).json()
    }
    
} catch (error) {
    
}
    
})

router.get("/findbyName/:name")

// Create one user
router.post('/', (req, res) => {
  
    // if(req.role != 1)
    // {
    //     res.status(401).json({message:"Unauthorized Request"})
    // }
    var obj = new user(req.body)
    try {
        obj.validate().catch(err => { res.status(400).json({message:"Invalid Object"})});

    } catch (error) {
        
    }
   
        var userObj = new user({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            designation: req.body.designation,
        }) 
        try {
            const obj =  userObj.save().then(resp => { res.status(201).json(resp);} );
    
        } catch (error) {
            res.status(400).json({ message: err.message })
    
        }
})


//update 
router.put('/:id', middlewr.adminauth,async (req, res) => {
    console.log("user UPDATE ONE",req.params);

    try{
        var resultuser = await user.updateOne({_id:req.params.id},req.body);
        if(resultuser){
            res.status(200).json(resultuser)
            console.log('updated successfully')
        } else {
            res.status(404).json()
        }
    } catch(error){
        res.status(404).json()
        console.log("error in updating user")
    }
})


//delete user
router.delete('/:id', middlewr.adminauth,async (req, res) => {

    // findOneAndDelete
    try{
        var resultuser = await user.findOneAndDelete({_id:req.params.id});
        if(resultuser){
            res.status(200).json(resultuser)
            console.log('deleted successfully')
        } else {
            res.status(404).json()
        }
    } catch(error){
        res.status(404).json()
        console.log("error in deleting user")
    }
})




module.exports = router