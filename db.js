const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CrudDB', (err) => {
    if (!err) {
        console.log('MongoDB connected Successfully');
    } else {
        console.log('MongoDB failed to connect');
        console.log(JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;