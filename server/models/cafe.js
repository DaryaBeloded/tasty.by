const mongoose = require('mongoose');

// добавить в кафе список категорий - вопрос с выборкой по категориям решится - или нет
// если не получится, возвращать просто список кафе
const UserSchema = new mongoose.Schema({ 	 
	title: String,
	delivery: String,
	delivery_time: String,
	delivery_price: String,
	desc: String,
	address: [String],
	phone: String,
	dishes: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Dish' 
	}],
	cuisines: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Cuisine' 
	}],
	image: String,
	alt_img: String,
	link: String
});


mongoose.model('CafeeHouse', UserSchema);

module.exports = mongoose.model('CafeeHouse');