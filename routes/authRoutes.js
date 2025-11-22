const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensureAuth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const JWT_EXPIRES = '7d';

function generateToken(user) {
  return jwt.sign({ id: user._id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    const u = user.toObject();
    delete u.password;
    res.status(201).json({ user: u, token });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    const u = user.toObject();
    delete u.password;
    res.json({ user: u, token });
  } catch (err) {
    next(err);
  }
});

// Get current user
router.get('/me', ensureAuth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;