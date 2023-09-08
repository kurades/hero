const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const TagSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
})

const TagModel = mongoose.model('Tag', TagSchema)

module.exports = { TagModel }