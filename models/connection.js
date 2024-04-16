const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:9fBdoUwlnTdf0tED@cluster0.s6fvv0h.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
.then(() => console.log('Database connected'))
.catch(error => console.error(error));