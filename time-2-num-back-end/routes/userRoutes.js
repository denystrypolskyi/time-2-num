const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, userController.getUserInfo);
router.put('/', verifyToken, userController.updateUserInfo);
router.get('/avatar', verifyToken, userController.getUserAvatar);
router.put('/avatar', verifyToken, userController.updateUserAvatar);

module.exports = router;
