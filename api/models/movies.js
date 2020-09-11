const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    released_on: {
        type: Date,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Movie', movieSchema)