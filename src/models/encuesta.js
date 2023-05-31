const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

//Las encuestas son valores booleanos que se generan a través del front, muestran los intereses del usuario

// creación de esquema en base de datos
const userSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  // campos que se envían desde el frontend
  matematica: {
    type: Boolean,
    required: true,
  },
  lengua: {
    type: Boolean,
    required: true,
  },
  sociales: {
    type: Boolean,
    required: true,
  },
  naturales: {
    type: Boolean,
    required: true,
  },
  eduTecnologica: {
    type: Boolean,
    required: true,
  },
  eduFisica: {
    type: Boolean,
    required: true,
  },
  eduEtica: {
    type: Boolean,
    required: true,
  },
  eduArtistica: {
    type: Boolean,
    required: true,
  },
  musica: {
    type: Boolean,
    required: true,
  },
  teatro: {
    type: Boolean,
    required: true,
  },
  artesMovimiento: {
    type: Boolean,
    required: true,
  },
  danzas: {
    type: Boolean,
    required: true,
  }
  
  
},
  { //no se que simboliza esto
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });


userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });
module.exports = mongoose.model('User', userSchema);
