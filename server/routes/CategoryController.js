const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

const Category = require('../models/category');
const Cafe = require('../models/cafe');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/addCategory', (req, res) => {

    Category.create({
		title: req.body.title,
		image: req.body.path
	}, (err, user) => {
	    if (err) return res.status(500).send("There was a problem saving image");
	    
	    res.status(200).send("ok");
    }); 
});


router.get('/', (req, res) => {

	// if(req.query.cafeId === undefined) {

		Category.find({}, (err, cat) => {
			if (err) res.status(500).send("problem with finding category in /categories");

			Cafe.find({})
				.populate({	
				    path: 'dishes'
			    })
				// .populate('cuisines')
			    .exec((err, cafe) => {
			    	if(err) res.status(500).send('problem with finding cafe in /categories')

			    	let arr = [];

			    	cat.forEach((elem) => {
			    		let obj = {
			    			name: elem.title,
			    			_id: elem._id,
			    			cafe: [] 
			    		}

			    		cafe.forEach((item) => {
			    			
			    			if(item.dishes.some(r => r.category.equals(elem._id))) {
			    				let newObj = {
			    					_id: item._id,
			    					title: item.title,
			    					delivery: item.delivery,
			    					delivery_time: item.delivery_time,
			    					delivery_price: item.delivery_price,
			    					image: item.image
			    				}

			    				obj.cafe.push(newObj)
			    			}
			    		
			    		})

			    		arr.push(obj)
			    	})

			    	res.status(200).send(arr);
			    })
		})
		


	// } else {
		// Cafe.findById(req.query.cafeId)
		// 	.populate({	
		// 	    path: 'dishes',
		//     	populate: [
		// 	    	{ 
		// 	    		path: 'category',
		// 	    		match: {
		// 	    			_id: { $eq: req.query.categoryId }
		// 	    		}
		// 	      	},
		// 	      	{
		// 	      		path: 'cuisine',
		// 	      		select: 'title'
		// 	      	}
		// 	    ]	    	
		//     })
		// 	.populate({	path: 'cuisines', select: '_id title'})
		// 	.exec((err, cafe) => {
		// 		if (err) console.log('lol');

		// 		// console.log(cafe);
		// 			// let arr = Object.assign({}, cafe);
		// 			// // delete arr. ...
		// 			// // arr. ... = ...

		// 		// СДЕЛАТЬ НОРМАЛЬНОЕ КОПИРОВАНИЕ
		// 		let arr = {};
		// 		arr.id = cafe._id;
		// 		arr.title = cafe.title;
		// 		arr.delivery = cafe.delivery;
		// 		arr.delivery_time = cafe.delivery_time;
		// 		arr.delivery_price = cafe.delivery_price;
		// 		arr.desc = cafe.desc;
		// 		arr.address = cafe.address;
		// 		arr.phone = cafe.phone;
		// 		arr.dishes = [];
		// 		arr.cuisines = [];
		// 		arr.image = cafe.image;

		// 		cafe.cuisines.forEach((el) =>{
		// 		  	let arr2 = {
		// 		  		id: el._id,
		// 		  		title: el.title				  	
		// 		  	}
		// 		  	arr.cuisines.push(arr2);
		// 		})

		// 		cafe.dishes.forEach((el) =>{
				  	
		// 		  	if(el.category !== null) {
		// 		  		let arr2 = {
		// 			  		id: el._id,
		// 			  		title: el.title,
		// 			  		price_per_portion: el.price_per_portion,
		// 			  		cuisine: el.cuisine.title,
		// 			  		image: el.image
		// 			  	}
		// 		  		arr.dishes.push(arr2);
		// 		  	}
					  	
		// 		})

		// 		res.status(200).send(arr);
		// 	})
	// }
})

module.exports = router;