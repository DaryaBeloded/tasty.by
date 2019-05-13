const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require("fs");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const VerifyToken = require('./VerifyToken');
const Favorite = require('../models/favorite');

const privateKey = fs.readFileSync('private.key');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// https://github.com/auth0/node-jsonwebtoken


router.post('/register', (req, res) => {
	console.log('register')

	bcrypt.genSalt(10, (err, salt) => {
	    bcrypt.hash(req.body.password, salt, (err, hash) => {

	        User.create({
					name : req.body.name,
				    email : req.body.email,
				    password : hash,
				    phone: req.body.phone,
				    address: req.body.address
				}, (err, user) => {
				    if (err) return res.status(500).send("There was a problem registering the user.");
					
				    const token = jwt.sign({ id: user._id }, privateKey, {
				      expiresIn: 86400 // expires in 24 hours
				    });

				    res.status(200).send({ 
				    	auth: true, 
				    	token: token,
				    	user: {
				    		name: user.name,
				    		email: user.email,
				    		phone: user.phone,
				    		address: user.address
				    	} 
				    });
		    }); 

	    });
	});
});


router.get('/me', VerifyToken, (req, res) => {
  
    User.findById(req.userId, { password: 0 , _id: 0, __v: 0}, function (err, user) {
	    if (err) return res.status(500).send("There was a problem finding the user.");
	    if (!user) return res.status(400).send("No user found.");
	    
	    res.status(200).send(user);
	  });
});

// сделать что-то с изменением пароля
router.put('/me', VerifyToken, (req, res) => {
	console.log('privatу office put me')
	
	User.findById(req.userId, { _id: 0, __v: 0, password: 0}, function (err, user) {
	    if (err) return res.status(500).send("There was a problem finding the user.");
	    if (!user) return res.status(400).send("No user found.");
	    
	    let obj = Object.assign({}, user)._doc;

	    for (key in obj) {

	    	if((req.body[key] !== undefined) && (obj[key] !== req.body[key])) obj[key] = req.body[key];
	    }

	    User.findByIdAndUpdate(req.userId, obj, {new: true}, (err, user) => {
	        if (err) return res.status(500).send("There was a problem updating the user.");
	        // console.log(user)
	        res.status(200).send('ok');
	    });
	 });

  
    
});


router.post('/login', (req, res) => {
	console.log('login')

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send('Problem in auth/login.');
    if (!user) return res.status(400).send('No user found.');

    bcrypt.compare(req.body.password, user.password).then((result) => {
    	if (!result) return res.status(401).send({ auth: false, token: null });

	    let token = jwt.sign({ id: user._id }, privateKey, {
	      expiresIn: 86400 // expires in 24 hours
	    });

	    Favorite.findOne({user_id: user._id}, (err, fav) => {
	    	res.status(200).send({ 
		    	auth: true, 
		    	token: token,
		    	user: {
					name: user.name,
					email: user.email,
					phone: user.phone,
					address: user.address,
					favorites: fav ? fav.favorites : null
				} 
		    });
	    })

    });

  });
});

router.get('/logout', (req, res) => {

  res.status(200).send({ auth: false, token: null });
});

module.exports = router;


