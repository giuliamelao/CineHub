let ids = 0;
let movies = [];

module.exports = {
        save(title, year, director, genre) {
                let obj = {id: ++ids, title: title, year: year, director: director, genre: genre}
                movies.push(obj)
                return obj
        },
        update(id, title, year, director, genre) {
                let pos = this.getPositionById(id)
                if (pos>= 0) {
                        let obj = {id: id, title: title, year: year, director: director, genre: genre}
                        movies[pos] = obj
                        return movies[pos]
                }
                return null
        },
        list(){
                return movies
        },
        listByTitle(title) {
                let lista = []
                for (let i=0 ; i<movies.length ; i++) {
                        if (movies[i].title.toUpperCase().startsWith(title.toUpperCase())) {
                                lista.push(movies[i])
                        }
                }
                return lista;
        },
        listByDirector(director) {
                let lista = []
                for (let i=0 ; i<movies.length ; i++) {
                        if (movies[i].director.toUpperCase().startsWith(director.toUpperCase())) {
                                lista.push(movies[i])
                        }
                }
                return lista;
        },
        getPositionById(id) {
                for (let i=0 ; i<movies.length ; i++) {
                        if (movies[i].id == id) {
                                return i;
                        }
                }
                return -1;
        },
        getElementById(id) {
                let pos = this.getPositionById(id)
                if (pos >= 0) {
                        return movies[pos];
                }
                return null;
        },
        delete(id) {
                let i = this.getPositionById(id);
                if (i >= 0) {
                        movies.splice(i, 1);
                        return true;
                }
                return false;
        }

}