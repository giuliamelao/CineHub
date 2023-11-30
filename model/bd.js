const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: './database.sqlite'
})



const UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'moderator', 'user'),
            defaultValue: 'user',
        },
    });
    


const MovieModel = sequelize.define('Movie', {
        movie_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
        },
        title: {
                type: DataTypes.STRING,
                allowNull: false
        },
        year: {
                type: DataTypes.INTEGER,
                allowNull: false
        },
        director: {
                type: DataTypes.STRING,
                allowNull: false
        },
        genre: {
                type: DataTypes.STRING,
                allowNull: false
        }
})

const ReviewModel = sequelize.define('Review', {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
    
// Establishing Relationships
UserModel.hasMany(ReviewModel);
MovieModel.hasMany(ReviewModel);
ReviewModel.belongsTo(UserModel);
ReviewModel.belongsTo(MovieModel);


module.exports = {
        sequelize: sequelize,
        UserModel: UserModel,
        MovieModel: MovieModel,
        ReviewModel: ReviewModel
};

