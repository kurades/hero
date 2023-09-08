const mongoose = require('mongoose');
const { HeroModel } = require('../models/hero.model')
const { TagModel } = require('../models/tag.model')
const getHeroes = async (req, res) => {
    try {
        let { name, tagname, uid } = req.query;
        console.log(tagname);
        let query = {}
        const regex = new RegExp(name, 'i')
        query.uid = uid;
        if (name) query.name = { $regex: regex }
        if(tagname) {
            let tags = tagname.split(',')
            query.tags = {$all: tags}
        }
        const heroes = await HeroModel.find(query);
        console.log(heroes);
        res.status(200).json(heroes)
    } catch (error) {
        console.log(error);
    }
}
const getHero = async (req, res) => {
    try {

        const { id } = req.params;
        console.log(id);
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
        const { tags, ...rest } = req.body;
        console.log(req.body);
        if (tags) {
            const tagNames = await Promise.all(
                tags.map(async (tagName) => {
                    let tag = await TagModel.findOne({ name: tagName });

                    if (!tag) {
                        tag = new TagModel({ name: tagName });
                        await tag.save();
                    }

                    return tag.name;
                })
            );
            rest.tags = tagNames
            console.log(tagNames);
        }
        const hero = HeroModel(rest);
        const result = await hero.save()
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}

const editHero = async (req, res) => {
    try {
        const { tags, ...body } = req.body;
        const { id } = req.params;
        let tagNames = []
        if (!body.name) res.status(400).json({ message: 'Name field is required' });
        if (tags) {
            tagNames = await Promise.all(
                tags.map(async (tagName) => {
                    let tag = await TagModel.findOne({ name: tagName });

                    if (!tag) {
                        tag = new TagModel({ name: tagName });
                        await tag.save();
                    }

                    return tag.name;
                })
            );
        }
        body.tags = tagNames
        const hero = await HeroModel.findByIdAndUpdate(id, body, { new: true })
        if (!hero) res.status(400).json({ message: 'Hero not found' });
        res.status(200).json(hero)

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}

// const deleteHeroTags = async (req, res) => {
//     const { uid, tags } = req.body;
//     const { id } = req.params;

//     const hero = await HeroModel.findByIdAndUpdate(id, {
//         $pull: {
//             tags: { $in: tags }
//         }
//     });
//     if (!hero) return res.status(404).send('Hero not found')

//     return res.json(hero)

// }

const deleteHero = async (req, res) => {
    try {
        const { id } = req.params;
        const hero = await HeroModel.findByIdAndDelete(id);
        if (!hero) res.status(400).json({ message: 'Hero not found' });
        if (hero) res.json(hero)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error')
    }
}



module.exports = { getHeroes, addHero, deleteHero, editHero, getHero }