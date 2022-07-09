const express = require('express');

const cors = require('cors');

const { mongoose } = require('./db.js');

const bodyParser = require('body-parser');

const greetingsModule = require('./items');

var loginController = require('./controllers/loginController');

var itemController = require('./controllers/itemController');

var customerController = require('./controllers/customerController');

var app = express();

app.use(cors());

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server running in the port: 3000');
});

greetingsModule.sayHi('Shahana');

greetingsModule.sayHello('Shahana');

console.log('Hello');

app.use('/login', loginController);

app.use('/items', itemController);

app.use('/customers', customerController);