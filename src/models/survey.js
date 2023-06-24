const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

// creación de esquema en base de datos
const surveySchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  subjectSurvey: [
    {
      firstSubject: String,
    },
    {
      secondSubject: String,
    },
    {
      thirdSubject: String,
    }
  ],
  ageRangeSurvey: {
    type: String
  },
  studyFormatSurvey: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

surveySchema.plugin(AutoIncrement, { id: 'survey_seq', inc_field: '_id' });
module.exports = mongoose.model('Survey', surveySchema);
