const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.post("/login", (req, res) => {
        let {user, password} = req.body
        if (user != "" && user == password) {
                let token = jwt.sign({user: user}, '123456', {expiresIn: '10 min'})
                res.json({logged: true, token: token})
        } else {
                res.status(403).json({logged: false, mensagem: 'User and password invalid'})
        }
})

module.exports = router