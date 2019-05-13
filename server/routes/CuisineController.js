const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

const Cuisine = require('../models/cuisine');
const Cafe = require('../models/cafe');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/addCuisine', (req, res) => {
  
    Cuisine.create({
		title: req.body.title,
		image: req.body.path
	}, (err, user) => {
	    if (err) return res.status(500).send("There was a problem saving image");
	    
	    res.status(200).send("ok");
    }); 
});

router.get('/', (req, res) => {

	// if(req.query.cafeId === undefined) {
		Cuisine.find({}, (err, cuis) => {
			if (err) res.status(500).send("problem with finding cuisine in /cuisines");

			Cafe.find({})
				// .populate('cuisines')
			    .exec((err, cafe) => {
			    	if(err) res.status(500).send('problem with finding cafe in /cuisines')
			    	let arr = [];

			    	cuis.forEach((elem) => {
			    		let obj = {
			    			name: elem.title,
			    			_id: elem._id,
			    			cafe: [] 
			    		}

			    		cafe.forEach((item) => {
			    			// console.log(item.cuisines)
			    			
			    			if(item.cuisines.some(r => r.equals(elem._id))) {
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
		// 	    		select: 'title'			    		
		// 	      	},
		// 	      	{
		// 	      		path: 'cuisine',
		// 	      		match: {
		// 	    			_id: { $eq: req.query.cuisineId }
		// 	    		}
		// 	      	}
		// 	    ]	    	
		//     })
		// 	.populate({	path: 'cuisines', select: '_id title'})
		// 	.exec((err, cafe) => {
		// 			if (err) console.log('lol');

		// 			// console.log(cafe);
		// 			// let arr = Object.assign({}, cafe);
		// 			// // delete arr. ...
		// 			// // arr. ... = ...

		// 			// СДЕЛАТЬ НОРМАЛЬНОЕ КОПИРОВАНИЕ
		// 			let arr = {};
		// 			arr.id = cafe._id;
		// 			arr.title = cafe.title;
		// 			arr.delivery = cafe.delivery;
		// 			arr.delivery_time = cafe.delivery_time;
		// 			arr.delivery_price = cafe.delivery_price;
		// 			arr.desc = cafe.desc;
		// 			arr.address = cafe.address;
		// 			arr.phone = cafe.phone;
		// 			arr.dishes = [];
		// 			arr.cuisines = [];
		// 			arr.image = cafe.image;

		// 			cafe.cuisines.forEach((el) =>{
		// 			  	let arr2 = {
		// 			  		id: el._id,
		// 			  		title: el.title				  	
		// 			  	}
		// 			  	arr.cuisines.push(arr2);
		// 			})

		// 			cafe.dishes.forEach((el) =>{
					  
		// 			  	if(el.cuisine !== null) {
		// 			  		let arr2 = {
		// 				  		id: el._id,
		// 				  		title: el.title,
		// 				  		price_per_portion: el.price_per_portion,
		// 				  		category: el.category.title,
		// 				  		image: el.image
		// 				  	}
		// 			  		arr.dishes.push(arr2);
		// 			  	}
						  	
		// 			})

		// 			res.status(200).send(arr);
		// 	})
	// }
})

module.exports = router;