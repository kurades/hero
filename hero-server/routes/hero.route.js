const express = require('express');
const heroController = require('../controllers/hero.controller')
const router = express.Router();
router.route('/').get(heroController.getHeroes).post(heroController.addHero);
router.route('/:id').get(heroController.getHero).put(heroController.editHero).delete(heroController.deleteHero);

module.exports = router