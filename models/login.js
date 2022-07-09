const mongoose = require('mongoose');

var Login = mongoose.model('Login', {
	username: { type: String },
	password: { type: String }
});

module.exports = {
	Login
};