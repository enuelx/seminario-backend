const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

// creación de esquema en base de datos
const surveySchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  subjectSurvey: {
    type: [String],
    required: true
  },
  ageRangeSurvey: {
    type: String,
    required: true
  },
  studyFormatSurvey: {
    type: [String],
    required: true
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
