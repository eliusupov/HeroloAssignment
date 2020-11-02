const express = require('express');
const path = require('path');
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
app.use('/api/user', user);
app.use('/api/message', message);
app.use(apiErrorHandler);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'dist')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist', 'index.html'));
	});
}

app.listen(process.env.PORT || 3000);
