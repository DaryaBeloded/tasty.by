const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");
const jwt = require('jsonwebtoken');

const Order = require('../models/order');
const VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res) => {
	console.log('post orders')

	let id = null;

	if(req.headers['x-access-token']) {

		const privateKey = fs.readFileSync('private.key');

		jwt.verify(req.headers['x-access-token'], privateKey, (err, decoded) => {
		   if (err) {
		   		console.log("smth was wrong");
		   		return;
		   }

		   id =  decoded.id
		})		
	}

		let orderDate = req.body.orderDate ? JSON.parse(req.body.orderDate)[0] : req.body.orderDate;
		let delivery_date = req.body.delivery_date ? JSON.parse(req.body.delivery_date)[0] : req.body.delivery_date;

		Order.create({
			user_id: id,
			name: req.body.name,
			order_date: orderDate ? new Date(orderDate.year, orderDate.month, orderDate.day): orderDate,
			delivery_date: delivery_date ? new Date(delivery_date.year, delivery_date.month, delivery_date.day): delivery_date,
			delivery_time: req.body.deliveryTime,
			address: req.body.address,
			phone: req.body.phone,
			summ: req.body.summ,
			basket: JSON.parse(req.body.basket)
		}, (err, order) => {

		    if (err) {
		    	console.log(err)
		    	return res.status(500).send("There was a problem saving order");
		    }

		    Order.findById(order._id)
		    	.populate('user_id') 
				.exec((err, user) => {
				  if (err) console.log('lol');

				  if(user.user_id) console.log('The user is %s', user.user_id.name);
				});

				res.status(200).send("ok");

		})
		    
	    
});

router.get('/orders', VerifyToken, (req, res) => {
	console.log('get orders');
	Order.find({user_id: req.userId})
		.select("-user_id -__v -basket._id")
		.populate({
			path: 'basket.dish',
			select: '_id title'
		})
		.populate({
			path: 'basket.cafe_id',
			select: '_id title'
		})
		.exec((err, orders) => {

			res.status(200).send(orders)
		})

})

module.exports = router;