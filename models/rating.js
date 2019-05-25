const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({  
  dish: {
  	type: mongoose.Schema.Types.ObjectId, 
	ref: 'Dish' 
  },
  rating: [{
  	type: Number,
	min: 0,
	max: 5
  }]
});

mongoose.model('Rating', UserSchema);

module.exports = mongoose.model('Rating');