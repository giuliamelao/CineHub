const express = require('express')
const router = express.Router()

const MoviesModel = require('../model/Movies')

router.get('/', (req, res) => {
        let list = MoviesModel.list()

        if (req.query.title) {
                list = MoviesModel.listByTitle(req.query.title)
        } else if (req.query.director) {
                list = MoviesModel.listByDirector(req.query.director)
        }

        res.json({count: list.length, lista: list})
})

router.get('/:id', (req, res) => {
        let obj = MoviesModel.getElementById(req.params.id)
        if (obj) {
                res.json({obj: obj})
        } else {
                res.status(404).json({mensagem: "O ID não é válido"})
        }
})


module.exports = router