const movieModel = require('../models/movies');

module.exports = {

    getById: function (req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, function (err, movieInfo) {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Movie found!!!", data: { movies: movieInfo } });
            }
        });
    },
    getAll: function (req, res, next) {
        let moviesList = [];
        movieModel.find({}, (err, movies) => {
            if (err) {
                next(err)
            } else {
                if (movies.length) {
                    for (let movie of movies) {
                        moviesList.push({ id: movie._id, name: movie.name, released_on: movie.released_on });
                    }
                    res.json({ status: "success", message: "Movies list found!!!", data: { movies: moviesList } });
                } else {
                    res.json({ status: "success", message: "Movies list not found!!!", data: { movies: [] } });
                }

            }
        })
    },
    updateById: function (req, res, next) {
        movieModel.findByIdAndUpdate(req.params.movieId, { name: req.body.name }, (err, result) => {
            if (err) {
                next(err);
            } else {
                res.json({ status: "success", message: "Movie updated successfully!!!", data: result });
            }
        })
    },
    deleteById: function (req, res, next) {
        movieModel.findByIdAndRemove(req.params.movieId, (err, movieInfo) => {
            if (err) {
                next(err);
            } else {
                res.json({ status: 'success', message: 'deleted successfullu', data: movieInfo })
            }
        })
    },
    create: (req, res, next) => {
        movieModel.create({ name: req.body.name, released_on: req.body.released_on }, (err, movie) => {
            if (err) {
                next(err)
            } else {
                res.json({ status: 'success', message: 'movie added successfullu', data: movie })
            }

        })
    }
}