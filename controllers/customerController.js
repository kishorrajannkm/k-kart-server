const express = require('express');

var router = express.Router();

var { Customer, Wishlist } = require('../models/customer');

var { Item } = require('../models/item');

var ObjectId = require('mongoose').Types.ObjectId;

router.post('/registerCustomer', (req, res) => {
	var customer = new Customer({
		username: req.body.username,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		firstName: req.body.firstName,
		lastName: req.body.lastName
	});
	customer.save((err, docs) => {
		if (!err) {
			res.send({
				docs: docs,
				message: 'Customer registered successfully'
			});
		} else {
			console.log('Error in saving customer : '+JSON.stringify(err, undefined, 2));
		}
	});
});

router.post('/addTowishlist', (req, res) => {
	Customer.find({ username: req.body.username }, function(err, docs) {
		if (!err) {
			if (docs && docs.length >= 1) {
				const wishlistId = req.body.wishlistId;
				var customerWishlist = new Wishlist({
					username: req.body.username,
					itemId: wishlistId
				});
				console.log(customerWishlist);
				customerWishlist.save((error, result) => {
					if (!error) {
						res.send({
							docs: result,
							message: 'Item added to wishlist successfully'
						})
					} else {
						console.log('Error in adding item to wishlist : '+JSON.stringify(error, undefined, 2));
					}
				});
			} else {
				return res.status(400).send('Login to add items to wishlist');
			}
		} else {
			console.log(err);
			console.log('Error in retrieving customer data: '+JSON.stringify(err, undefined, 2));
		}
	});
});

router.post('/iswishlisteditem', (req, res) => {
	console.log("is wishlisted item");
	Wishlist.find({
		username: req.body.username,
		itemId: req.body.wishlistId
	}, function(err, docs) {
		if (!err) {
			if (docs && docs.length >= 1) {
				res.send({
					isAddedToWishlist: true,
					widhListId: docs[0]._id
				});
			} else {
				res.send({
					isAddedToWishlist: false,
					widhListId: ''
				});
			}
		} else {
			console.log(err);
			console.log('Error in retrieving customer data: '+JSON.stringify(err, undefined, 2));
		}
	});
});

router.post('/wishlist', (req, res) => {
	console.log("get wishlist items");
	console.log(req.headers.api_key);
	Wishlist.find({ username: req.body.username }, function(err, docs) {
		if (!err) {
			if (docs && docs.length >= 1) {
				const wishListItems = [];
				docs.forEach((wishListData) => {
					wishListItems.push(wishListData.itemId);
				});
				Item.find((
					{ 
						_id: wishListItems
					}),function(error, result) {
						res.send(result);
					}
				);
			} else {
				return res.status(400).send('No items added to Wishlist');
			}
		} else {
			console.log(err);
			console.log('Error in retrieving customer data: '+JSON.stringify(err, undefined, 2));
		}
	});
});

router.delete('/wishlist/:id', (req, res) => {
	console.log("delete");
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('No record found with item id: '+req.params.id);
	}
	Wishlist.findByIdAndRemove(req.params.id, (err, docs) => {
		if (!err) {
			res.send({
				docs: docs,
				message: 'Item removed from wishlist successfully'
			});
		} else {
			console.log('Error in removing item from Wishlist: '+JSON.stringify(err, undefined, 2));
		}
	});
});

module.exports = router;