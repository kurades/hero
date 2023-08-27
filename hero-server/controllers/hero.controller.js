const mongoose = require('mongoose');
const { HeroModel } = require('../models/hero.model')
const getHeroes = async (req, res) => {
    const heroes = await HeroModel.find().lean();
    res.status(200).json(heroes)
}
const getHero = async (req, res) => {
    try {

        const { id } = req.params;
        const checkHeroExist = await HeroModel.findById(id).lean();
        if (!checkHeroExist) {
            res.status(400).json({message:'Hero not found'});
        }
        res.status(200).json(checkHeroExist);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server error'})
    }
}
const addHero = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) res.status(400).json({message:'Name field is required'});
        const checkHeroExist = HeroModel.findOne({ name })
        if (checkHeroExist)
            res.status(400).json({message:'Hero is exist'});
        const hero = HeroModel({ name });
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

        if (!name) res.status(400).json({message:'Name field is required'});

        const hero = await HeroModel.findByIdAndUpdate(id, { name }, { new: true })
        if (!hero) res.status(400).json({message:'Hero not found'});
        res.status(200).json(hero)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'server error'})
    }
}

const deleteHero = async(req, res) => {
    try {
        const { id } = req.params;
        const hero = HeroModel.findByIdAndRemove(id)
        if(!hero) res.status(400).json({message: 'Hero not found'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'server error'})
    }
}

module.exports = { getHeroes, addHero, deleteHero, editHero, getHero }