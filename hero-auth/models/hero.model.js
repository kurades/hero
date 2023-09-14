const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const HeroSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        default: 'Male'
    },
    email: {
        type: String,
        trim: true,
    },
    age: {
        type: Number
    },
    address: {
        type: String,
        trim: true,
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: 'Tag',
    }]
})



const HeroModel = mongoose.model('Hero', HeroSchema)

module.exports = { HeroModel }