const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

const Cafe = require('../models/cafe');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/add', (req, res) => {

    Cafe.create({
		title: req.body.title,
		delivery: req.body.delivery,
		delivery_time: req.body.delivery_time,
		delivery_price: req.body.delivery_price,
		desc: req.body.desc,
		address: req.body.address.split(', '),
		phone: req.body.phone,
		dishes: req.body.dishes.split(', '),
		cuisines: req.body.cuisines.split(', '),
		image: req.body.path
	}, (err, cafe) => {
	    if (err) return res.status(500).send("There was a problem saving cafe");

	    Cafe.findById(cafe._id)
	    	.populate(	{path: 'dishes',
    					populate: { path: 'category' }}) 
			.exec((err, cafe) => {
				if (err) console.log('lol');
				cafe.dishes.forEach((el) =>{
				  	console.log('The dishes is %s', el.title, " category", el.category.title);
				})
			  
			});

		 Cafe.findById(cafe._id)
	    	.populate('cuisines') 
			.exec((err, cafe) => {
			  if (err) console.log('lol');

			  cafe.cuisines.forEach((el) =>{
			  	console.log('The cuisines is %s', el.title);
			  })
			  
			});	    
	    
	    res.status(200).send("ok");
    }); 
});

router.get("/", (req, res) => {
	console.log('cafes')

	if(req.query.cafeId === undefined) {
		console.log('cafe')

		Cafe.find({}, {desc: 0, address: 0, phone: 0, dishes: 0, cuisines: 0}, (err, cafe) => {
			if (err) return res.status(500).send("problem with finding cafe in /cafes");

			res.status(200).send(cafe);
		})
	} else {
		// console.log("filter", req.query.filter)
		switch(req.query.filter) {
			case "cafe": 
				console.log('filter cafe')
				Cafe.findById(req.query.cafeId)
					.populate({	
					    path: 'dishes',
				    	populate: [
					    	{ 
					    		path: 'category'
					      	},
					      	{
					      		path: 'cuisine'
					      	}
					    ]	    	
				    })
					.populate({	path: 'cuisines', select: '_id title'})
					.exec((err, cafe) => {
							if (err) console.log('problem with finding cafe in /cafes?filter=cafe');

							let arr = {};
							arr._id = cafe._id;
							arr.title = cafe.title;
							arr.delivery = cafe.delivery;
							arr.delivery_time = cafe.delivery_time;
							arr.delivery_price = cafe.delivery_price;
							arr.desc = cafe.desc;
							arr.address = cafe.address;
							arr.phone = cafe.phone;
							arr.dishes = [];
							arr.cuisines = [];
							arr.image = cafe.image;
							arr.alt = cafe.alt_img;
							arr.link = cafe.link;

							cafe.dishes.forEach((el) =>{
				
							  	let arr2 = {
							  		_id: el._id,
							  		title: el.title,
							  		composition: el.composition,
							  		price_per_portion: el.price_per_portion,
							  		weight_per_portion: el.weight_per_portion,
							  		category: el.category.title,
							  		cuisine: el.cuisine.title,
							  		image: el.image,
							  		alt: el.alt_img,
							  		rating: el.rating
							  	}
							  	arr.dishes.push(arr2);
							  
							})

							cafe.cuisines.forEach((el) =>{
							  	let arr2 = {
							  		_id: el._id,
							  		title: el.title				  	
							  	}
							  	arr.cuisines.push(arr2);
							})


							res.status(200).send(arr);
						});
				break;
			case "category": 
				console.log('filter category')
				Cafe.findById(req.query.cafeId)
					.populate({	
					    path: 'dishes',
				    	populate: [
					    	{ 
					    		path: 'category',
					    		match: {
					    			_id: { $eq: req.query.filterId }
					    		}
					      	},
					      	{
					      		path: 'cuisine',
					      		select: 'title'
					      	}
					    ]	    	
				    })
					.populate({	path: 'cuisines', select: '_id title'})
					.exec((err, cafe) => {
						if (err) console.log('problem with finding cafe in /cafes?filter=category');

						let arr = {};
						arr._id = cafe._id;
						arr.title = cafe.title;
						arr.delivery = cafe.delivery;
						arr.delivery_time = cafe.delivery_time;
						arr.delivery_price = cafe.delivery_price;
						arr.desc = cafe.desc;
						arr.address = cafe.address;
						arr.phone = cafe.phone;
						arr.dishes = [];
						arr.cuisines = [];
						arr.image = cafe.image;
						arr.alt = cafe.alt_img;
						arr.link = cafe.link;

						cafe.cuisines.forEach((el) =>{
						  	let arr2 = {
						  		_id: el._id,
						  		title: el.title				  	
						  	}
						  	arr.cuisines.push(arr2);
						})

						cafe.dishes.forEach((el) =>{
						  	
						  	if(el.category !== null) {
						  		let arr2 = {
							  		_id: el._id,
							  		title: el.title,
							  		price_per_portion: el.price_per_portion,
							  		cuisine: el.cuisine.title,
							  		image: el.image,
							  		alt: el.alt_img,
							  		rating: el.rating
							  	}
						  		arr.dishes.push(arr2);
						  	}
							  	
						})

						res.status(200).send(arr);
					});
				break;
			case "cuisine": 
				console.log('filter cuisine');
				Cafe.findById(req.query.cafeId)
					.populate({	
					    path: 'dishes',
				    	populate: [
					    	{ 
					    		path: 'category',
					    		select: 'title'			    		
					      	},
					      	{
					      		path: 'cuisine',
					      		match: {
					    			_id: { $eq: req.query.filterId }
					    		}
					      	}
					    ]	    	
				    })
					.populate({	path: 'cuisines', select: '_id title'})
					.exec((err, cafe) => {
							if (err) console.log('problem with finding cafe in /cafes?filter=cuisine');

							let arr = {};
							arr._id = cafe._id;
							arr.title = cafe.title;
							arr.delivery = cafe.delivery;
							arr.delivery_time = cafe.delivery_time;
							arr.delivery_price = cafe.delivery_price;
							arr.desc = cafe.desc;
							arr.address = cafe.address;
							arr.phone = cafe.phone;
							arr.dishes = [];
							arr.cuisines = [];
							arr.image = cafe.image;
							arr.alt = cafe.alt_img;
							arr.link = cafe.link;

							cafe.cuisines.forEach((el) =>{
							  	let arr2 = {
							  		_id: el._id,
							  		title: el.title				  	
							  	}
							  	arr.cuisines.push(arr2);
							})

							cafe.dishes.forEach((el) =>{
							  
							  	if(el.cuisine !== null) {
							  		let arr2 = {
								  		_id: el._id,
								  		title: el.title,
								  		price_per_portion: el.price_per_portion,
								  		category: el.category.title,
								  		image: el.image,
								  		alt: el.alt_img,
							  			rating: el.rating
								  	}
							  		arr.dishes.push(arr2);
							  	}
								  	
							})

							res.status(200).send(arr);
					});
				break;
			default: res.status(404).send('Проверьте параметры запроса');
				break;
		}

		// console.log('LOL2');

		// Cafe.findById(req.query.cafeId)
		// 	.populate({	
		// 		path: 'dishes',	
		// 		populate: { 
		//     		path: 'category'
		//       	}
		// 	})
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

		// 			cafe.dishes.forEach((el) =>{
		// 				// console.log(el)
		
		// 			  	let arr2 = {
		// 			  		id: el._id,
		// 			  		title: el.title,
		// 			  		composition: el.composition,
		// 			  		price_per_portion: el.price_per_portion,
		// 			  		weight_per_portion: el.weight_per_portion,
		// 			  		category: el.category.title,
		// 			  		image: el.image,
		// 			  		rating: el.rating
		// 			  	}
		// 			  	// console.log(arr2)
		// 			  	arr.dishes.push(arr2);
		// 			  	// console.log(arr.dishes)
		// 			})

		// 			cafe.cuisines.forEach((el) =>{
		// 			  	let arr2 = {
		// 			  		id: el._id,
		// 			  		title: el.title				  	
		// 			  	}
		// 			  	arr.cuisines.push(arr2);
		// 			})

		// 			// console.log(arr)

		// 			res.status(200).send(arr);
		// 		})
	}
})

module.exports = router;