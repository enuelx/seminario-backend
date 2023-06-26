const express = require('express');
var cors = require('cors')

const router = express.Router();

const {
    sendSurvey,
    existSurvey
} = require('../controllers/survey');

const { isAuth } = require('../middlewares/config/auth');

router.post('/sendSurvey', cors(), isAuth, sendSurvey);
router.get('/existSurvey/:email', cors(), isAuth, existSurvey);

module.exports = router;