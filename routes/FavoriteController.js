const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");

const Favorite = require('../models/favorite');
const Dish = require('../models/dish');
const VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', VerifyToken, (req, res) => {

	console.log('add to favorites');

	Favorite.findOne({user_id: req.userId}, (err, user) => {

		if (err) return res.status(500).send("There was a problem finding the user in Favorire.");

	    if (!user) {
	    	// просто записывать данные
	    	Favorite.create({
				user_id: req.userId,
				favorites: [req.body.favorite]
			}, (err, fav) => {
			    if (err) return res.status(500).send("There was a problem saving favorite for user");

		    }); 
	    } else {
	    	// дополнять массив избранного
	    	fav = user.favorites.concat(req.body.favorite)

	    	Favorite.findOneAndUpdate({user_id: req.userId}, {favorites: fav}, {new: true}, (err, result) => {
	    	})
	    }

	    res.status(200).send("ok");
	})
    
});

router.delete('/', VerifyToken, (req, res) => {
	console.log('delete favorite')
	Favorite.findOne({user_id: req.userId}, (err, user) => {
		if (err) return res.status(500).send("There was a problem finding the user.");

		console.log(req.query.id, typeof req.body.favorite)

		let newArr = user.favorites.filter((el) => {
			console.log(req.query.id != el.toString())
			return req.query.id != el.toString();
		})

		Favorite.findOneAndUpdate({user_id: req.userId}, {favorites: newArr}, {new: true}, (err, result) => {
	    	res.status(200).send("ok");
	    })	
	})
})

router.get('/myFavorites', VerifyToken, (req, res) => {
	console.log('private office my Favorites')
	Favorite.findOne({user_id: req.userId})
			.populate({
				path: 'favorites',
				populate: {
					path: 'dishes',
			    	populate: [
				      	{
				      		path: 'cuisine',
				      		select: 'title'
				      	}
				    ]	    
				}
			})
			.exec((err, dishes) => {
				if(err) console.log('error in /myFavorites')
				let arr = [];

				if(dishes !== null )
					dishes.favorites.forEach((elem) => {

					let obj = {};
					obj._id = elem._id;
					obj.rating = elem.rating;
					obj.title = elem.title;
					obj.composition = elem.composition;
					obj.weight_per_portion = elem.weight_per_portion;
					obj.price_per_portion = elem.price_per_portion;
					obj.cuisine = elem.cuisine.title;
					obj.image = elem.image;
					obj.alt = elem.alt;
					obj.favorites = true;

					arr.push(obj);
				})

				res.status(200).send(arr);
			})
})

module.exports = router;