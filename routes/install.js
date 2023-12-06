const express = require('express')
const router = express.Router()

const {sequelize, MovieModel} = require('../model/bd')


router.get('/install', async function(req, res, next) {
        await sequelize.sync({force: true})
        res.json({mensagem: "Hello Giulia 🦊🦝, database updated"})
})

const { UserModel } = require('../model/bd');

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
    
    async function createMovies() {
        try {
            const findMovie1 = await MovieModel.findOne({
                where: { title: 'Laranja Mecânica' },
            });
            if (!findMovie1) {
                await MovieModel.create({
                    title: 'Laranja Mecânica',
                    year: '1971',
                    director: 'Stanley Kubrick',
                    genre: 'Thriller'
                });
      
                console.log('Movie1 created successfully.');
            } else {
                console.log('Movie1 already exists.');
            }

            const findMovie2 = await MovieModel.findOne({
                where: { title: 'Handmaiden' },
            });
            if (!findMovie2) {
                await MovieModel.create({
                    title: 'Handmaiden',
                    year: '2016',
                    director: 'Park Chan-wook',
                    genre: 'Drama'
                });
      
                console.log('Movie2 created successfully.');
            } else {
                console.log('Movie2 already exists.');
            }

            const findMovie3 = await MovieModel.findOne({
                where: { title: 'Van Helsing' },
            });
            if (!findMovie3) {
                await MovieModel.create({
                    title: 'Van Helsing',
                    year: '2004',
                    director: 'Stephen Sommers',
                    genre: 'Horror'
                });
      
                console.log('Movie3 created successfully.');
            } else {
                console.log('Movie3 already exists.');
            }

            const findMovie4 = await MovieModel.findOne({
                where: { title: 'Her' },
            });
            if (!findMovie4) {
                await MovieModel.create({
                    title: 'Her',
                    year: '2013',
                    director: 'Spike Jonze',
                    genre: 'Drama'
                });
      
                console.log('Movie4 created successfully.');
            } else {
                console.log('Movie4 already exists.');
            }

            const findMovie5 = await MovieModel.findOne({
                where: { title: 'Insidious' },
            });
            if (!findMovie5) {
                await MovieModel.create({
                    title: 'Insidious',
                    year: '2010',
                    director: 'James Wan',
                    genre: 'Horror'
                });
      
                console.log('Movie5 created successfully.');
            } else {
                console.log('Movie5 already exists.');
            }
        } catch (error) {
            console.error('Error creating Movie5:', error);
        }
}

createAdminUser();
createMods();
createUsers();
createMovies()

module.exports = router