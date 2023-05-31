const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var AutoIncrement = require('mongoose-sequence')(mongoose);

//Las tags solo se ven en el back, surgen como consecuencia de las elecciones del usuario en las encuestas
//Sirven para decidir que contenido se le va a mostrar al usuario


// creación de esquema en base de datos
const userSchema = new mongoose.Schema({
  _id: {
    type: Number
  },
  // campos que se envían desde un algoritmo que relaciones las encuestas con tags
  ciencia: {
    type: String,
    //required: true, creo que no va
  },
  tecnologia: {
    type: String,
    //required: true, creo que no va
  },
  arte: {
    type: String,
    //required: true, creo que no va
  },
  deportes: {
    type: String,
    //required: true, creo que no va
  },
  historia: {
    type: String,
    //required: true, creo que no va
  },

},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('No se encuentra una contraseña para comparar');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error mientras se comparaba las contraseñas', error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Email inválido');
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (error) {
    console.log('Error en isThisEmailInUse method', error.message);
    return false;
  }
};

userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: '_id' });
module.exports = mongoose.model('User', userSchema);
