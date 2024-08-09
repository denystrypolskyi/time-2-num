const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, leaderboardController.getLeaderboard);
router.post('/', verifyToken, leaderboardController.saveResult);

module.exports = router;
