const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/authDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User and Admin Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Register Endpoint
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.status(201).send('User Registered');
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid Credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey');
  res.send({ message: 'Login Successful', token });
});

// Middleware to verify token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.status(403).send('Invalid Token');
    req.user = user;
    next();
  });
}

// Protected Admin Route
app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Admin Access Required');
  res.send('Admin Access Granted');
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
