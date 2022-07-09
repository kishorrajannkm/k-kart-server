const mongoose = require('mongoose');

var Customer = mongoose.model('Customer', {
	username: { type: String },
	password: { type: String },
	confirmPassword: { type: String },
	firstName: { type: String },
	lastName: { type: String }
});

var Wishlist = mongoose.model('Wishlist', {
	username: { type: String },
	itemId: { type: String }
});

module.exports = {
	Customer, Wishlist
};