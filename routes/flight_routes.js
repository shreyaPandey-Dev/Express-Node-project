//crud for flights

const express = require('express')
const router = express.Router()
const flight = require('../model/flights')
const middlewr = require('../middleware/auth')
const odata = require('odata-v4-mongodb')

//create one flight
router.post('/', middlewr.adminauth,(req, res) => {
    var obj = new flight(req.body)
    try {
        obj.validate().catch(err => { res.status(400).json({message:"Invalid Object"})});

    } catch (error) {
        
    }
        var flightObj = new flight({
            name: req.body.name,
            origin: req.body.origin,
            destination: req.body.destination,
            fare: req.body.fare,
            type: req.body.type
        }) 
        try {
            const obj =  flightObj.save().then(resp => { res.status(201).json(resp);} );
    
        } catch (error) {
            res.status(400).json({ message: err.message })
    
        }
});


//get all flights
router.get('/', middlewr.userauth , async (req, res) => {
    var query = req.query;
    console.log("QUERY=",query)

    var queryparams = Object.entries(query).map(([key, value]) => { return key + '=' + value} ).join('&')
    var odataquery = odata.createQuery(queryparams)
    try {
        const flights = await flight.find(odataquery.query)
        .limit(odataquery.limit)
        .sort(odataquery.sort)
        .skip(odataquery.skip);
        
        res.json(flights);
    } catch (error) {
        console.log("error in getting flight")
    }
}
)


//get one flight by name,
// fare, origin tbd
router.get('/:id', middlewr.adminauth,async (req, res) => {
    console.log("FLIGHT GET ONE",req.params);
    try {
        var resultflight = await flight.findOne({name:req.params.id});
        if(resultflight){
            res.status(200).json(resultflight)
        } else {
            res.status(404).json()
        }
    } catch (error) {
        console.log("error in gtting flight")
    }

});



//update 
router.put('/:id', middlewr.adminauth,async (req, res) => {
    console.log("FLIGHT UPDATE ONE",req.params);
    try{
        var resultflight = await flight.updateOne({_id:req.params.id},req.body);
        if(resultflight){
            res.status(200).json(resultflight)
            console.log('updated successfully')
        } else {
            res.status(404).json()
        }
    } catch(error){
        console.log("error in updating flight")
    }
})


//delete flight
router.delete('/:id', middlewr.adminauth,async (req, res) => {
    // findOneAndDelete
    try{
        var resultflight = await flight.findOneAndDelete({_id:req.params.id});
        if(resultflight){
            res.status(200).json(resultflight)
            console.log('deleted successfully')
        } else {
            res.status(404).json()
        }
    } catch(error){
        console.log("error in deleting flight")
    }
})

// search flights



module.exports = router;