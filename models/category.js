const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 	 
	title: String,
	// image: {
	// 	data: Buffer, 
	// 	contentType: String
	// }
	image: String,
	alt_img: String
});

mongoose.model('Category', UserSchema);

module.exports = mongoose.model('Category');