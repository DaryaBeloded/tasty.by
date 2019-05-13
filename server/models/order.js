const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 	 
	user_id: {
	  	type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	},
	name: String,
	order_date: {
		type: Date,
		default: Date.now()
	},
	delivery_date: {
		type: Date,
		default: Date.now()
	},
	delivery_time: String,
	address: String,
	phone: {
		type: String,
	  	required: true,
	  	match: [/^(\+375|80)\(?(29|25|44|33)\)?(\d{3})\-?(\d{2})\-?(\d{2})$/, 'Please fill a valid phone number']
	},
	summ: Number,
	basket: [{
		cafe_id: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'CafeeHouse',
			default: undefined
		},
		dish: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Dish'
		},
		number_of_servings: Number	 
	}]
});


mongoose.model('Order', UserSchema);

module.exports = mongoose.model('Order');