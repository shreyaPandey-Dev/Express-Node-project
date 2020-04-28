// token api 
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router()
const user = require('../model/users')
require('dotenv').config()





// login
router.post('/token', async (req, res) => {
    // this is for login (JWT AUTH)
    // req milegi, res bhejenge-- bckend
    console.log(req.body, "Login Object")
    const { username, password } = req.body;

    var privateKey = process.env.privatekey.replace(/\\n/gm, '\n');

    if (username == null || password == null) {
        res.status(400).json()
    }
    try {
        var userx = await user.findOne({
            username: username,
            password: password
        });
        if (userx) {
            // jwt token banan h
            var token = jwt.sign({
                    user: userx.username,
                    role: userx.designation
                },
                privateKey, {
                    expiresIn: '15m',
                    algorithm: 'PS512'
                }
            )


            var responseobj = {
                accessToken: token,
                username: userx.username,
                roleid : userx.designation
            }
            res.status(200).json(responseobj)


        } else {
            res.status(404).json()
        }

    } catch (error) {
    }

})

//logout
router.get('/logout', function(req, res) {
    console.log('logout auth')
  });

module.exports = router