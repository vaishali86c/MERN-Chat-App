// handled authentication routes

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../utils/auth');
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
        const hashedPassword = await bcrypt.hash(password, 10); // 10- cost factor-> computational complexity of hashing process
        // create a new user
        const newUser = new User({ username, password: hashedPassword});
        await newUser.save();

        // generate a token
        const token = generateToken(newUser);
        res.status(201).json({ message: 'User registerd successfully', token });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if the username exists in the database
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });

        }

        const token = generateToken(existingUser);

        res.status(200).json({ message: 'Login Succcessful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
 
  module.exports = router;
