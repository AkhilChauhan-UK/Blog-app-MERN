const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const signToken = (user) => jwt.sign(
  { id: user._id, username: user.username, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(409).json({ message: 'User already exists with this email or username' });
  }

  const user = await User.create({ username, email, password });
  const token = signToken(user);

  res.status(201).json({
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
  });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
});
