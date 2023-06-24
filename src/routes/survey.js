const express = require('express');
var cors = require('cors')

const router = express.Router();

const {
    sendSurvey,
} = require('../controllers/survey');

router.post('/sendSurvey', cors(), sendSurvey);
router.get('/existSurvey', cors(), existSurvey);

module.exports = router;