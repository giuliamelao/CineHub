const express = require('express')
const router = express.Router()

const {sequelize} = require('../model/bd')

router.get('/install', async function(req, res, next) {
        await sequelize.sync({force: true})
        res.json({mensagem: "Hello Giulia 🦊🦝, database updated"})
})

module.exports = router