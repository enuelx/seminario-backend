const Survey = require('../models/survey');
const User = require('../models/user');

exports.sendSurvey = async (req, res) => {
    /*  #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                subjectSurvey: ["Lengua"],
                ageRangeSurvey: "7 - 8 años",
                studyFormatSurvey: ["Jugando"],
                email: "review@gmail.com"
            }
    } */
    const {
        subjectSurvey,
        ageRangeSurvey,
        studyFormatSurvey,
        email,
    } = req.body;
    const exist = await Survey.findOne({ email }).select('email');
    const user = await User.findOne({ email }).select('email');
    if (exist) {
        res.status(409)
        return res.json({
            success: false,
            message: 'Este email ya completó una encuesta en la aplicación.',
        });
    }
    else if (!user) {
        res.status(404)
        return res.json({
            success: false,
            message: 'Este email no se encuentra en la base de datos.',
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
        res.status(200).json({ success: true, survey });
    }
};

exports.existSurvey = async (req, res) => {
    const email = req.params.email;
    const exist = await Survey.findOne({ email }).select('email');
    if (!exist) {
        return res.status(404).json({
            success: false,
            message: 'No se encuentra una encuesta para el email: ' + email,
        });
    }
    else {
        return res.status(200).json({ success: true, message: 'El email ' + email + ' posee una encuesta enviada.' });
    }
};