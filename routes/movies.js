const express = require('express');
const router = express.Router();
const { MovieModel } = require('../model/bd');

router.get('/', async (req, res) => {
    try {
        const movies = await MovieModel.findAll();
        res.json({ count: movies.length, lista: movies });
    } catch (error) {
        console.error('Error gettin movies:', error);
        res.status(500).json({ mensagem: 'Error getting movies' });
    }
});

module.exports = router;
