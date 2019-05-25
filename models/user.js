const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// добавить валидацию полей
const UserSchema = new mongoose.Schema({  
  name: String,
  email: {
  	type: String,
  	required: true,
  	unique: true,
  	match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email address']
  },
  password: {
  	type: String,
  	required: true,
  	minlength: 4
  },
  phone: {
  	type: String,
  	required: true,
  	unique: true,
  	match: [/^(\+375|80)\(?(29|25|44|33)\)?(\d{3})\-?(\d{2})\-?(\d{2})$/, 'Please fill a valid phone number']
  },
  address: {
    type: String,
    default: ""
  }
});
UserSchema.plugin(uniqueValidator)

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');