const Message = require('../models/MessageModel');
const User = require('../models/UserModel');

exports.messagesGet = async (req, res, next) => {
	try {
		const { userId } = req;
		const messagesFromDB = await Message.find({ $or: [{ fromId: userId }, { toId: userId }] }).lean();
		const resolvedMessages = await Promise.all(
			messagesFromDB.map(async message => ({
				...message,
				toName: (await User.findOne({ _id: message.toId })).email,
				fromName: (await User.findOne({ _id: message.fromId })).email,
			})),
		);
		const messages = {
			sent: resolvedMessages.filter(message => message.fromId === req.userId),
			received: resolvedMessages.filter(message => message.toId === req.userId),
		};
		res.status(200).json(messages);
	} catch (err) {
		return next(err);
	}
};

exports.messageSend = async (req, res, next) => {
	const { fromId, toId, message, subject } = req.body;
	try {
		const newMessage = new Message({ fromId, toId, message, subject });
		const messageObj = await newMessage.save();
		res.status(201).json(messageObj);
	} catch (err) {
		return next(err);
	}
};

exports.messageDeleteById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedMessage = await Message.findOneAndDelete({ _id: id });
		res.status(202).json(deletedMessage);
	} catch (err) {
		return next(err);
	}
};
