const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        select : false,
    },
    heroesList:{
        type: [{type: mongoose.Types.ObjectId, ref:'Hero'}]
    }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = { UserModel }