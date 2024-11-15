const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  console.log("received register post");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(200).send({response:'User registered'});
  } catch (err) {
    console.error('Registration error:', err); // Add this line for detailed logs
    res.status(500).send('Error registering user');
  }
});


router.post('/login', async (req, res) => {
  //console.log("logging in", req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    //console.log("user from DB", user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
