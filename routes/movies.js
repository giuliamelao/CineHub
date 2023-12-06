const express = require('express');
const router = express.Router();
const { MovieModel } = require('../model/bd');

router.get('/', async (req, res) => {
    // #swagger.summary = 'Movies page, see all the movies, no login needed everyone can see the catalogue' 
    try {
        const movies = await MovieModel.findAll();
        res.json({ count: movies.length, lista: movies });
    } catch (error) {
        console.error('Error gettin movies:', error);
        res.status(500).json({ mensagem: 'Error getting movies' });
    }
});

module.exports = router;
