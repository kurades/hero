const express = require('express');
const heroController = require('../controllers/hero.controller')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
router.route('/')
    .get(verifyToken, heroController.getHeroes)
    .post(verifyToken, heroController.addHero);

router.route('/tag')
    .get(verifyToken, heroController.getTags)
    .post(verifyToken, heroController.addTag);

router.route('/tag/:id')
    .put(verifyToken, heroController.editTag)
    .delete(verifyToken, heroController.deleteTag);

router.route('/:id')
    .get(verifyToken, heroController.getHero)
    .put(verifyToken, heroController.editHero)
    .delete(verifyToken, heroController.deleteHero);



module.exports = router