// handled authentication routes

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { dbURL }  = require('../config/db');
const User = require('../models/User');

// register a new user

router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;

        // check if the username already exists

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken'});
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user

        const newUser = new User({ username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({ message: 'User registerd successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
});

// Login
router.post('/login', async (req, res) => {
    // Implement login logic
  });
  
  module.exports = router;
