const mongoose = require('mongoose');
const { HeroModel } = require('../models/hero.model')
const getHeroes = async (req, res) => {
    const { name } = req.query;
    const regex = new RegExp(name, 'i')
    const heroes = await HeroModel.find({ name: { $regex: regex } }).lean();
    res.status(200).json(heroes)
}
const getHero = async (req, res) => {
    try {

        const { id } = req.params;
        const checkHeroExist = await HeroModel.findById(id).lean();
        if (!checkHeroExist) {
            res.status(400).json({ message: 'Hero not found' });
        }
        res.status(200).json(checkHeroExist);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
}
const addHero = async (req, res, next) => {
    try {
        const { name, gender, email, address, age } = req.body;
        console.log(req.body);
        if (!name) res.status(400).json({ message: 'Name field is required' });
        const checkHeroExist = await HeroModel.findOne({ name })
        if (checkHeroExist)
            res.status(400).json({ message: 'Hero is exist' });
        const hero = HeroModel({ name, gender, email, address, age });
        const result = await hero.save()
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

const editHero = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;

        if (!name) res.status(400).json({ message: 'Name field is required' });

        const hero = await HeroModel.findByIdAndUpdate(id, { name }, { new: true })
        if (!hero) res.status(400).json({ message: 'Hero not found' });
        res.status(200).json(hero)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' })
    }
}

const deleteHero = async (req, res) => {
    try {
        const { id } = req.params;
        const hero = await HeroModel.findByIdAndDelete(id)
        if (!hero) res.status(400).json({ message: 'Hero not found' });
        if(hero) res.json(hero)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' })
    }
}



module.exports = { getHeroes, addHero, deleteHero, editHero, getHero }