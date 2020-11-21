const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const ApiError = require('../error/ApiError');

exports.userCreate = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			try {
				const newUser = new User({ email, password: await bcrypt.hash(password, 12) });
				const user = await newUser.save();
				const token = jwt.sign({ userId: user._id, email: user.email }, 'secret', {
					expiresIn: '12h',
				});
				res.status(201).json({ userId: user._id, token: token });
			} catch (err) {
				return next(err);
			}
		} else {
			res.status(500).json({ success: false });
		}
	} catch (err) {
		return next(err);
	}
};

exports.userLogin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ userId: user._id, email: user.email }, 'secret', {
				expiresIn: '12h',
			});
			res.status(200).json({
				userId: user._id,
				token,
			});
		} else {
			return next(ApiError.unAuthorised('unauthorised'));
		}
	} catch (err) {
		return next(err);
	}
};

exports.userCheckEmailAvail = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		res.status(200).json({ isEmailAvail: user == null });
	} catch (err) {
		return next(err);
	}
};

exports.userGetRecipients = async (req, res, next) => {
	try {
		const recipients = await User.find({ _id: { $nin: req.userId } });
		res.status(200).json({
			recipients: recipients.map(user => ({ _id: user._id, email: user.email })),
		});
	} catch (err) {
		return next(err);
	}
};
