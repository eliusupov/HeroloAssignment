const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiErrorHandler = require('./error/apiErrorHandler');

const user = require('./routes/UserRoute');
const message = require('./routes/MessageRoute');

const app = express();

const dbUrl = 'mongodb+srv://eliusupov:9422660@cluster0.pm7gj.mongodb.net/messageapp?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization ');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', user);
app.use('/message', message);
app.use(apiErrorHandler);

app.listen(3000, () => {
	console.log(`Server is up and running 3000`);
});
