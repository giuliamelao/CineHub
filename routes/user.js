const express = require('express');
const router = express.Router();
const Auth = require('../helpers/Auth');
const { MovieModel, UserModel } = require('../model/bd');


router.get('/user-page', Auth.validator, (req, res) => {
    res.json({ message: 'Welcome to the User Page! 🎬 Here you can view the movie list and leave a note or review!' });
});

router.put('/user-page/edit-info/:id', Auth.validator, async (req, res) => {
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


module.exports = router;