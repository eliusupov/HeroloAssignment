const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
	fromId: {
		type: String,
		required: true,
		trim: true,
	},
	toId: {
		type: String,
		required: true,
		trim: true,
	},
	message: {
		type: String,
		required: true,
		trim: true,
	},
	subject: {
		type: String,
		required: true,
		trim: true,
	},
	createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);
