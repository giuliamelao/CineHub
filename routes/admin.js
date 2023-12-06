const express = require('express');
const router = express.Router();
const { UserModel } = require('../model/bd')

const Auth = require('../helpers/Auth');

router.get('/admin-page', Auth.validator, (req, res) => {
        // #swagger.summary = 'Admin Page, access to routes to add, delete, edit mods and users' 
        res.json({ message: 'Welcome to the Admin Page! 👑 Here you can add and delete Moderators' });
});


router.post('/admin-page/add-admin', Auth.isAdmin, async (req, res) => {
        // #swagger.summary = 'Route to add other admins, only admins can access' 
        try {
                const { nome, username, password } = req.body;
                const newAdmin = await UserModel.create({
                        nome,
                        username,
                        password,
                        role: 'admin',
                });

                res.json({ message: 'Admin added successfully!', admin: newAdmin });
        } catch (error) {
                console.error('Error adding admin:', error);
                res.status(500).json({ mensagem: 'Error adding admin' });
        }

    });
    



router.post('/admin-page/add-moderator', Auth.isAdmin, async (req, res) => {
        // #swagger.summary = 'Page to add moderators, only admin can access' 
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
    



    
router.delete('/admin-page/delete-moderator/:id', Auth.isAdmin, async (req, res) => {
        // #swagger.summary = 'Page to delete moderators, only admin can access' 
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



router.delete('/admin-page/delete-user/:id', Auth.isAdmin, async (req, res) => {
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

router.put('/admin-page/edit-user-info/:id', Auth.isAdmin, async (req, res) => {
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

   


module.exports = router;
