const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Rating = require('../models/rating');
const Dish = require('../models/dish');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {

 //   	Rating.create({
	// 	dish: req.body.dishId,
	// 	rating: req.body.rating
	// }, (err, rating) => {
	//     if (err) return res.status(500).send("There was a problem saving your rating");

	//      Rating.find({dish: req.body.dishId}, (err, dishes) => {
	//         if (err) return res.status(500).send("There was a problem finding the dish.");
	     
	//         let sum = 0;

	//         dishes.forEach((elem) => {
	//         	sum += elem.rating;
	//         })

	//         console.log(sum)

	//         const newrating = sum / dishes.length;

	     //    Dish.findByIdAndUpdate(req.body.dishId, {'$set': {rating: newrating}}, {new: true}, (err, dish) => {
		    //     if (err) return res.status(500).send("There was a problem updating the dish.");

		    //     // console.log(dish);
		    // });

	//     });

	Rating.findOne({dish: req.body.dishId}, (err, dish) => {

		if (err) return res.status(500).send("There was a problem finding the dish.");

	    if (!dish) {
	    	// просто записывать данные
	    	Rating.create({
				dish: req.body.dishId,
				rating: [req.body.rating]
			}, (err, rating) => {
			    if (err) return res.status(500).send("There was a problem saving favorite for rating");

			    let newrating = req.body.rating;

			    Dish.findByIdAndUpdate(req.body.dishId, {'$set': {rating: newrating}}, {new: true}, (err, dish) => {
			        if (err) return res.status(500).send("There was a problem updating the dish.");

			        // console.log(dish);
			    });
		
		    }); 
	    } else {
	    	// дополнять массив рейтинга
	    	rat = dish.rating.concat(req.body.rating);

	    	Rating.findOneAndUpdate({dish: req.body.dishId}, {rating: rat}, {new: true}, (err, result) => {

	    		let sum = result.rating.reduce((sum, current) => {
				  return sum + current;
				}, 0);

				let newrating = sum / result.rating.length;

				Dish.findByIdAndUpdate(req.body.dishId, {'$set': {rating: newrating}}, {new: true}, (err, dish) => {
			        if (err) return res.status(500).send("There was a problem updating the dish.");

			        // console.log(dish);
			    });

	    	})

	    }
		

	    res.status(200).send("ok");
	})

    
});

module.exports = router;