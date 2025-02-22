// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('./models/User');

// const router = express.Router();

// // Register Route
// router.post('/register', async (req, res) => {
//     try {
//         const { email, password, phone, address } = req.body;

//         // Check if user exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = await User.create({ email, password: hashedPassword, phone, address });

//         res.status(201).json({ message: 'User registered successfully', user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         res.json({ message: 'Login successful', token, user });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// });

// module.exports = router;

// import express from 'express';
// import bcrypt from 'bcryptjs';
// import User from './models/User.js';

// const router = express.Router();

// // Register user
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({ email, password: hashedPassword });
//         res.status(201).json({ message: 'User registered successfully', user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering user', error });
//     }
// });

// // Login user
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ where: { email } });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Password does not match' });

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error });
//     }
// });

// export default router;




// import express from 'express';
// import bcrypt from 'bcryptjs';
// import {User} from '../models/User.js';// Ensure correct path


// const router = express.Router();

// // Register user
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) return res.status(400).json({ message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await User.create({ email, password: hashedPassword });

//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error registering user', error: error.message });
//     }
// });

// // Login user
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ where: { email } });
//         if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
// });

// export default router;
