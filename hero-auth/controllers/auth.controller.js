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

async function getHeroesByUserId(req, res) {
    try {
        const userId = req.user._id;
        const { limit } = req.query;
        const user = await UserModel.findById(userId).populate('heroesList');
        if (!user) return res.status(403).send('user not valid')
        return res.json(user.heroesList.slice(0, limit | user.heroesList.length))
    } catch (error) {
        console.log(error);
    }
}

async function addHeroByUserId(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    try {
        const heroBody = req.body;
        const userId = req.user._id
        heroBody.uid = userId;

        const user = await UserModel.findById(userId).populate('heroesList');
        if (!user) return res.status(403).send('user not valid')
        const checkHeroExist = user.heroesList.find((h)=>h.name === heroBody.name)
        if(checkHeroExist) return res.status(422).send('Hero exist in this user')

        const { data: newHero } = await axios.post(`${HERO_SERVER}`, heroBody)
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
        const id = req.params.id
        const user = await UserModel.findById(userId).populate('heroesList')
        if (!user) return res.status(403).send('user not valid')
        const hero = user.heroesList.find((h) => h._id.toString() === id)
        if (!hero) return res.status(404).send('Hero not found')
        res.json(hero)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

async function editHeroByUserId(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    try {
        const id = req.params.id
        const body = req.body;
        console.log(body);
        const userId = req.user._id
        const user = await UserModel.findById(userId);
        if (!user) return res.status(403).send('user not valid')
        const foundHero = user.heroesList.find((h) => h.toString() === id);
        if (!foundHero) return res.status(400).send('Hero not found in user list')
        const newHero = await axios.put(`${HERO_SERVER}/${foundHero}`, body)
        // console.log(newHero.data);
        res.json(newHero.data)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

async function findHero(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    const id = req.user._id;
    try {
        let { name, tagname } = req.query;

        let query = '?'
        query += `uid=${id}`
        if (name) query += `&name=${name}`
        if (tagname) query += `&tagname=${tagname}`

        const { data } = await axios.get(`${HERO_SERVER}${query}`)
        console.log(data);
        // const heroes = data.filter((h) => h.uid === id)
        // console.log(heroes);
        return res.json(data);

    } catch (error) {
        console.log(error);
    }
}

async function deleteHeroByUserId(req, res) {
    const HERO_SERVER = process.env.HERO_SERVER;
    try {
        const id = req.params.id
        const userId = req.user._id
        const user = await UserModel.findById(userId);
        if (!user) return res.status(403).send('user not valid')
        const foundHero = user.heroesList.find((h) => h.toString() === id);
        if (!foundHero) return res.status(400).send('Hero not found in user list')
        await UserModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { heroesList: { $in: id } } },
            { new: true })
        const { data } = await axios.delete(`${HERO_SERVER}/${id}`)
        res.json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
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


module.exports = { register, getUser, login, addHeroByUserId, getHeroByUserId, editHeroByUserId, getHeroesByUserId, deleteHeroByUserId, findHero, updateProfile }