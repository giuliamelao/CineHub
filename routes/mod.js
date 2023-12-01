const express = require('express');
const router = express.Router();
const Auth = require('../helpers/Auth');
const { MovieModel } = require('../model/bd');


router.get('/mod-page', Auth.validator, (req, res) => {
    res.json({ message: 'Welcome to the Mod Page! 🎬 Here you can manage Movies. (you may delete users if you wish)' });
});

router.delete('/mod-page/delete-user/:id', authenticateUser, async (req, res) => {
        try {
                const userId = req.params.id;
                const deletedUser = await UserModel.destroy({
                where: {
                        id: userId,
                        role: 'user',
                },
                });

                if (deletedUser) {
                res.json({ mensagem: 'User deleted successfully!' });
                } else {
                res.status(404).json({ mensagem: 'User not found' });
                }
        } catch (error) {
                console.error('Error deleting moderator:', error);
                res.status(500).json({ mensagem: 'Error deleting moderator' });
        }
});

/////////


router.get('/mod-page/movies', authenticateUser, async (req, res) => {
        try {
            const movies = await MovieModel.findAll();
            res.json({ movies });
        } catch (error) {
            console.error('Error getting all movies: ', error);
            res.status(500).json({ mensagem: 'Error getting all movies' });
        }
});
    
router.post('/mod-page/add-movie', authenticateUser, async (req, res) => {
        try {
                const { title, year, director, genre } = req.body;
                const newMovie = await MovieModel.create({ title, year, director, genre });
                res.json({ newMovie });
        } catch (error) {
                console.error('Error adding movie:', error);
                res.status(500).json({ mensagem: 'Error adding movie' });
        }
});
    
router.put('/mod-page/edit-movie/:id', authenticateUser, async (req, res) => {
        try {
                const movieId = req.params.id;
                const { title, year, director, genre } = req.body;

                const updatedMovie = await MovieModel.update(
                        { title, year, director, genre },
                        { where: { movie_id: movieId } }
                );

                if (updatedMovie[0]) {
                        res.json({ mensagem: 'Movie updated successfully!' });
                } else {
                        res.status(404).json({ mensagem: 'Movie not found' });
                }
        } catch (error) {
                console.error('Error updating movie:', error);
                res.status(500).json({ mensagem: 'Error updating movie' });
        }
});
    
router.delete('/mod-page/delete-movie/:id', authenticateUser, async (req, res) => {
        try {
                const movieId = req.params.id;
                const deletedMovie = await MovieModel.destroy({ where: { movie_id: movieId } });

                if (deletedMovie) {
                        res.json({ mensagem: 'Movie deleted successfully!' });
                } else {
                        res.status(404).json({ mensagem: 'Movie not found' });
                }
        } catch (error) {
                console.error('Error deleting movie:', error);
                res.status(500).json({ mensagem: 'Error deleting movie' });
        }
});



module.exports = router;
