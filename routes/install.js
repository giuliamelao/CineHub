const express = require('express')
const router = express.Router()

const {sequelize} = require('../model/bd')

router.get('/install', async function(req, res, next) {
        await sequelize.sync({force: true})
        res.json({mensagem: "Hello Giulia 🦊🦝, database updated"})
})

const { UserModel } = require('./model/bd');

async function createAdminUser() {
        try {
            const findAdmin = await UserModel.findOne({
                where: { role: 'admin' },
            });
      
            if (!findAdmin) {
                await UserModel.create({
                    nome: 'Admin',
                    username: 'admin',
                    password: 'admin',
                    role: 'admin',
                });
      
                console.log('Admin created successfully.');
            } else {
                console.log('Admin already exists.');
            }
        } catch (error) {
            console.error('Error creating admin:', error);
        }
}

async function createMods() {
        try {
                const findMod1 = await UserModel.findOne({
                        where: { username: 'moderator1' },
                });
        
                if (!findMod1) {
                        await UserModel.create({
                                nome: 'Moderator1',
                                username: 'moderator1',
                                password: 'moderator1',
                                role: 'moderator',
                        });
                }

                const findMod2 = await UserModel.findOne({
                        where: { username: 'moderator2' },
                });
              
                if (!findMod2) {
                        await UserModel.create({
                                nome: 'Moderator2',
                                username: 'moderator2',
                                password: 'moderator2',
                                role: 'moderator',
                        });
      
                console.log('Moderators created successfully.');
            } else {
                console.log('Moderators already exist.');
            }
        }catch (error) {
                console.error('Error creating mods:', error);
        }
}
      
async function createUsers() {
        try {
            const findUser1 = await UserModel.findOne({
                where: { username: 'user1' },
            });
    
            if (!findUser1) {
                await UserModel.create({
                    nome: 'User1',
                    username: 'user1',
                    password: 'user1',
                    role: 'user',
                });
            }
    
            const findUser2 = await UserModel.findOne({
                where: { username: 'user2' },
            });
    
            if (!findUser2) {
                await UserModel.create({
                    nome: 'User2',
                    username: 'user2',
                    password: 'user2',
                    role: 'user',
                });
          
                console.log('Users created successfully.');
            } else {
                console.log('Users already exist.');
            }
        } catch (error) {
            console.error('Error creating users:', error);
        }
    }
    


createAdminUser();
createMods();
createUsers();

module.exports = router