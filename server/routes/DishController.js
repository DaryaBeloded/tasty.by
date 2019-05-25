const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

const Dish = require('../models/dish');
const Category = require('../models/category');
const Cafe = require('../models/cafe');
const Cuisine = require('../models/cuisine');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/addDish', (req, res) => {
  
    Dish.create({
		title: req.body.title,
		category: req.body.category,
		cuisine: req.body.cuisine,
		desc: req.body.desc,
		composition: req.body.composition,  // состав
		weight_per_portion: req.body.weight_per_portion,
		price_per_portion: req.body.price_per_portion,
		image: req.body.path
	}, (err, dish) => {
	    if (err) return res.status(500).send("There was a problem saving dish");

	    Dish.findById(dish._id)
	    	.populate('category') 
			.exec((err, dish) => {
			  if (err) console.log('lol');

			  console.log('The category is %s', dish.category.title);
			});

		 Dish.findById(dish._id)
	    	.populate('cuisine') 
			.exec((err, dish) => {
			  if (err) console.log('lol');

			  console.log('The cuisine is %s', dish.cuisine.title);
			});	    
	    
	    res.status(200).send("ok");
    }); 
});

router.get('/', (req, res) => {
	Dish.findById(req.query.id)
	.select('-__v')
	.populate({path: 'category', select: '-__v -image'})
	.populate({path: 'cuisine', select: '-__v -image'})
	.exec((err, dish) => {
		if(err) res.status(500).send('problem with finding dish in /dishes');

		res.status(200).send(dish);
	})
})

router.get('/top1', async(req, res) => {
	console.log('top1')
	const arr = await Category.find().exec();

	let kek = [];
	arr.forEach(async(elem, index) => {
		await Dish.find()
			.where('category').equals(elem._id)
			.populate({path:'category', select: '-__v -image'})
			.populate({path:'cuisine', select: '-__v -image'})
			.sort({rating: -1})
			.limit(1)
			.exec()
			.then(data => kek.push(data[0]))
		if ((index+1) === arr.length) res.status(200).send(kek);
	})	

})

router.get('/top5', async(req, res) => {
	console.log("top5")
	Cafe.find()
		.limit(5)
		.select("_id title")
		.exec((err, cafes) => {

			Category.find()
					.limit(5)
					.select("_id title")
					.exec((err, cat) => {

						Cuisine.find()
								.limit(5)
								.select("_id title")
								.exec((err, cus) => {

									let arr = {
										"cafes": cafes,
										"categories": cat, 
										"cuisines": cus
									}

									res.status(200).send(arr)
								})
					})
		})	
})


module.exports = router;