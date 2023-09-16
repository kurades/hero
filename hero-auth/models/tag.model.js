const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const TagSchema = new Schema({
    name: {
        type: String,
    },
    uid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

const TagModel = mongoose.model('Tag', TagSchema)

module.exports = { TagModel }