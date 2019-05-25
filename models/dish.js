const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 	 
	title: String,
	category: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Category' 
	},
	cuisine: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Cuisine' 
	},
	desc: String,
	composition: String,  // состав
	weight_per_portion: String,
	price_per_portion: Number,
	image: String,
	alt_img: String,
	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	}
});

mongoose.model('Dish', UserSchema);

module.exports = mongoose.model('Dish');