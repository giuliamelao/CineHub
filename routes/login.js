const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const { UserModel } = require('../model/bd');



router.post('/login', async (req, res) => {
    // #swagger.summary = 'login, access for admin, mods and users' 
    try {
        let { username, password } = req.body;

        const user = await UserModel.findOne({
            where: { username: username, password: password },
        });

        if (!user) {
            return res.status(403).json({ logged: false, message: 'Invalid username or password' });
        }

        let token = jwt.sign({ user: user.username, role: user.role }, '123456', {expiresIn: '2d'});
        res.json({logged: true, token: token})

    } catch (error) {
        console.error('Could not login. Error:', error);
        res.status(500).json({ logged: false, message: 'Login error.' });
    }
});

module.exports = router
