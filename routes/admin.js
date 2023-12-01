const express = require('express');
const router = express.Router();
const { UserModel } = require('../model/bd')

const Auth = require('../helpers/Auth');

router.get('/admin-page', Auth.validator, (req, res) => {
    res.json({ message: 'Welcome to the Admin Page! 👑 Here you can add and delete Moderators' });
});

router.post('/admin-page/add-moderator', Auth.validator, async (req, res) => {
        try {
            const { nome, username, password } = req.body;
            const newModerator = await UserModel.create({
                nome,
                username,
                password,
                role: 'moderator',
            });
    
            res.json({ message: 'Moderator added successfully!', moderator: newModerator });
        } catch (error) {
            console.error('Error adding moderator:', error);
            res.status(500).json({ mensagem: 'Error adding moderator' });
        }
});
    
router.delete('/admin-page/delete-moderator/:id', Auth.validator, async (req, res) => {
        try {
                const moderatorId = req.params.id;
                const deletedModerator = await UserModel.destroy({
                where: {
                        id: moderatorId,
                        role: 'moderator',
                },
                });

                if (deletedModerator) {
                res.json({ mensagem: 'Moderator deleted successfully!' });
                } else {
                res.status(404).json({ mensagem: 'Moderator not found' });
                }
        } catch (error) {
                console.error('Error deleting moderator:', error);
                res.status(500).json({ mensagem: 'Error deleting moderator' });
        }
});



router.delete('/admin-page/delete-user/:id', Auth.validator, async (req, res) => {
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

   


module.exports = router;
