const express = require('express');
const router = express.Router();
const { UserModel } = require('../model/bd');

router.post('/signup', async (req, res) => {
    // #swagger.summary = 'Sign Up page, allow users to create an account and verify disponibility of username' 
    try {
        const { nome, username, password } = req.body;

        const existingUser = await UserModel.findOne({ where: { username } });

        if (existingUser) {
            return res.status(400).json({ mensagem: "Username already exists. Choose a different one" });
        }

        const newUser = await UserModel.create({
            nome,
            username,
            password,
            role: 'user',
        });

        res.status(201).json({ mensagem: "User created successfully", user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ mensagem: "Error creating user" });
    }
});

module.exports = router;
