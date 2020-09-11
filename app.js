const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

//connect mongo db
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

//public routes
app.use('/users', userRouter)

//private routes
app.use('/movies', validateUser,  movieRouter)

app.get('/', (req, res) => {
    res.json({ "tutorial": "Build REST API with node.js" });
})

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });

}
//404 errror
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//handle common errors

app.use((req, res, next) => {
    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
})

app.listen(3003, () => {
    console.log(`server running http://localhost:3003`);
});