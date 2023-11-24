const express = require('express')
const router = express.Router()

const Auth = require('../helpers/Auth')
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
                res.status(400).json({mensagem: "O ID não é válido"})
        }
})

router.post('/', Auth.validator, (req, res) => {
        let {title, year, director, genre} = req.body
        if (title && year && director && genre) {
                let obj = MoviesModel.save(title, year, director, genre)
                res.json({obj: obj})
        } else {
                res.status(400).json({mensagem: "Falha ao adicionar filme"})
        }
})    


router.put('/:id', (req, res) => {
        let {title, year, director, genre} = req.body
        let id = req.params.id

        if (id && title && year && director && genre) {
                let obj = MoviesModel.update(id, title, year, director, genre)
                if (obj) {
                        res.json({obj: obj}) 
                } else {
                        res.status(400).json({mensagem: "ID not found"})
                }
        } else {
                res.status(400).json({mensagem: "Falha ao atualizar filme"})
        }
})


router.delete('/:id', (req, res) => {
        let id = req.params.id
        if (MoviesModel.delete(id)) {
                res.json({mensagem: "Filme deletado"})
        } else {
                res.status(400).json({mensagem: "Falha ao deletar filme"})
        }
})



module.exports = router