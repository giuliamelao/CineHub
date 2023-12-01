const { MoviesModel } = require('./bd')


module.exports = {
        save: async (title, year, director, genre) => {
                try {
                    const movie = await MovieModel.create({
                        title: title,
                        year: year,
                        director: director,
                        genre: genre
                    });
                    return movie;
                } catch (error) {
                    console.error('Error while saving movie:', error);
                    throw error;
                }
            },

        update: async (id, title, year, director, genre) => {
                try {
                        const movie = await MovieModel.findByPk(id);

                        if (movie) {
                        movie.title = title;
                        movie.year = year;
                        movie.director = director;
                        movie.genre = genre;

                        await movie.save();
                        return movie;
                        }
                        return null;
                } catch (error) {
                        console.error('Error while updating movie:', error);
                        throw error;
                }
        },

        list: async () => {
                try {
                        return await MovieModel.findAll();
                } catch (error) {
                        console.error('Error fetching movies:', error);
                        throw error;
                }
        },

        listByTitle: async (title) => {
                try {
                        const movies = await MovieModel.findAll({
                        where: {
                                title: {
                                [sequelize.Op.iLike]: `${title}%`
                                }
                        }
                        });
                        return movies;
                } catch (error) {
                        console.error('Error listing movies by title:', error);
                        throw error;
                }
        },

        listByDirector: async (director) => {
                try {
                        const movies = await MovieModel.findAll({
                        where: {
                                director: {
                                [sequelize.Op.iLike]: `${director}%`
                                }
                        }
                        });
                        return movies;
                } catch (error) {
                        console.error('Error listing movies by director:', error);
                        throw error;
                }
        },

        getPositionById: async (id) => {
                try {
                        const movie = await MovieModel.findByPk(id);
                        if (movie) {
                        return movie.id;
                        }
                        return -1;
                } catch (error) {
                        console.error('Error:', error);
                        throw error;
                }
        },

        getElementById: async (id) => {
                try {
                        const movie = await MovieModel.findByPk(id);
                        return movie || null;
                } catch (error) {
                        console.error('Error getting movie by id:', error);
                        throw error;
                }
        },

        delete: async (id) => {
                try {
                        const result = await MovieModel.destroy({
                                where: {
                                        movie_id: id
                                }
                        });
                        return result > 0; // retorna true se deletar com sucesso
                } catch (error) {
                        console.error('Error while deleting movie:', error);
                        throw error;
                }
        }
}