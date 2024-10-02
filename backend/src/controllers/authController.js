const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Check if user exists
	const userExists = await User.findOne({ email });

	if (userExists) {
		return res.status(400).json({ message: 'User already exists' });
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(password, salt);

	// Create user
	const user = await User.create({
		firstName,
		lastName,
		email,
		passwordHash,
		role: 'user',
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400).json({ message: 'Invalid user data' });
	}
};

// Login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// Check for user by email
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.passwordHash))) {
		res.json({
			_id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({ message: 'Invalid credentials' });
	}
};

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
	registerUser,
	loginUser,
};