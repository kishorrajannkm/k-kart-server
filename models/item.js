const mongoose = require('mongoose');

var Item = mongoose.model('Item', {
	itemId: { type: Number },
	name: { type: String },
	cost: { type: Number },
	countLeft: { type: Number },
	deliveryInDays: { type: Number },
	images: { type: Array },
	isAddedToWishlist: { type: Boolean }
});

module.exports = {
	Item
};