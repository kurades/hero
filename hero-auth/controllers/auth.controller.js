const mongoose = require('mongoose');
const { UserModel } = require('../models/user.model')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const { HeroModel } = require('../models/hero.model')
const { default: axios } = require('axios');

// const TOKEN_SECRET = process.env.TOKEN_SECRET;

const validateUser = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email(),
        phone: Joi.string().length(10),
        password: Joi.string().min(6).max(100),
    })
    return rule.validate(data)
}

async function register(req, res) {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    console.log(req.body);
    const { error } = validateUser(req.body)

    if (error) return res.status(422).send(error.details[0].message)
    const checkNameExist = await UserModel.findOne({ name: req.body.name })
    if (checkNameExist) return res.status(422).send('Name already exist')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new UserModel({
        name: req.body.name,
        password: hashPassword,
    })
    try {
        const newUser = await user.save()
        let newObjectUser = newUser.toObject()
        delete newObjectUser.password
        console.log(newObjectUser);
        const token = jwt.sign({ _id: user._id }, TOKEN_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
        res.json({ user: newObjectUser, token })
    } catch (error) {
        res.status(400).send(error)
    }
}

async function login(req, res) {
    const TOKEN_SECRET = process.env.TOKEN_SECRET;
    const user = await UserModel.findOne({ name: req.body.name }).select('+password').lean();
    console.log(req.body);
    if (!user) return res.status(422).send('Name not valid')

    const checkPassword = bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(422).send('Password not correct');
    delete user.password;
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
    return res.status(200).json({ user, token });
}

async function getUser(req, res) {
    const user = await UserModel.findById(req.params.id).lean()
    if (!user) return res.status(403).send('user not valid')

    delete user.password
    console.log(user);
    return res.status(200).send(user)
}



async function updateProfile(req, res) {
    try {
        const id = req.user._id;
        const body = req.body;
        delete body._id
        console.log(body);
        const { error } = validateUser(body)
        if (error) return res.status(400).send(error)
        const newUser = await UserModel.findByIdAndUpdate(id, body, { new: true })
        if (!newUser) return res.status(422).send('User not found')
        return res.json(newUser)
    } catch (error) {
        console.log(error);
    }
}


module.exports = { register, getUser, login, updateProfile }