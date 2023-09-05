const mongoose = require('mongoose');
const { UserModel } = require('../models/user.model')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const Hero = require('../models/hero.model')
const { default: axios } = require('axios');

// const TOKEN_SECRET = process.env.TOKEN_SECRET;

const validateUser = (data) => {
    const rule = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
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

async function getHeroesByUserId(req, res) {
    try {
        const user = await UserModel.findById(req.params.id).populate('heroesList').exec();
        if (!user) return res.status(403).send('user not valid')
        const heroes = user.heroes;
        return res.json(heroes)
    } catch (error) {
        console.log(error);
    }
}

async function addHeroByUserId(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    try {
        const heroBody = req.body;
        console.log(heroBody);
        const userId = req.user._id

        const user = await UserModel.findById(userId);
        if (!user) return res.status(403).send('user not valid')

        const { data: newHero } = await axios.post(`${HERO_SERVER}`, heroBody)
        console.log(newHero);

        user.heroesList.push(newHero._id)
        const newUser = await user.save()
        res.json(newUser)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

async function getHeroByUserId(req, res) {
    try {
        const userId = req.user._id
        const user = await UserModel.findById(userId).populate('heroesList');
        if (!user) return res.status(403).send('user not valid')
        console.log(user);
        res.json(user.heroesList)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

async function EditHeroByUserId(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    try {
        const id = req.params.id
        const body = req.body;
        const userId = req.user._id
        const user = await UserModel.findById(userId);
        if (!user) return res.status(403).send('user not valid')
        const foundHero = user.heroesList.find((h) => h === id);
        if (!foundHero) return res.status(400).send('Hero not found in user list')
        const newHero = await axios.put(`${HERO_SERVER}/${foundHero}`, body)
        res.json(newHero)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

async function DeleteHeroByUserId(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    try {
        const id = req.params.id
        const userId = req.user._id
        const user = await UserModel.findById(userId);
        if (!user) return res.status(403).send('user not valid')
        const foundHero = user.heroesList.find((h) => h === body._id);
        if (!foundHero) return res.status(400).send('Hero not found in user list')

        const deletedHero = await axios.delete(`${HERO_SERVER}/${id}`)
        res.json(deletedHero)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}



module.exports = { register, getUser, login, addHeroByUserId, getHeroByUserId, EditHeroByUserId, getHeroesByUserId, DeleteHeroByUserId }