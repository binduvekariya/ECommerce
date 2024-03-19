const mongose = require('mongoose');

const connectDatabase = () => {

    mongose.connect('mongodb://localhost:27017/Ecommerce')
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        });
}

module.exports = connectDatabase;