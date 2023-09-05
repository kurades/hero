const express = require('express');
const heroController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/login', heroController.login);
router.post('/register', heroController.register);
router.post('/heroes', verifyToken, heroController.addHeroByUserId)
router.get('/heroes',verifyToken,heroController.getHeroByUserId)
module.exports = router