const express = require('express');
const heroController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.put('/', verifyToken, heroController.updateProfile)
router.post('/login', heroController.login);
router.post('/register', heroController.register);
router.post('/heroes', verifyToken, heroController.addHeroByUserId)
router.get('/heroes', verifyToken, heroController.getHeroesByUserId)
router.get('/find-heroes', verifyToken, heroController.findHero)
router.get('/heroes/:id', verifyToken, heroController.getHeroByUserId)
router.put('/heroes/:id', verifyToken, heroController.editHeroByUserId)
router.delete('/heroes/:id', verifyToken, heroController.deleteHeroByUserId)
module.exports = router