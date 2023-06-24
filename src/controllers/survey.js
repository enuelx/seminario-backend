const Survey = require('../models/survey');

exports.sendSurvey = async (req, res) => {
    const {
        subjectSurvey,
        ageRangeSurvey,
        studyFormatSurvey,
        email,
    } = req.body;
    const exist = await User.findOne({ email }).select('email');
    if (exist) {
        res.status(409)
        return res.json({
            success: false,
            message: 'Este email ya completó una encuesta en la aplicación.',
        });
    }
    else {
        const survey = await Survey({
            subjectSurvey,
            ageRangeSurvey,
            studyFormatSurvey,
            email,
        });
        await survey.save();
        res.status(202).json({ success: true, survey });
    }
};

exports.existSurvey = async (req, res) => {
    const email = req.params.email;
    const exist = await User.findOne({ email }).select('email');
    if (!exist) {
        return res.status(404).json({
            success: false,
            message: 'No se encuentra una encuesta para el email: ' + email,
        });
    }
    else {
        return res.status(200).json({ success: true, message: 'El email: ' + email + ' posee una encuesta enviada.' });
    }
};