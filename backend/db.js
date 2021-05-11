const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meanDB', (err) => {
    if (!err) {
        console.log('Database Connection successfull!');
    } else {
        console.log('Error in connection.' + err);
    }
});

module.exports = mongoose;