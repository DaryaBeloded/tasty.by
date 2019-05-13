const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({  
  user_id: {
  	type: mongoose.Schema.Types.ObjectId, 
	ref: 'User' 
  },
  favorites: [{
  	type: mongoose.Schema.Types.ObjectId, 
	ref: 'Dish' 
  }]
});

mongoose.model('Favorite', UserSchema);

module.exports = mongoose.model('Favorite');