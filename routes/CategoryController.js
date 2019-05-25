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

	Category.find({}, (err, cat) => {
		if (err) res.status(500).send("problem with finding category in /categories");

		Cafe.find({})
			.populate({	
			    path: 'dishes'
		    })
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
		
})

module.exports = router;