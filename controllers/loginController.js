const express = require('express');

var router = express.Router();

var { Customer } = require('../models/customer');

var ObjectId = require('mongoose').Types.ObjectId;

router.post('/customer', (req, res) => {
	Customer.find({ username: req.body.username }, function(err, docs) {
		if (!err) {
			if (docs && docs.length >= 1) {
				const passwordMatch = docs.filter((user) => user.password === req.body.password);
				if (passwordMatch && passwordMatch.length >= 1) {
					res.send({
						docs,
						message: 'Login Success'
					});
				} else {
					return res.status(401).send('Unauthorized User');
				}
			} else {
				return res.status(400).send('No User exists with Username '+req.body.username);
			}
		} else {
			console.log(err);
			console.log('Error in User login: '+JSON.stringify(err, undefined, 2))
		}
	});
});

module.exports = router;