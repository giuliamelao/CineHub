const express = require('express');
const router = express.Router();
const Auth = require('../helpers/Auth');
const { MovieModel } = require('../model/bd');


router.get('/mod-page', Auth.validator, (req, res) => {
        // #swagger.summary = 'Mod Page, add, edit, delete and view movies. Also edit or delete users' 
        res.json({ message: 'Welcome to the Mod Page! 🎬 Here you can manage Movies. (you may delete users if you wish)' });
});

router.delete('/mod-page/delete-user/:id', Auth.validator, async (req, res) => {
        // #swagger.summary = 'Page to delete users, admin and moderator can access' 
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

router.put('/mod-page/edit-user-info/:id', Auth.isAdmin, async (req, res) => {
        // #swagger.summary = 'Page to edit user info, admin and moderator can access' 
        try {
                const userId = req.params.id;
                const { password, nome } = req.body;

                const updateUser = await UserModel.update(
                        { password, nome },
                        { where: { id: userId } }
                );

                if (updateUser[0]) {
                        res.json({ mensagem: 'User updated successfully!' });
                } else {
                        res.status(404).json({ mensagem: 'User not found' });
                }
        } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ mensagem: 'Error updating user' });
        }
});

/////////


router.get('/mod-page/movies', Auth.validator, async (req, res) => {
        // #swagger.summary = 'View all movies, limit movies per page and choose the number of page by body params' 
        try {
            const { limit, page } = req.body;
            const offset = (page - 1) * limit;

            const movies = await MovieModel.findAll({
                limit: parseInt(limit),
                offset: offset,
            });

            res.json({ movies });
        } catch (error) {
            console.error('Error getting all movies: ', error);
            res.status(500).json({ mensagem: 'Error getting all movies' });
        }
});
    
router.post('/mod-page/add-movie', Auth.validator, async (req, res) => {
        // #swagger.summary = 'Add movies, only moderators' 
        try {
                const { title, year, director, genre } = req.body;
                const newMovie = await MovieModel.create({ title, year, director, genre });
                res.json({ newMovie });
        } catch (error) {
                console.error('Error adding movie:', error);
                res.status(500).json({ mensagem: 'Error adding movie' });
        }
});
    
router.put('/mod-page/edit-movie/:id', Auth.validator, async (req, res) => {
        // #swagger.summary = 'Edit movies, only moderators' 
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
    
router.delete('/mod-page/delete-movie/:id', Auth.validator, async (req, res) => {
        // #swagger.summary = 'Delete movies, only moderators'
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
