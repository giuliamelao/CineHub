const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { UserModel } = require('../model/bd');



router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;

        const user = await UserModel.findOne({
            where: { username: username, password: password },
        });

        // If the user can't be found
        if (!user) {
            return res.status(403).json({ logged: false, message: 'Invalid username or password' });
        }

        // Valid user, generate JWT token
        let token = jwt.sign({ user: user.username, role: user.role }, '123456', {expiresIn: '30min'});
        res.json({logged: true, token: token})


        // Redirects for each role in UserModel
        if (user.role === 'admin') {
            res.json({ logged: true, token: token, redirectTo: '/admin-page' });
        } else if (user.role === 'user') {
            res.json({ logged: true, token: token, redirectTo: '/user-page' });
        } else if (user.role === 'moderator') {
            res.json({ logged: true, token: token, redirectTo: '/mod-page' });
        } else {
            // In case of error, this will handle
            res.status(403).json({ logged: false, message: 'Invalid user role' });
        }
    } catch (error) {
        // In case of error, this will handle
        console.error('Could not login. Error:', error);
        res.status(500).json({ logged: false, message: 'Login error.' });
    }
});

module.exports = router
