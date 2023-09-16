const express = require('express');
const heroController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.put('/', verifyToken, heroController.updateProfile)
router.post('/login', heroController.login);
router.post('/register', heroController.register);
module.exports = router