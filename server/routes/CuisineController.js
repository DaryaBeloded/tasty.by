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

	Cuisine.find({}, (err, cuis) => {
		if (err) res.status(500).send("problem with finding cuisine in /cuisines");

		Cafe.find({})
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
})

module.exports = router;