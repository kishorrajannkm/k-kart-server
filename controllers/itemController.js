const express = require('express');

var router = express.Router();

var { Item } = require('../models/item');

var ObjectId = require('mongoose').Types.ObjectId;

router.get('/', (req, res) => {
	Item.find((err, docs) => {
		if (!err) { res.send(docs); }
		else { console.log('Error in retrieving item list: '+JSON.stringify(err, undefined, 2)) }
	});
});

router.get('/wishlist', (req, res) => {
	Item.find((err, docs) => {
		if (!err) {
			const wishlistedItems = docs.filter((item) => item.isAddedToWishlist === true);
			if (wishlistedItems && wishlistedItems.length >= 1) {
				res.send(wishlistedItems);
			} else {
				return res.status(400).send('No items added to wishlist');
			}
		}
		else { console.log('Error in retrieving item list: '+JSON.stringify(err, undefined, 2)) }
	})
});

router.get('/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('No record found with item id: '+req.params.id);
	}
	Item.findById(req.params.id, (err, docs) => {
		if (!err) { res.send(docs); }
		else { console.log('Error in retrieving item: '+JSON.stringify(err, undefined, 2)) }
	});
});

router.post('/', (req, res) => {
	var item = new Item({
		brand: req.body.brand,
		itemName: req.body.itemName,
		cost: req.body.cost,
		itemsLeft: req.body.itemsLeft
	});
	item.save((err, docs) => {
		if (!err) { res.send(docs); }
		else { console.log('Error in saving item : '+JSON.stringify(err, undefined, 2)) }
	});
});

router.put('/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('No record found with item id: '+req.params.id);
	}
	var item = {
		brand: req.body.brand,
		itemName: req.body.itemName,
		cost: req.body.cost,
		itemsLeft: req.body.itemsLeft
	};
	Item.findByIdAndUpdate(req.params.id, { $set: item }, { new : true }, (err, docs) => {
		if (!err) { res.send(docs); }
		else { console.log('Error in updating item: '+JSON.stringify(err, undefined, 2)) }
	});
});

router.delete('/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('No record found with item id: '+req.params.id);
	}
	Item.findByIdAndRemove(req.params.id, (err, docs) => {
		if (!err) { res.send(docs); }
		else { console.log('Error in deleting item: '+JSON.stringify(err, undefined, 2)) }
	});
});

router.put('/addToWishlist/:id', (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send('No record found with item id: '+req.params.id);
	}
	var item = {
		itemId: req.body.itemId,
		name: req.body.name,
		cost: req.body.cost,
		countLeft: req.body.countLeft,
		deliveryInDays: req.body.deliveryInDays,
		images: req.body.images,
		isAddedToWishlist: req.body.isAddedToWishlist
	};
	Item.findByIdAndUpdate(req.params.id, { $set: item }, { new : true }, (err, docs) => {
		if (!err) { res.send(docs); }
		else { console.log('Error in adding item to Wishlist item: '+JSON.stringify(err, undefined, 2)) }
	});
});

module.exports = router;